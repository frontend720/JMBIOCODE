const express = require("express")
const app = express()
const morgan = require("morgan")
require("dotenv").config()

const port = process.env.PORT


app.use(express.json())
app.use(morgan("dev"))

app.use("/", require("./studyRouter"))
app.use("/notes", require("./noteRouter"))
app.use("/account", require("./accountRouter"))


app.listen(port, () => {
    console.log("listening on port " + port)
})