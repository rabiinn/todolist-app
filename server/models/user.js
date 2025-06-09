import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4
    },
    passwordHash: String,
    name: String,
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
        }
    ]
})


mongoose.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id == returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
})

const user = mongoose.model('User', userSchema);

export default user;