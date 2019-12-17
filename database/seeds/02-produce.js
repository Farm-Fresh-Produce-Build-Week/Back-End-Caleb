exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("produce")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("produce").insert([
        {
          name: "Corn",
          description: "Yellow kernels on a cobb. Can be used to make popcorn",
          produceImgURL:
            "https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
        },
        {
          name: "Peaches",
          description:
            "Millions of peaches. Peaches for free. Millions of peaches. Peaches for me",
          produceImgURL:
            "https://images.unsplash.com/photo-1521243495304-138a02be58e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
        },
        {
          name: "Tomatoes",
          description:
            "Well for those of you with texture and stomach-acid issues, there's always ketchup. Get your italian on! I've got the best Eye-talian accent",
          produceImgURL:
            "https://images.unsplash.com/photo-1444731961956-751ed90465a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
        },
        {
          name: "Carrots",
          description: "Aye, what's up DOC?",
          produceImgURL:
            "https://images.unsplash.com/photo-1550081699-79c1c2e48a77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
        }
      ]);
    });
};
