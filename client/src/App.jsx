import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([])
  const [task, setTask] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("Low")
  const [assignedTo, setAssignedTo] = useState("")
  // states for editing
  const [editingId, setEditingId] = useState(null)
  const [editTask, setEditTask] = useState("")
  const [editDueDate, setEditDueDate] = useState("")
  const [editPriority, setEditPriority] = useState("Low")
  const [editAssignedTo, setEditAssingedTo] = useState("")

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  }

  useEffect(()=> {
    fetchTodos();
  }, [])

  const handleAdd = async () => {
    if(!task.trim()) return
    const res = await axios.post("http://localhost:5000/api/todos", {
      task,
      dueDate,
      priority,
      assignedTo
    });
    setTodos([...todos, res.data]);
    setTask(""); setDueDate(""); setPriority("Low"); setAssignedTo("");
  }

  const startEdit = (todo) => {
    setTask(todo.task)
    setDueDate(todo.dueDate)
    setPriority(todo.priority)
    setAssignedTo(todo.assignedTo)

    setEditingId(todo._id)
    setEditTask(todo.task)
    setEditDueDate(todo.dueDate)
    setEditPriority(todo.priority)
    setEditAssingedTo(todo.assignedTo)
  }

  const handleUpdate = async () => {
    const res = await axios.put(`http://localhost:5000/api/todos/${editingId}`, {task, dueDate, priority, assignedTo})
    setTodos(todos.map(todo => todo._id === editingId ? res.data : todo))
    setEditingId(null)
    setEditTask("")
    setEditDueDate("")
    setEditPriority("")
    setEditAssingedTo("")
    
    setTask("")
    setDueDate("")
    setPriority("")
    setAssignedTo("")
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`)
    setTodos(todos.filter(todo => todo._id !== id))
  }

  return(
    <div>
      <h2>To-Do App</h2>
      <input placeholder="Task" type="text" value={task} onChange={e => setTask(e.target.value)}  />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input placeholder="Assigned To" value={assignedTo} onChange={e => setAssignedTo(e.target.value)} />
      <button onClick={editingId ? handleUpdate : handleAdd}>{ editingId ? "Update" : "Add Task"}</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            Task - {todo.task} <br />
            Due Date - {todo.dueDate?.split("T")[0]} <br />
            Priority - {todo.priority} <br />
            Assigned To - {todo.assignedTo} <br />
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
            <button onClick={() => startEdit(todo )}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App;

