import Todo from "../models/Todo.js"

// Get All To-Do
export const getTodos = async (req,res) => {
    const todos = await Todo.find()
    res.json(todos)
}

// Create a new To-Do
export const createTodo = async(req,res) => {
    const { task, dueDate, priority, assignedTo } = req.body
    const todo = await Todo.create({ task, dueDate, priority, assignedTo })
    res.json(todo)
}

// Delete todo
export const deleteTodo = async (req,res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.json(todo)
}

// Update Todo
export const updateTodo = async (req,res) => {
    try {
        const { task, dueDate, priority, assignedTo } = req.body
        // const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const todo = await Todo.findByIdAndUpdate(
            req.params.id, 
            {task, dueDate, priority, assignedTo}, 
            {new: true}
        )
        res.json(todo);
    } catch (error) {
        res.status(500).json({error: err.message})
    }
}

