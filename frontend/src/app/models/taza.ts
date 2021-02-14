import { NumberSymbol } from "@angular/common";

export interface Taza {
    id: number;
    id_tipo?: number;
    descripcion?: string;
    color: string;
    dimensiones: string;
    capacidad: string;
    modelo: string;
    material: string;
    piezas: number;
}