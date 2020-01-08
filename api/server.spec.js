const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  test("should set the server environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return status 200 OK", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return a json object", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });
    it('should return "Welcome to the Server..."', async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual(`<div><h1>Welcome to the Server for your Build Week!</h1><h2>Click here to view the API <a href="./api">documentation</a></h2></div>`);
    });
  });
});