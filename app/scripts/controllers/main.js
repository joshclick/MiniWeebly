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

            // set activePage if none set yet, prevents bugginess
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

    $scope.editContent = function (key, value, id) {
      Contents.edit({key: key, val: value, id: id})
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

    $scope.setContentGrid = function () {
      $scope.gridToggle = !$scope.gridToggle;
      var sizeGrid = $scope.gridToggle ?
          [$('#content-cont').width() / 10, 10] : [10, 10];
      $('.content').resizable('option', 'grid', sizeGrid);
    };

    $scope.sizeGrid = $scope.gridToggle ?
          [$('#content-cont').width() / 10, 10] : [10, 10];
    $scope.gridToggle = false;

    $scope.initDrag = function () {
      $('#content-cont').droppable();
      $('#elements .icon').draggable({
          zIndex: 100,
          distance: 20,
          containment: 'document',
          appendTo: '#board',
          revert: function(event) {
              $(this).data("ui-draggable").originalPosition = { top: 0, left: 0 };
              return !event;
          },
          revertDuration: 100,
          stop: function(event, ui) {
              var contentCont = $('#content-cont'),
                  uiLeft = ui.offset.left,
                  uiTop = ui.offset.top,
                  contLeft = contentCont.offset().left,
                  contTop = contentCont.offset().top,
                  contWidth = contentCont.width(),
                  contHeight = contentCont.height();

              // if in #content-cont
              if (uiLeft > contLeft && uiTop > contTop) {
                var s = angular.element('body').scope();
                s.addContent($(this).attr('id'), s.activePage._id);
                $(this).css({top:0,left:0});
              }
          }
      });
    }();

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
  })
  .directive('dragsize', function () {
    return function (scope, element, attrs) {
      scope.$watch("contents", function (value) {
          var val = value || null;
          if (val) {
            $(element).parent('#content-cont').sortable({
              cancel: '.val',
              stop: function (e, ui) {
                // set order in db
                $.each($('.content'), function(i, d) {
                  var id = $(d).attr('contentID'),
                    idx = $('#content-cont').sortable('toArray', {attribute: 'contentID'}).indexOf(id);
                  element.scope().editContent('order', idx, id);  
                })
              }
            });
            $(element)
              .resizable({
                grid: element.scope().sizeGrid,
                stop: function (e, ui) {
                  var parent = ui.element.parent();
                  ui.element.css({
                      width: ui.element.width() / parent.width() * 100 + '%',
                  });
                  // update in model
                  var newWidth = parseFloat($($(element)[0]).attr('style').split(':')[1].slice(1,7));
                  element.scope().editContent('width', newWidth, $(this).attr('contentID'));
                },
                containment: "#content-cont"
              });
          }
      });
    };
});
