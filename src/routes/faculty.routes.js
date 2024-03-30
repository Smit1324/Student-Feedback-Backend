const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/faculty.controllers")
const { viewFeedback } = require("../controllers/feedback.controllers")

const { verifyFaculty } = require("../middlewares/auth")

router.post("/register", register)
router.post("/login", login)
router.get("/viewfeedback/:id", verifyFaculty, viewFeedback)

module.exports = router