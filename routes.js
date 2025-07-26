const express = require("express");

const Todo = require("./models/todo")
const router = express.Router();

router.get("/todos", async (req, res) => {
    //res.status(200).json({msg: "GET todos /api/todos"});
    const todo = await Todo.find();
    res.status(200).json(todo);
});


router.post("/todos", async (req, res) => {
    const { task } = req.body.task;
    
    const  newToo = new Todo({task:task})
    await newTodo.save();
    res.status(201).json(newTodo);

    //res.status(200).json({msg: "POST todos /api/todos"});
});

router.put("/todos/:id", (req, res) => {
    res.status(200).json({msg: "PUT todos /api/todos"});
});


router.delete("/todos/:id", (req, res) => {
    res.status(200).json({msg: "DELETE todos /api/todos"});
});

module.exports = router;