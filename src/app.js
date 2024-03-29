const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const studentRoutes = require("./routes/student.routes")
const facultyRoutes = require("./routes/faculty.routes")

app.use("/api/v1/student", studentRoutes)
app.use("/api/v1/faculty", facultyRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`⚙️ Server is running on port ${PORT}`);
});