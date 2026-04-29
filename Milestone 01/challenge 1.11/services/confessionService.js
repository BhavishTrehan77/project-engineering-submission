let confessions = []
let currentId = 0

const categories = ["bug", "deadline", "imposter", "vibe-code"]

// CREATE
exports.createConfession = (data) => {
  if (!data || !data.text) {
    throw { status: 400, message: "Text is required" }
  }

  if (data.text.length === 0) {
    throw { status: 400, message: "Text too short" }
  }

  if (data.text.length > 500) {
    throw { status: 400, message: "Text too long (max 500 chars)" }
  }

  if (!categories.includes(data.category)) {
    throw { status: 400, message: "Invalid category" }
  }

  const newConfession = {
    id: ++currentId,
    text: data.text,
    category: data.category,
    created_at: new Date()
  }

  confessions.push(newConfession)
  return newConfession
}

// GET ALL
exports.getAllConfessions = () => {
  const sorted = [...confessions].sort(
    (a, b) => b.created_at - a.created_at
  )

  return {
    data: sorted,
    count: sorted.length
  }
}

// GET ONE
exports.getConfessionById = (id) => {
  const confession = confessions.find(c => c.id === id)

  if (!confession) {
    throw { status: 404, message: "Not found" }
  }

  return confession
}

// GET BY CATEGORY
exports.getByCategory = (category) => {
  if (!categories.includes(category)) {
    throw { status: 400, message: "Invalid category" }
  }

  return confessions
    .filter(c => c.category === category)
    .reverse()
}

// DELETE
exports.deleteConfession = (id, token) => {
  if (token !== "supersecret123") {
    throw { status: 403, message: "Unauthorized" }
  }

  const index = confessions.findIndex(c => c.id === id)

  if (index === -1) {
    throw { status: 404, message: "Not found" }
  }

  const deleted = confessions.splice(index, 1)
  return deleted[0]
}