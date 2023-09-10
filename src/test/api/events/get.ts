process.env.NODE_ENV = 'test';

import { expect } from "chai";
import * as request from "supertest";

import app from "../../../index";


describe('GET /events', async () => {

  it("OK, there are events", () => {
    request(app)
      .get("/events")
      .then((res) => {
        expect(res.body.data.length).to.equal(3);
      })
      .catch((err) => console.log("catch block this", err));
  });

})



