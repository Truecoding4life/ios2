const User = require('./User');
const Resource = require('./Resource');
const Project = require('./Project');
const Category = require('./Category');
const Comment = require('./Comment');
const Like = require('./Like');

// Define relationship between post and comment
Resource.hasMany(Comment, { foreignKey: 'resource_id' });
Comment.belongsTo(Resource, { foreignKey: "resource_id" });



// Define relationship between post and like
Resource.hasMany(Like, { foreignKey: 'resource_id' });
Like.belongsTo(Resource, { foreignKey: "resource_id" });

// Relationship between User and Resource
User.hasMany(Resource, {
  foreignKey: 'user_id',
});
Resource.belongsTo(User, {
  foreignKey: 'user_id',
});


// Relationship between Resource and Category
Resource.hasOne(Category, {
  foreignKey: 'category_id',
});

Category.belongsTo(Resource, {
  foreignKey: 'category_id',
});

// Relationship between Resource and Project
Resource.belongsToMany(Project, {
  foreignKey: 'project_id',
  through: 'resource_project',
  as: 'projects'
});
Project.belongsToMany(Resource, {
  foreignKey: 'resource_id',
  through: 'resource_project',
  as: 'resources'
});

User.hasOne(Project, {
  foreignKey: 'user_id',
});
Project.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Project, Resource, Category , Comment, Like};
