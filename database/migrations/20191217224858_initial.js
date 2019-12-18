exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments("id");
      tbl
        .string("username", 128)
        .unique()
        .notNullable();
      tbl.string("password", 128).notNullable();
      tbl.string("city", 128).notNullable();
      tbl.string("state", 128).notNullable();
      tbl.integer("zipCode", 5).notNullable();
      tbl.string("profileImgURL", 128);
    })
    .createTable("produce", tbl => {
      tbl.increments("id");
      tbl
        .string("name", 128)
        .unique()
        .notNullable();
      tbl.string("description", 128);
      tbl.string("produceImgURL", 128);
    })
    .createTable("farmers", tbl => {
      tbl.increments("id");
      tbl
        .string("username", 128)
        .unique()
        .notNullable();
      tbl.string("password", 128).notNullable();
      tbl.string("city", 128).notNullable();
      tbl.string("state", 128).notNullable();
      tbl.integer("zipCode", 5).notNullable();
      tbl.string("profileImgURL", 128);
    })
    .createTable("farmers_produce", tbl => {
      tbl
        .integer("farmer_id")
        .references("id")
        .inTable("farmers")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("produce_id")
        .references("id")
        .inTable("produce")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.integer("quantity").unsigned();
      tbl.float("price").unsigned();
      tbl.primary(["farmer_id", "produce_id"]);
    })
    .createTable("users_produce", tbl => {
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("produce_id")
        .references("id")
        .inTable("produce")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.integer("quantity").unsigned();
      tbl.float("price").unsigned();
      tbl.primary(["user_id", "produce_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users_produce")
    .dropTableIfExists("farmers_produce")
    .dropTableIfExists("farmers")
    .dropTableIfExists("produce")
    .dropTableIfExists("users");
};
