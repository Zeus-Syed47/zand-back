
const sqlite3 = require('sqlite3').verbose();


export let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

export const dbConnect = async () => {

  db.serialize(() => {
    // Queries scheduled here will be serialized.
    db.run(`CREATE TABLE IF NOT EXISTS events (
      event_id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      day INTEGER NOT NULL,
      month TEXT NOT NULL,
      price INTEGER NOT NULL,
      location TEXT NOT NULL
    )`)
      .run(`INSERT INTO events (event_id, name, day, month, price, location)
      VALUES(NULL, 'FinTech Hub', 10, 'JULY', 250, 'DIFC');`)
      .run(`INSERT INTO events (event_id, name, day, month, price, location)
      VALUES(NULL, 'Crypto Valley', 04, 'April', 150, 'JLT');`)
      .run(`INSERT INTO events (event_id, name, day, month, price, location)
      VALUES(NULL, 'Board games catchup', 21, 'March', 100, 'Dubai Marina');`)
      .each(`SELECT name, event_id FROM events`, (err, row) => {
        if (err){
          throw err;
        }
        console.log(row.name, row.event_id);
      });
  });

  db.serialize(() => {
    // Queries scheduled here will be serialized.
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
      booking_id INTEGER PRIMARY KEY,
      event_id INTEGER NOT NULL,
      no_of_bookings INTEGER NOT NULL,
      amount INTEGER NOT NULL,
      user_name TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      FOREIGN KEY (event_id) REFERENCES events (event_id)
    )`);
  });

}

// close the database connection
export const dbClose = async () => {
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
}