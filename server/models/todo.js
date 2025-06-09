import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    status: String,
    createdat: Date,
    dueDate: Date, 
})

todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id,
        delete returnedObject.__v;
    }
})

const todo = mongoose.model('Todo', todoSchema);

export default todo;