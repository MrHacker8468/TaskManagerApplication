import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
},
{
    timestamps: true
}); 

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;