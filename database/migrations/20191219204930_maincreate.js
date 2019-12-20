exports.up = function(knex, Promise) {
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
      tbl
        .integer("PLU", 5)
        .unique()
        .notNullable();
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
      tbl.integer("SKU").unique();
      tbl
        .integer("farmer_id")
        .references("id")
        .inTable("farmers")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("PLU")
        .references("PLU")
        .inTable("produce")
        .notNullable();
      tbl
        .integer("quantity")
        .unsigned()
        .notNullable();
      tbl.string("increment", 128).notNullable();
      tbl
        .float("price")
        .unsigned()
        .notNullable();
      tbl.primary(["farmer_id", "PLU"]);
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
        .integer("SKU")
        .references("SKU")
        .inTable("farmers_produce")
        .notNullable()
        .unsigned()
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("quantity")
        .unsigned()
        .notNullable();
      tbl.primary(["user_id", "SKU"]);
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

exports.down = function(knex, Promise) {
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
