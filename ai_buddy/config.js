const { OpenAI } = require("openai");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");
require("dotenv").config();

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  credential: admin.credential.cert(serviceAccount),
};

const app = admin.initializeApp(config);
const db = admin.firestore(app)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = { openai, db };
