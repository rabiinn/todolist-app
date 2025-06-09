import 'dotenv/config.js'
const PORT = process.env.PORT;
const mongoDBUri = process.env.MONGODB_URI;
const saltRounds = process.env.saltRounds;
export default {PORT, mongoDBUri, saltRounds};