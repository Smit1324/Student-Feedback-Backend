const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const studentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        enrollment_No: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: true,
        },
        phone_No: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        sem: {
            type: String,
            required: true,
            trim: true
        },
        div: {
            type: String,
            required: true,
            trim: true
        },
        subjects: [
            {
                subject_code: {
                    type: String
                },
                subject_name: {
                    type: String
                },
                subject_faculty: {
                    type: Schema.Types.ObjectId,
                    ref: "Faculty"
                }
            }
        ],
        prev_feedbacks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Feedback"
            }
        ]
    },
    {
        timestamps: true
    }
);

studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

studentSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

studentSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            enrollment_No: this.enrollment_No
        },
        process.env.JWT_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
        }
    )
}

module.exports = mongoose.model("Student", studentSchema)