const Faculty = require("../models/faculty.model")

const register = async (req, res) => {

    const { name, email, password, phone_No, subject, divs } = req.body

    if (!name || !email || !password || !phone_No || !subject.subject_code || !subject.subject_name || divs == []) return res.status(400).json({ message: "Please fill all the credentials" })

    try {

        const faculty = await Faculty.findOne({ email })

        if (faculty) return res.status(400).json({ message: "User already Exists" })

        Faculty.create({ name, email, password, phone_No, subject, divs })

        return res.status(200).json({ message: "Faculty Registered Successfully" })

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: "Please fill all the credentials" })

    try {

        const faculty = await Faculty.findOne({ email })

        if (!faculty) return res.status(400).json({ message: "User not found" })

        const isPasswordValid = await faculty.isPasswordCorrect(password)

        if (!isPasswordValid) return res.status(400).json({ message: "Invalid Credentials" })

        const accessToken = faculty.generateToken()

        const loggedInUser = await Faculty.findById(faculty._id).select("-password")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                message: "Faculty Logged In Successfully",
                user: loggedInUser,
                accessToken: accessToken
            })

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

module.exports = { register, login }