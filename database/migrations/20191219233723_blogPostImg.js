exports.up = function(knex, Promise) {
  return knex.schema.table("blogs", tbl => {
    tbl.text("blogPostImgURL");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("blogs", tbl => {
    tbl.dropColumn("blogPostImgURL");
  });
};
