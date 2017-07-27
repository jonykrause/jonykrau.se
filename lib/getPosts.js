
var path = require('path');
var DIR = path.resolve(__dirname, '../posts');
var rss = require(path.resolve(__dirname, './rss'));
var slug = require('slug');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var yamlhead = require('yamlhead');
var marked = require('marked').setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});


module.exports = getPosts.bind(null, DIR);


function getPosts(dir) {
  return fs.readdirAsync(dir)
    .map(function(file) {
      return dir + '/' + file;
    })
    .then(function(files) {
      return Promise.all(
        files.map(function(file) {
          if (path.extname(file) == '.md') {
            return buildPost(file);
          }
        }))
        .then(function(results) {
          rss.createXML('public/rss.xml');
          return paginate(sortByDate(results));
        })
    });
}

function buildPost(path) {
  return new Promise(function(resolve, reject) {
    yamlhead(path, {}, function(err, yaml, data) {
      if (err) return reject(err);
      var post = {};
      post.meta = yaml;
      post.markup = JSON.stringify(marked(data));
      post.slug = slug(yaml.title).toLowerCase();
      rss.rssify(post);
      return resolve(post);
    });
  });
}

function sortByDate(posts) {
  return posts.sort(function(a, b) {
    return new Date(b.meta.date) - new Date(a.meta.date);
  });
}

function paginate(posts) {
  posts.forEach(function(post, i, arr) {
    post.nextSlug = arr[i+1] ? arr[i+1].slug : 'undefined';
    post.prevSlug = arr[i-1] ? arr[i-1].slug : 'undefined';
  });
  return posts;
}






