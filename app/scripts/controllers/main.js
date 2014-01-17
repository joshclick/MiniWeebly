'use strict';

angular.module('pageController', [])
  .controller('mainController', function ($scope, $http, Pages) {
    Pages.get()
      .success(function (data) {
        $scope.pages = data;
        $scope.activePage = $scope.pages[0];
      });
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

    $scope.deletePage = function (id) {
      Pages.delete(id)
        .success(function (data) {
          $scope.pages = data;
          $scope.activePage = $scope.pages[0];
        });

      // need to add shrink and disappear animation
    };
    $scope.addPage = function () {
      if (!$.isEmptyObject($scope.newPageForm)) {
        Pages.create($scope.newPageForm)
          .success(function (data) {
            $scope.newPageForm.title = '';
            $scope.pages = data;
          });
      }
    };
    $scope.editPageTitle = function (newTitle, id) {
      Pages.edit({newTitle: newTitle, id: id})
        .success(function (data) {
          $scope.pages = data;
        });
    };

    $scope.activatePage = function (id) {
      $scope.activePage = $scope.pages.filter(function (d) {
        return d._id === id;
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
