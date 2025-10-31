import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: String,
    dueDate: String,
    priority: String,
    assignedTo: String
})

export default mongoose.model("Todo", todoSchema)