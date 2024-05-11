import { Schema, model } from 'mongoose'
import Joi from 'joi'

const profileSchema = new Schema(
  {
    username: { type: String, required: true },
    group: { type: String, required: true },
    nickname: { type: String },
    engine: { type: String },
    ODO: { type: String },
    chasses: { type: String },
    runtime: { type: String },
    model: { type: String },
    maxSpeed: { type: String },
  },
  { timestamps: true }
)

export const profileSchemaValidator = Joi.object({
  username: Joi.string().required(),
  group: Joi.string().required(),
  nickname: Joi.string(),
  engine: Joi.string(),
  ODO: Joi.string(),
  chasses: Joi.string(),
  runtime: Joi.string(),
  model: Joi.string(),
  maxSpeed: Joi.string(),
})

const Profile = model('Profile', profileSchema)

export default Profile
