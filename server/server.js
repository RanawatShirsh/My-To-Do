import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import todoRoutes from "./routes/todoRoutes.js"

dotenv.config();            //Ye line .env file ko load karti hai — tabhi process.env.MONGO_URI jaise variables kaam karte hain
const app = express();      // Ek Express app, iska use server setup aur API banane ke liye hota hai. Jaise app.get(), app.post() wagaira
app.use(cors());            //Ye line batati hai ki server har request ke liye CORS allow karega frontend agar alag port pe chal raha hai to bhi request ho paaye
app.use(express.json());    // Is line se Express ko batate ho ki request ke body ko JSON format me read kare POST/PUT reqts ke liye zaruri hota hai

app.use("/api/todos", todoRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("MongoDB Connected")
        app.listen(5000, () => console.log("Server running on port 5000") )
    })
    .catch(err => console.error(err))
    