const Feedback = require('../models/feedback.model')

const viewFeedback = async (req, res) => {

    const feedbackId = req.params.id

    try {

        const feedback = await Feedback.findById(feedbackId)

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" })
        }

        return res.status(200).json({ feedback })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { viewFeedback }