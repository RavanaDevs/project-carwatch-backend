import { Schema, model } from 'mongoose'
import Joi from 'joi'

const testModelSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
  },
  { timestamps: true }
)

export const testSchemaValidator = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
})

const Test = model('Test', testModelSchema)

export default Test
