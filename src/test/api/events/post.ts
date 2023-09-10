process.env.NODE_ENV = 'test';

import { expect } from "chai";
import * as request from "supertest";

import app from "../../../index";


describe('POST /users', async () => {

  it("OK, booking an event works", () => {
    request(app)
      .post("/events")
      .send({
        event_id: 1,
        no_of_bookings: 1,
        amount: 250,
        user_name: "zeus",
        email: "zeus@gmail.com",
      })
      .then((res) => {
        expect(res.body.success).to.equal(true);
      })
      .catch((err) => console.log("catch block this", err));
  });

  it("Fail, user name field is required", () => {
    request(app)
      .post("/users")
      .send({
        event_id: 1,
        no_of_bookings: 1,
        amount: 250,
        email: "zeus@gmail.com",
      })
      .then((res) => {
        expect(res.body.message).to.equal(
          "User validation failed: name: Path `user_name` is required."
        );
      })
      .catch((err) => console.log("catch block this", err));
  });

})



