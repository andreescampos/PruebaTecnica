import { mysqlPool } from "@shared/constants";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { QueryError, RowDataPacket } from "mysql2/typings/mysql";

export const getTipoTaza = async (req: Request, res: Response): Promise<any> => {

    mysqlPool.query(`SELECT * FROM tipo_taza;`, (err: QueryError, rows:RowDataPacket[]) => {
        if(err){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                {
                    "mensaje": 'Error al obtener los datos',
            });
        }

        return res.status(StatusCodes.OK).json(rows)

    });

}