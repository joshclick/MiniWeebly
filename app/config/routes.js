// load models
var Page = require('../models/page');
var Content = require('../models/content');

// expose the routes to our app with module.exports
module.exports = function(app) {
  app.get('/api/pages', function(req, res) {
    Page.find(function(err, pages) {
      res.json(pages);
    });
  });

  app.post('/api/pages', function(req, res) {
    Page.create(
      { pageName: req.body.title },
      function (err, todo) {
        Page.find(function (err, todos) {
          res.json(todos);
        });
      });
  });

  app.post('/api/pages/edit', function(req, res) {
    Page.findOneAndUpdate(
      { _id: req.body.id },
      { pageName: req.body.newTitle },
      function (err, todo) {
        Page.find(function (err, todos) {
          res.json(todos);
        });
      });
  });  

  app.delete('/api/pages/del/:page_id', function(req, res) {
    Page.remove(
      { _id: req.params.page_id },
      function (err, todo) {
        Page.find(function (err, todos) {
          res.json(todos);
        });
      });
  });

  app.get('/api/contents', function(req, res) {
    Content.find(function(err, contents) {
      res.json(contents);
    });
  });

  app.post('/api/contents', function(req, res) {
    var newContent = {
      pageID: req.body.id,
      type  : req.body.type
    };
    switch (req.body.type) {
      case 'title':
        newContent.value = 'Title Here!';
        break;
      case 'text':
        newContent.value = 'a lot of text goes here';
        break;
      case 'image':
        newContent.value = 'image goes here';
        break;
      case 'nav':
        newContent.value = 'what do i put here..'
        break;
    }

    Content.create(newContent,
      function (err, content) {
        Content.find(function (err, contents) {
          res.json(contents);
        });
      }
    );
  });

  app.post('/api/contents/edit', function(req, res) {
    Content.findOneAndUpdate(
      { _id: req.body.id },
      { value: req.body.val },
      function (err, content) {
        Content.find(function (err, contents) {
          res.json(contents);
        });
      });
  });

  app.delete('/api/contents/del/:cont_id', function(req, res) {
    Content.remove(
      { _id: req.params.cont_id },
      function (err, content) {
        Content.find(function (err, contents) {
          res.json(contents);
        });
      });
  });

  app.get('/', function(req, res) { res.render('main'); });
};