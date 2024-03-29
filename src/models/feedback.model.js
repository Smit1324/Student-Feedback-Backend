const mongoose = require('mongoose');

const Schema = mongoose.Schema

const feedbackSchema = new Schema(
    {
        student_name: {
            type: String,
            required: true
        },
        student_enr_no: {
            type: String,
            required: true,
            unique: true
        },
        student_email: {
            type: String,
            required: true,
            unique: true
        },
        faculty_name: {
            type: String,
            required: true,
        },
        faculty_email: {
            type: String,
            required: true,
            unique: true
        },
        subject: {
            subject_code: {
                type: String,
                required: true
            },
            subject_name: {
                type: String,
                required: true
            }
        },
        course_content: {
            type: String,
            required: true
        },
        course_content_outcome: {
            type: String,
            required: true
        },
        course_relevent: {
            type: String,
            required: true
        },
        syllabus_completion: {
            type: String,
            required: true
        },
        faculty_behaviour: {
            type: String,
            required: true
        },
        faculty_communication: {
            type: String,
            required: true
        },
        suggestions: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Feedback", feedbackSchema)