const express = require('express');
const router = express.Router();

// Import Needed Model
const Post = require('../app/index').Post;


const PostArray = [];
Post.find((err, Posts) => {
  if (err){ return console.error(err) }
  else { PostArray.push(...Posts); }
})

/* GET home page. */
const baseUrl = '/';
router.get(baseUrl, (req, res, next) => {
  res.render('index', { home: false, title: 'Posts', posts: PostArray });
});

// Testing
// let testPost = new Post({
//   title: 'Test Post',
//   created_at: new Date(),
//   updated_at: new Date()
// });
//
// testPost.save((err, testPost) => {
//   if (err) { return console.error(err) }
//   else { console.log('testPost Saved'); }
// });
// Testing

module.exports = { router };
