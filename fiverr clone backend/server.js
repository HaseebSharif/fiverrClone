import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import reviewRoutes from "./routes/review.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import gigRoutes from "./routes/gig.route.js";
import messageRoutes from "./routes/message.route.js";
import orderRoutes from "./routes/order.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"







const app = express();


//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({origin:"http://localhost:5173", credentials: true}))



dotenv.config();
// mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1:27017/fiverrClone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection failed:', error);
});

//error handling

app.use((err, req, res , next)=>{
const errorStatus = err.status || 500;
const errorMessage = err.message || "Something Went Wrong";

return res.status(errorStatus).send(errorMessage);
})


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/gig", gigRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/order", orderRoutes);








 app.listen(8800, (req,res)=>{
    // res.send('Server is working')
    console.log("Server is working")
 })