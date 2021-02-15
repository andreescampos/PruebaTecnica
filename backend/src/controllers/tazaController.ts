import { mysqlPool } from "@shared/constants";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Logger from "jet-logger";
import { QueryError, RowDataPacket, OkPacket, FieldPacket } from "mysql2/typings/mysql";
import { tazaValidator } from "src/validators/tazaValidator";

const logger = new Logger();


/**
 * Petición para agregar una taza a la Base de Datos
 * @param req 
 * @param res
 * @returns Promise<any>
 */
export const agregarTaza = async (req: Request, res: Response): Promise<any> => {

    var peticion = req.body;

    //Verifica con la librería Joi si los datos son válidos
    var nuevaTaza: any;
    try {
        nuevaTaza = await tazaValidator.validateAsync(peticion, { abortEarly: false })
    } catch (ex) {
        logger.err(ex.message);
        return res.status(StatusCodes.BAD_REQUEST).json(
            {
                "mensaje": 'Solicitud invalida',
            });
    }

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
                `INSERT INTO taza
                (id_tipo,color,dimensiones,capacidad, modelo, material)
            VALUES
                (?,?,?,?,?,?)`,
                [
                    nuevaTaza.id_tipo,
                    nuevaTaza.color,
                    nuevaTaza.dimensiones,
                    nuevaTaza.capacidad,
                    nuevaTaza.modelo,
                    nuevaTaza.material
                ], (err, result) => {
                    if (err) {
                        connection.rollback(() => {
                            logger.err(err.message)
                        })
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                            {
                                "mensaje": 'Error al registrar los datos',
                            });
                    }
                    var id_taza = (result as OkPacket).insertId;

                    connection.execute(
                        `INSERT INTO inventario
                            (id_taza, piezas, ultima_modificacion)
                        VALUES
                            (?,?,NOW());`,
                        [
                            id_taza,
                            nuevaTaza.piezas
                        ],
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

                            })
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
     (err: QueryError, rows:RowDataPacket[]) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                {
                    "mensaje": 'Error al obtener los datos',
            });
        }

        return res.status(StatusCodes.OK).json(rows)
    });


}