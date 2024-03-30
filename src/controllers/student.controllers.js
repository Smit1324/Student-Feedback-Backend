const Student = require("../models/student.model")
const Faculty = require("../models/faculty.model")
const Feedback = require("../models/feedback.model")

const register = async (req, res) => {

    const { name, email, enrollment_No, password, phone_No, sem, div, subjects } = req.body

    if (!name || !email || !enrollment_No || !password || !phone_No || !sem || !div || !subjects) return res.status(400).json({ message: "Please fill all the credentials" })

    subjects.map((subject) => {
        const { subject_code, subject_name, subject_faculty } = subject
        if (!subject_code || !subject_name || !subject_faculty) return res.status(400).json({ message: "Please fill all the subject details" })
    })

    try {

        const student = await Student.findOne({ $or: [{ email }, { enrollment_No }] })

        if (student) return res.status(400).json({ message: "User already Exists" })

        Student.create({ name, email, enrollment_No, password, phone_No, sem, div, subjects })

        return res.status(200).json({ message: "Student Registered Successfully" })

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: "Please fill all the credentials" })

    try {

        const student = await Student.findOne({ email })

        if (!student) return res.status(400).json({ message: "User not found" })

        const isPasswordValid = await student.isPasswordCorrect(password)

        if (!isPasswordValid) return res.status(400).json({ message: "Invalid Credentials" })

        const accessToken = student.generateToken()

        const loggedInUser = await Student.findById(student._id).select("-password")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json({
                message: "Student Logged In Successfully",
                user: loggedInUser,
                accessToken: accessToken
            })

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

const getFacultyData = async (req, res) => {

    const facultyId = req.params.id

    if (!facultyId) return res.status(400).json({ message: "Enter a valid ID" })

    try {

        const faculty = await Faculty.findById(facultyId).select("-password -divs -feedbacks -createdAt -updatedAt")

        if (!faculty) return res.status(400).json({ message: "User not found" })

        return res
            .status(200)
            .json({
                message: "Faculty Data Fetched Successfully",
                user: faculty
            })

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

const sendFeedback = async (req, res) => {

    const { _id, name, email, enrollment_No } = req.user

    const student_name = name;
    const student_email = email;
    const student_enr_no = enrollment_No;

    const facultyId = req.params.id

    const { course_content, course_content_outcome, course_relevent, syllabus_completion, faculty_behaviour, faculty_communication, suggestions } = req.body


    try {

        const faculty = await Faculty.findById(facultyId).select("-password -phone_No -divs -createdAt -updatedAt")

        if (!faculty) return res.status(400).json({ message: "Faculty not found" })

        const { name, email, subject } = faculty

        const faculty_name = name;
        const faculty_email = email;

        if (!student_name || !student_email || !student_enr_no || !faculty_name || !faculty_email || !subject || !course_content || !course_content_outcome || !course_relevent || !syllabus_completion || !faculty_behaviour || !faculty_communication || !suggestions) return res.status(400).json({ message: "Please fill all the credentials" })

        const feedback = await Feedback.create({ student_name, student_email, student_enr_no, faculty_name, faculty_email, subject, course_content, course_content_outcome, course_relevent, syllabus_completion, faculty_behaviour, faculty_communication, suggestions })

        const student = await Student.findById(_id)

        student.prev_feedbacks.push(feedback._id)
        student.save()

        faculty.feedbacks.push(feedback._id)
        faculty.save()

        return res
            .status(200)
            .json({
                message: "Feedback Sent Successfully",
                feedback: feedback
            })

    } catch (error) {
        return res.status(500).json({ message: error })
    }

}

module.exports = { register, login, getFacultyData, sendFeedback }