import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import mongoose from "mongoose";
import populateUsers from "./utils/populateDatabase.js";
import router from "./routes/index.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();
app.use(express.json());
const port = 8000;

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Bien connecté à la base de donnée !");
    populateUsers();
  } catch (e) {
    console.error(e);
  }
}
connectToDatabase().catch(console.error);

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use("/", router);


app.listen(port, () => console.log(`Listen on port ${port}`));
