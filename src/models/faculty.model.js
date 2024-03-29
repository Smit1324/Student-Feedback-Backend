const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const facultySchema = new Schema(
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
        divs: {
            type: Array,
            required: true
        },
        feedbacks: [
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

facultySchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

facultySchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

facultySchema.methods.generateToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.JWT_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
        }
    )
}

module.exports = mongoose.model("Faculty", facultySchema)