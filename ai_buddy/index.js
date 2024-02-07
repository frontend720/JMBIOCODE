const express = require("express")
const app = express()
const {openai} = require("./config")
const morgan = require("morgan")
const port = process.env.PORT


app.use(express.json())
app.use(morgan("dev"))
console.log(openai)

app.listen(port, () => {
    console.log("listening on port " + port)
})