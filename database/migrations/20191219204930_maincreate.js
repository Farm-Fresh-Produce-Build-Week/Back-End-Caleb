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
      tbl.text("profileImgURL");
    })
    .createTable("produce", tbl => {
      tbl.increments("id");
      tbl
        .string("name", 128)
        .unique()
        .notNullable();
      tbl.string("description");
      tbl.text("produceImgURL");
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
      tbl.text("profileImgURL");
      tbl.text("farmImgURL");
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
      tbl
        .integer("farmer_id")
        .references("id")
        .inTable("farmers")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("quantity")
        .unsigned()
        .notNullable();
      tbl.primary(["user_id", "produce_id", "farmer_id"]);
    })
    .createTable("reviews", tbl => {
      tbl.increments();
      tbl
        .integer("farmer_id")
        .references("id")
        .inTable("farmers")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
      tbl.string("review").notNullable();
      // tbl.primary(["farmer_id", "user_id"]);
    })
    .createTable("comments", tbl => {
      tbl.increments();
      tbl
        .integer("review_id")
        .references("id")
        .inTable("reviews")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
      tbl.string("comment").notNullable();
    })
    .createTable("blogs", tbl => {
      tbl.increments();
      tbl
        .integer("farmer_id")
        .references("id")
        .inTable("farmers")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
      tbl.text("post").notNullable();
    })
    .createTable("blog_comments", tbl => {
      tbl.increments();
      tbl
        .integer("blog_id")
        .references("id")
        .inTable("blogs")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
      tbl.string("comment").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("blog_comments")
    .dropTable("blogs")
    .dropTable("comments")
    .dropTable("reviews")
    .dropTable("users_produce")
    .dropTable("farmers_produce")
    .dropTable("farmers")
    .dropTable("produce")
    .dropTable("users");
};
