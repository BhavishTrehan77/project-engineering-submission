const service = require("../services/confessionService")

// CREATE
exports.create = (req, res) => {
  try {
    const data = service.createConfession(req.body)
    res.status(201).json(data)
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message })
  }
}

// GET ALL
exports.getAll = (req, res) => {
  try {
    const data = service.getAllConfessions()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// GET ONE
exports.getOne = (req, res) => {
  try {
    const data = service.getConfessionById(parseInt(req.params.id))
    res.json(data)
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message })
  }
}

// GET CATEGORY
exports.getByCategory = (req, res) => {
  try {
    const data = service.getByCategory(req.params.cat)
    res.json(data)
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message })
  }
}

// DELETE
exports.remove = (req, res) => {
  try {
    const data = service.deleteConfession(
      parseInt(req.params.id),
      req.headers["x-delete-token"]
    )
    res.json({ msg: "Deleted", data })
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message })
  }
}