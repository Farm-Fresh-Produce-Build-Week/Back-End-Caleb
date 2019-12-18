const bcrypt=require('bcryptjs');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "Caleb",
          password: bcrypt.hashSync("lambda", 10),
          city: "Tempe Town Lake",
          state: "Arizona",
          zipCode: "85282",
          profileImgURL:
            "https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/p160x160/73370561_10157634745209070_7567910822853214208_o.jpg?_nc_cat=102&_nc_ohc=T2nE4KYNKkwAQkzyzreVTLWJVgLlo_kr_zJX4Qnja10YVrSe9O1uNjWdw&_nc_ht=scontent-lax3-1.xx&oh=fab526808f71bc15d3c48d6f788549b5&oe=5E6E6376"
        },
        {
          username: "Chris",
          password: bcrypt.hashSync("lambda", 10),
          city: "Orange County Naples",
          state: "California",
          zipCode: "90620",
          profileImgURL:
            "https://images.unsplash.com/photo-1541418950054-c12804e149d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
        },
        {
          username: "Logan",
          password: bcrypt.hashSync("lambda", 10),
          city: "Seattle Seasucks",
          state: "Washington",
          zipCode: "98101",
          profileImgURL:
            "https://pbs.twimg.com/profile_images/1141104031609151489/I0W2IBp6_400x400.jpg"
        },
        {
          username: "Carlos",
          password: bcrypt.hashSync("lambda", 10),
          city: "Miami Vice",
          state: "Florida",
          zipCode: "33101",
          profileImgURL:
            "https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
        }
      ]);
    });
};
