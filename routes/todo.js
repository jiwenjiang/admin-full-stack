const { Router } = require("express");
const Todo = require("../models/todo");
const auth = require("../middleware/auth");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title && !title.trim()) {
      return res.status(400).json({ message: "Field is empty" });
    }

    const todo = new Todo({
      title,
      user: req.user.userId,
    });

    await todo.save();

    res.status(201).json({ todo });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    await Todo.findByIdAndRemove(id);

    res.status(201).json({ message: "Successfully removed" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong " });
  }
});

router.post("/update", auth, async (req, res) => {
  try {
    const { id, done } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    await Todo.findByIdAndUpdate(id, { done });

    res.status(201).json({ message: "Successfully updated" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/doneAll", auth, async (req, res) => {
  try {
    await Promise.all(
      req.body.map((todo) => Todo.findByIdAndUpdate(todo._id, { done: true }))
    );

    res.status(201).json({ message: "Successfully updated" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/removeAllDone", auth, async (req, res) => {
  try {
    await Promise.all(req.body.map((todo) => Todo.findByIdAndRemove(todo._id)));

    res.status(201).json({ message: "Successfully updated" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(todos);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
