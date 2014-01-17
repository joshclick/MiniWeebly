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
  })
  .directive('dragsize', function () {
    return function (scope, element, attrs) {
      scope.$watch("contents", function (value) {//I change here
          var val = value || null;
          if (val) {
            $(element).parent('#content-cont').sortable({
              create: function () {
                $(this).height($(this).height());
              }
            });
            $(element)
              .resizable({
                animate: true,
                grid: $('#content-cont').width() / 10,
                handles: 'e, w',
                stop: function(e, ui) {
                  var parent = ui.element.parent();
                  ui.element.css({
                      width: ui.element.width() / parent.width() * 100 + '%',
                  });
                }
              });

            $('#content-cont').droppable();
            $('#elements .icon').draggable({
                zIndex: 100,
                distance: 20,
                containment: 'document',
                revert: function(event) {
                    $(this).data("ui-draggable").originalPosition = { top: 0, left: 0 };
                    return !event;
                },
                revertDuration: 100,
                drag: function(event, ui) {
                    var contentCont = $('#content-cont'),
                        content = $(element),
                        uiLeft = ui.offset.left,
                        uiTop = ui.offset.top,
                        contLeft = contentCont.offset().left,
                        contTop = contentCont.offset().top,
                        contWidth = contentCont.width(),
                        contHeight = contentCont.height();

                    if (content.length > 1) return;
                    if ($(this).attr('id') !== 'text') return;

                    // if in #content-cont
                    if (uiLeft > contLeft && uiTop > contTop) {
                        content.css({width: '50%'});
                        if (uiLeft < contLeft + contWidth/2) // on left
                            content.css({float: 'right'});
                        else if (uiLeft > contLeft + contWidth/2) // on right
                            content.css({float: 'left'});
                    } else {
                        content.css({width: '100%', float: 'left'});
                    }
                },
                stop: function(event, ui) {
                    var contentCont = $('#content-cont'),
                        content = $(element),
                        uiLeft = ui.offset.left,
                        uiTop = ui.offset.top,
                        contLeft = contentCont.offset().left,
                        contTop = contentCont.offset().top,
                        contWidth = contentCont.width(),
                        contHeight = contentCont.height();

                    // if in #content-cont
                    if (uiLeft > contLeft && uiTop > contTop) {
                        $scope.addContent($(this).attr('id'), $scope.activePage._id);
                        // $(this).css({top:0,left:0});
                        // if (content.length > 1) return;
                        // if (uiLeft < contLeft + contWidth/2) // on left
                        //     content.before($(content).clone());
                        // else if (uiLeft > contLeft + contWidth/2) // on right
                        //     content.after($(content).clone());
                    }
                }
            });
          }
      });
    };
});
