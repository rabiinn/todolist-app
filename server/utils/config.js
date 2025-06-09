import 'dotenv/config.js'
const PORT = process.env.PORT;
const mongoDBUri = process.env.MONGODB_URI;
export default {PORT, mongoDBUri}