const Farmers = require("./farmer-model.js"),
  db = require("../database/dbTest-config.js");

describe("First farmer test", () => {
  describe("insert()", () => {
    beforeEach(async () => {
      await db("farmers").truncate();
    });
    it("should add 2 new farmers", async () => {
      await Farmers.insert({
        username: "Farmer Jerry",
        password: "lambda",
        city: "Phoenix",
        state: "AZ",
        zipCode: 12344
      });
      await Farmers.insert({
        username: "Farmer Samantha",
        password: "lambda",
        city: "Phoenix",
        state: "AZ",
        zipCode: 12344
      });

      const farmers = await db("farmers");
      expect(farmers).toHaveLength(2);
    });
    it("should return the new farmer", async () => {
      let farmer = await Farmers.insert({
        username: "Farmer Dan",
        password: "lambda",
        city: "Phoenix",
        state: "AZ",
        zipCode: 12344
      });
      expect(farmer.username).toBe("Farmer Dan");

      farmer = await Farmers.insert({
        username: "Farmer Rachel",
        password: "lambda",
        city: "Phoenix",
        state: "AZ",
        zipCode: 12344
      });
      expect(farmer.username).toBe("Farmer Rachel");
    });
  });
});
