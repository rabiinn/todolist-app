import 'dotenv/config.js'
const PORT = process.env.PORT;
const mongoDBUri = process.env.MONGODB_URI;
const saltRounds = Number(process.env.saltRounds);
const SECRET = process.env.SECRET;
export default {PORT, mongoDBUri, saltRounds,SECRET};