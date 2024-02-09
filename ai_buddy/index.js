const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()

const port = process.env.PORT


app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use("/", require("./studyRouter"))
app.use("/notes", require("./noteRouter"))
app.use("/account", require("./accountRouter"))


app.listen(port, () => {
    console.log("listening on port " + port)
})