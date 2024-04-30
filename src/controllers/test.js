import Test, { testSchemaValidator } from '../models/test-model.js'

export const addTrain = async (req, res, next) => {
  try {
    const { value, error } = testSchemaValidator.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const ob = new Test(value)
    const saved = await ob.save()
    console.log('Object Created')

    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while adding the test' })
  }
}
