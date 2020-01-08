const Users = require("./user-model.js"),
  db = require("../database/dbTest-config.js");

describe("First user test", () => {
  describe("insert()", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("should add 2 new users", async () => {
      await Users.insert({
        username: "Jerry",
        password: "lambda",
        city: "Phoenix",
        state: "AZ",
        zipCode: 12344
      });
      await Users.insert({
        username: "Samantha",
        password: "lambda",
        city: "Phoenix",
        state: "AZ",
        zipCode: 12344
      });

      const users = await db("users");
      expect(users).toHaveLength(2);
    });
    it("should return the new user", async () => {
      let user = await Users.insert({
        username: "Dan",
        password: "lambda",
        city: "Phoenix",
        state: "AZ",
        zipCode: 12344
      });
      expect(user.username).toBe("Dan");

      user = await Users.insert({
        username: "Rachel",
        password: "lambda",
        city: "Phoenix",
        state: "AZ",
        zipCode: 12344
      });
      expect(user.username).toBe("Rachel");
    });
  });
});
