import { mysqlPool } from "@shared/constants";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Logger from "jet-logger";
import { QueryError, RowDataPacket, OkPacket, FieldPacket } from "mysql2/typings/mysql";

const logger = new Logger();


/**
 * Petición para agregar una taza a la Base de Datos
 * @param req 
 * @param res
 * @returns Promise<any>
 */
export const agregarPedido = async (req: Request, res: Response): Promise<any> => {

    const peticion = req.body;

    const compras: any[] = peticion.compra;
    const promocion: any[] = peticion.promocion;

    mysqlPool.getConnection((err, connection) => {
        if (err) {
            logger.err(err.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                {
                    "mensaje": 'Error al registrar los datos',
                });
        }

        //Inicia la transacción
        connection.beginTransaction(err => {
            if (err) {
                connection.rollback(() => {
                    logger.err(err.message)
                })
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    {
                        "mensaje": 'Error al registrar los datos',
                    });
            }

            connection.execute(
                `INSERT INTO pedido
                    (fecha,hora)
                VALUES
                    (NOW(),NOW())`,
                (err, result) => {
                    if (err) {
                        connection.rollback(() => {
                            logger.err(err.message)
                        })
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                            {
                                "mensaje": 'Error al registrar los datos',
                            });
                    }
                    var id_pedido = (result as OkPacket).insertId;
                    let aux = compras.map(compra => [id_pedido, compra.id, compra.cantidad, compra.precio]);
                    aux = aux.concat(promocion.map(promocion => [id_pedido, promocion.id, promocion.cantidadPromo, 0]));

                    connection.query(
                        "INSERT INTO detalle_pedido(id_pedido, id_taza, cantidad, precio) VALUES ?", [aux],
                        (err, result) => {
                            if (err) {
                                connection.rollback(() => {
                                    logger.err(err.message)
                                })
                                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                                    {
                                        "mensaje": 'Error al registrar los datos',
                                    });
                            }

                            var CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };

                            aux = compras.map(compra => [compra.id, compra.piezas - compra.cantidad, CURRENT_TIMESTAMP]);
                            aux = aux.concat(promocion.map(promocion => [promocion.id, promocion.piezas - promocion.cantidadPromo, CURRENT_TIMESTAMP]));
                            console.log(aux);
                            

                            connection.query(
                                "INSERT INTO inventario(id_taza, piezas, ultima_modificacion) VALUES ? ON DUPLICATE KEY UPDATE piezas = VALUES(piezas);", [aux],
                                (err, result) => {
                                    if (err) {
                                        connection.rollback(() => {
                                            logger.err(err.message)
                                        })
                                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                                            {
                                                "mensaje": 'Error al registrar los datos',
                                            });
                                    }


                                    connection.commit((err) => {
                                        if (err) {
                                            connection.rollback(() => {
                                                logger.err(err.message)
                                            })
                                            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                                                {
                                                    "mensaje": 'Error al registrar los datos',
                                                });
                                        }
        
                                        return res.status(StatusCodes.OK).json(
                                            {
                                                "mensaje": 'Datos guardados satisfactoriamente',
                                            });
        
                                    });
                                    
                                });

                            
                        }
                    )
                }
            );
        })
    })


}

/**
 * Petición para obtener las tazas de la Base de Datos
 * @param req 
 * @param res
 * @returns Promise<any>
 */
export const obtenerTazas = async (req: Request, res: Response): Promise<any> => {
    mysqlPool.query(
        `
        SELECT
            taza.id, 
            tipo_taza.descripcion, 
            taza.color, 
            taza.dimensiones, 
            taza.capacidad, 
            taza.modelo, 
            taza.material,
            taza.precio,
            inventario.piezas
        FROM
	        taza
	    INNER JOIN
	        tipo_taza
	    ON 
		    taza.id_tipo = tipo_taza.id
	    INNER JOIN
	        inventario
	    ON 
		taza.id = inventario.id_taza
        `,
        (err: QueryError, rows: RowDataPacket[]) => {
            if (err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    {
                        "mensaje": 'Error al obtener los datos',
                    });
            }

            return res.status(StatusCodes.OK).json(rows)
        });


}