import Profile, { profileSchemaValidator } from '../models/profile.js'

export const addProfile = async (req, res, next) => {
  try {
    const { value, error } = profileSchemaValidator.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const profile = new Profile(value)
    await profile.save()
    res.status(201).json(profile)
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating profile' })
  }
}

export const getOneProfile = async (req, res, next) => {
  try {
    const profileId = req.query.id

    const profile = await Profile.findById(profileId)

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    res.status(200).json(profile)
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching profile' })
  }
}

export const getAllProfiles = async (req, res, next) => {
  try {
    const profileId = req.query.id

    const profile = await Profile.find({})

    if (!profile) {
      return res.status(404).json({ error: 'Profiles not found' })
    }

    res.status(200).json(profile)
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching profiles' })
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const profileId = req.query.id
    const updates = req.body

    const profile = await Profile.findByIdAndUpdate(profileId, updates, {
      new: true,
    })

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    res.status(200).json(profile)
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while updating profile' })
  }
}

export const deleteProfile = async (req, res, next) => {
  try {
    const profileId = req.query.id

    const profile = await Profile.findByIdAndDelete(profileId)

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    res.status(200).json({ message: 'Profile deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting profile' })
  }
}
