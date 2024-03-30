const express = require("express");
const router = express.Router();

const { register, login, getFacultyData, sendFeedback } = require("../controllers/student.controllers")
const { viewFeedback } = require("../controllers/feedback.controllers")

const { verifyStudent } = require("../middlewares/auth")

router.post("/register", register)
router.post("/login", login)
router.get("/getFacultyData/:id", verifyStudent, getFacultyData)
router.post("/feedback/:id", verifyStudent, sendFeedback)
router.get("/viewfeedback/:id", verifyStudent, viewFeedback)

module.exports = router