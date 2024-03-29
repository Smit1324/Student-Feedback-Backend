const Student = require('../models/student.model');
const Faculty = require('../models/faculty.model');
const jwt = require('jsonwebtoken');

const verifyStudent = async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");

        if (!token) return res.status(401).json({ message: "Unauthorized Request" })

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)

        const student = await Student.findById(decodedToken?._id).select("-password")

        if (!student) return res.status(401).json({ message: "Invalid Access Token" })

        req.user = student

        next()

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const verifyFaculty = async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");

        if (!token) return res.status(401).json({ message: "Unauthorized Request" })

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)

        const faculty = await Faculty.findById(decodedToken?._id).select("-password")

        if (!faculty) return res.status(401).json({ message: "Invalid Access Token" })

        req.user = faculty

        next()

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

module.exports = { verifyStudent, verifyFaculty };