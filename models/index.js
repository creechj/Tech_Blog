const User = require("./User");
const Blog = require("./Blog");

User.hasMany(Blog, {
  foreignKey: "user_id",
});

// The association can also be created from the Car side
Blog.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Blog };
