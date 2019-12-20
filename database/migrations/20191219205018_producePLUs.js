exports.up = function(knex) {
  return knex.schema.table("produce", tbl => {
    tbl.integer("PLU", 5).unique();
  });
};

exports.down = function(knex) {
  return knex.schema.table("produce", tbl => {
    tbl.dropColumn("PLU");
  });
};
