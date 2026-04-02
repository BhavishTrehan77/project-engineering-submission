const express = require("express")
const app = express()
require("dotenv").config()

const confessionRoutes = require("./routes/confessionRoutes")

app.use(express.json())

// routes
app.use("/api/v1/confessions", confessionRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000")
})