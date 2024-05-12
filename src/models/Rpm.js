import { Schema, model } from 'mongoose'
import Joi from 'joi'

const rpmSchema = new Schema(
  {
    rpm: { type: Number, required: true },
  },
  { timestamps: true }
)

export const rpmSchemaValidator = Joi.object({
  rpm: Joi.number().required(),
})

const Rpm = model('Rpm', rpmSchema)

export default Rpm
