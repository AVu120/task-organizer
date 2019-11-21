// https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./connect-db";
import "./initialize-db";
import { authenticationRoute } from "./authenticate";
import path from "path";

// If on Heroku, process.env.PORT will be defined to unique port for our application.
let port = process.env.PORT || 7777;

// Create express instance.
let app = express();

app.listen(port, console.log("Server listening on port", port));

// req refers to request parameters, res refers to response object.
app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

// Everything passed here = plug-in of application.
app.use(
  cors(),
  // These 2 will let us respond to HTTP POST requests which are similiar to
  // GET requests, though more powerful and hard to use.
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json()
);

authenticationRoute(app);

if (process.env.NODE_ENV == `production`) {
  // Whatever folder path we put in app.use(express.static())
  // everything within this folder path will be served by express server
  // just like it was the base directory of our application.
  app.use(express.static(path.resolve(__dirname, `../../dist`)));
  // In response to HTTP get request to any path,
  // sever the index.html file we created manually.
  // This will allow us to not use webpack dev server in production.
  app.get(`/*`, (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}

// Function to communicate with the DB, because POST requests are hard to test.
export const addNewTask = async task => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);
  await collection.insertOne(task);
};

app.post("/task/new", async (req, res) => {
  // body being whatever data that the requester passes in with the HTTP request.
  let task = req.body.task;
  await addNewTask(task);
  res.status(200).send();
});

export const updateTask = async task => {
  let { id, group, isComplete, name } = task;
  let db = await connectDB();
  let collection = db.collection(`tasks`);

  if (group) {
    await collection.updateOne({ id }, { $set: { group } });
  }
  if (name) {
    await collection.updateOne({ id }, { $set: { name } });
  }
  // Since in some cases undefined would equate to false, which is wrong,
  if (isComplete !== undefined) {
    await collection.updateOne({ id }, { $set: { isComplete } });
  }
};

app.post("/task/update", async (req, res) => {
  // body being whatever data that the requester passes in with the HTTP request.
  let task = req.body.task;
  await updateTask(task);
  res.status(200).send();
});
