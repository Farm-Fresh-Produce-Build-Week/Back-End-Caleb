exports.up = function (knex) {
  return knex.schema.table("blogs", tbl => {
    tbl.text("blogPostImgURL");
  });
};

exports.down = function (knex) {
  return knex.schema.table("blogs", tbl => {
    tbl.dropColumn("blogPostImgURL");
  });
};
