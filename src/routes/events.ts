import {db} from './../db/index';
import * as express from 'express';
import {requestBuilder} from '../utils/utils';
import {runProd} from '../kafka/producer';
let router = express.Router();

router
  .route('/')
  // fetch all events
  .get(async (req, res) => {
    try {
      db.all(`SELECT * FROM events`, [], (err, rows) => {
        if (err) {
          throw err;
        }
        res
          .status(200)
          .send(
            requestBuilder(rows, 'events list retrieved successfully', true),
          );
      });
    } catch (err: any) {
      res.status(401).end(requestBuilder([], err.message, false));
    }
  })
  // book an event
  .post(async (req, res) => {
    try {
      const {event_id, no_of_bookings, amount, user_name, email} = req.body;

      if(!event_id || !no_of_bookings || !amount || !user_name || !email){
        res.status(401).send(requestBuilder([], "Fields required", false));
        return
      }

      let sql = `INSERT INTO bookings(booking_id, event_id, no_of_bookings, amount, user_name, email) 
                 VALUES(NULL, ?, ?, ?, ?, ?)`;

      db.run(
        sql,
        [event_id, no_of_bookings, amount, user_name, email],
        function (err) {
          if (err) {
            return console.log(err.message);
          }
          console.log(`A row has been inserted`);
          res
            .status(200)
            .send(requestBuilder([], 'Event booked successfully!', true));
          runProd(email).catch(console.error);
        },
      );
    } catch (err: any) {
      res.status(401).send(requestBuilder([], err.message, false));
    }
  });

export default router;
