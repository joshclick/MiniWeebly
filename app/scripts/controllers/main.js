'use strict';

angular.module('pageController', [])
  .controller('mainController', function ($scope, $http, Pages, Contents) {
    Pages.get()
      .success(function (data) {
        $scope.pages = data;
        $scope.activePage = $scope.pages[0];
      });
    Contents.get()
      .success(function (data) {
        $scope.contents = data;
      });

    $scope.deletePage = function (id) {
      Pages.delete(id)
        .success(function (data) {
          $scope.pages = data;
          $scope.activePage = $scope.pages[0];
        });
      // delete associated content

      // need to add shrink and disappear animation
    };
    $scope.addPage = function () {
      if (!$.isEmptyObject($scope.newPageForm)) {
        Pages.create($scope.newPageForm)
          .success(function (data) {
            $scope.newPageForm.title = '';
            $scope.pages = data;

            if (!$scope.activePage)
              $scope.activePage = $scope.pages[0];
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
      // validate that this is image link
      if (imgURL) {
        $scope.splashURL = imgURL;
      }
    };

    // filtering content for display
    $scope.filterContent = function (content) {
      return content.pageID === $scope.activePage._id;
    };

    // stuff for adding content (title, text, image, nav)
    $scope.addContent = function (type, id) {
      Contents.create({type: type, id: id})
        .success(function (data) {
          $scope.contents = data;
        });
    };

    $scope.editContent = function (value, id) {
      Contents.edit({val: value, id: id})
        .success(function (data) {
          $scope.contents = data;
        });
    };

    // stuff for editing content
    $scope.removeContent = function (id) {
      Contents.delete(id)
        .success(function (data) {
          $scope.contents = data;
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
