const express = require("express")
const router = express.Router()
const controller = require("../controllers/confessionController")

router.post("/", controller.create)
router.get("/", controller.getAll)
router.get("/:id", controller.getOne)
router.get("/category/:cat", controller.getByCategory)
router.delete("/:id", controller.remove)

module.exports = router 