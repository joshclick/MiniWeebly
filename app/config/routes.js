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
        newContent.value = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.';
        break;
      case 'image':
        newContent.value = '<a onclick="$scope.setImage()"><img ng-src="static/img/Image-Placeholder.png" src="static/img/Image-Placeholder.png"><p ng-hide="splashURL" class="">Add Image +</p></a>';
        break;
      case 'nav':
        newContent.value = '<a href="www.weebly.com"></a>'
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
    switch (req.body.key) {
      case 'value':
        Content.findOneAndUpdate(
          { _id: req.body.id },
          { value: req.body.val },
          function (err, content) {
            Content.find(function (err, contents) {
              res.json(contents);
            });
          });
        break;
      case 'width':
        Content.findOneAndUpdate(
          { _id: req.body.id },
          { width: req.body.val },
          function (err, content) {
            Content.find(function (err, contents) {
              res.json(contents);
            });
          });
        break;
    }
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