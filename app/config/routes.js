// load models
var Page = require('../models/page');

// expose the routes to our app with module.exports
module.exports = function(app) {
  app.get('/api/pages', function(req, res) {
    Page.find(function(err, pages) {
      if (err)
        res.send(err);

      res.json(pages);
    });
  });

  app.post('/api/pages', function(req, res) {
    Page.create({
      pageName: req.body.title
    }, function (err, todo) {
      if (err)
        res.send(err);

        Page.find(function (err, todos) {
          if (err)
            res.send(err);
          res.json(todos);
        });
    })
    console.log(res)
  });

  app.post('/api/pages/edit', function(req, res) {
    console.log(req.body)
    Page.update({
      _id: req.body.id
    },{
      pageName: req.body.newTitle
    }, function (err, todo) {
      if (err)
        res.send(err);

        Page.find(function (err, todos) {
          if (err)
            res.send(err);
          res.json(todos);
        });
    })
    console.log(res)
  });

  app.post('/api/pages/fin/:page_id', function(req, res) {
    console.log(req)
  });

  app.delete('/api/pages/del/:page_id', function(req, res) {
    Page.remove({
      _id: req.params.page_id
    }, function (err, todo) {
      if (err) res.send(err);

      Page.find(function (err, todos) {
        if (err) res.send(err);
        res.json(todos);
      });
    });
  });

  app.get('/', function(req, res) { res.render('main'); });
};