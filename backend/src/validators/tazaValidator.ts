import Joi from "joi";

export const tazaValidator = Joi.object({
      id_tipo:Joi.number().min(1).required(),
      color: Joi.string().required(),
      dimensiones: Joi.string().required(),
      capacidad: Joi.string().required(),
      modelo: Joi.string().required(),
      material: Joi.string().required(),
      piezas: Joi.number().min(1).required(),
  });