import { Request } from 'express';
import { IUser } from '@entities/User';
import {createPool, QueryError, RowDataPacket} from 'mysql2';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequest extends Request {
    body: {
        user: IUser;
    }
} 


export const mysqlPool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME
})
