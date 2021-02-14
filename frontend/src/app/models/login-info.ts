export interface LoginInfo {
    email: string;
    password: string;
    tipo: TipoUsuario;
}

export enum TipoUsuario{
    admin = 1,
    alumno = 2,
    padre = 3,
    docente = 4
  }