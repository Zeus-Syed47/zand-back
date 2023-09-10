import { run } from './kafka/consumer';
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as http from "http";
import { PORT } from "./config";
import events from "./routes/events";
import { dbConnect } from "./db/index";

//consumer
run().catch(console.error)

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("static"));

/** SQLLITE CONNECTION **/
dbConnect();

app.use("/events", events);

app.get("/ok", (req, res) => {
  res.send("Yes WORKING now");
});

let server = http.createServer(app);
server.listen(PORT, () => {
  console.log("🚀 Server ready at", PORT);
});


export default app;
