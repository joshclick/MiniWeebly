'use strict';

angular.module('miniweeblyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.currPageID = 1;
    $scope.defaultPage = {
      pageID: null,
      pageName: 'Page',
      contents: [
        {
          type: 'title',
          value: 'Add Title Here',
        },{
          type: 'text',
          value: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna. \n Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes. nascetur ridiculus mus. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
      ]
    };
    $scope.pages = [{
        pageID: 0,
        pageName: 'Page',
        contents: [
          {
            type: 'title',
            value: 'Page 1',
          },{
            type: 'text',
            value: 'Lala lots of content. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna. \n Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes. nascetur ridiculus mus. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          }
        ]
      },{
        pageID: 1,
        pageName: 'Another',
        contents: [
          {
            type: 'title',
            value: 'Page 2',
          },{
            type: 'text',
            value: 'Real content yo'
          }
        ]
      },
    ];
    $scope.activePage = $scope.pages[0];

    $scope.deletePage = function (id) {
      // deletes pages
      $scope.pages = $scope.pages.filter(function (page) {
        return page.pageID !== id;
      });

      // sets new activepage if active page was deleted
      if (id === $scope.activePage.pageID) {
        $scope.activePage = $scope.pages[0];
      }

      // need to add shrink and disappear animation
    };
    $scope.addPage = function (title) {
      if ($scope.pages.length < 7 && title.length > 0) {
        // add to pages
        var newPage = angular.copy($scope.defaultPage);
        newPage.pageID = ++$scope.currPageID;
        newPage.pageName = title;
        $scope.pages.push(newPage);

        // reset text for add page
        $scope.newPageText = '';
      } else {
        console.log('Too many pages!');
      }
    };
    $scope.activatePage = function (id) {
      $scope.activePage = $scope.pages.filter(function (d) {
        return d.pageID === id;
      })[0];
    };

    // stuff for splash
    $scope.splashURL = '';
    $scope.defaultSplash = 'static/img/Image-Placeholder.png';
    $scope.setImage = function () {
      var imgURL = window.prompt('', 'Enter Image URL Here');
      $scope.splashURL = imgURL;
    };

    // stuff for editing content
    $scope.removeContent = function (content) {
      $scope.activePage.contents = $scope.activePage.contents.filter(function (d) {
        return d !== content;
      });
    };

    $scope.gridToggle = false;
  })
  // enable 2 way binding for contenteditable stuff
  .directive('contenteditable', function () {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, ctrl) {
        // view -> model
        elm.bind('blur', function () {
            scope.$apply(function () {
                ctrl.$setViewValue(elm.html());
              });
          });

        // model -> view
        ctrl.$render = function () {
            elm.html(ctrl.$viewValue);
          };
      }
    };
  });
