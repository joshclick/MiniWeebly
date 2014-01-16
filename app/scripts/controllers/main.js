'use strict';

angular.module('miniweeblyApp')
.controller('MainCtrl', function ($scope) {
  $scope.currID = 1;
  $scope.activePage = 0;
  $scope.pages = [{
      id: 0,
      title: 'Page'
    },{
      id: 1,
      title: 'Another'
    }
  ];
  $scope.contents = [{
      pageID: null,
      title: 'Add Title Here',
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna. \n Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes. nascetur ridiculus mus. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },{
      pageID: 0,
      title: 'Page 1',
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna. \n Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes. nascetur ridiculus mus. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },{
      pageID: 1,
      title: 'Page 2',
      text: 'Real content yo'
    },
  ];

  $scope.isActiveContent = function (content) {
    return content.pageID === $scope.activePage;
  };

  $scope.deletePage = function (id) {
    $scope.pages = $scope.pages.filter(function (page) {
      return page.id !== id;
    });
    // need to add shrink and disappear animation
  };
  $scope.addPage = function (title) {
    if ($scope.pages.length < 7 && title.length > 0) {
      $scope.pages.push({
        id: ++$scope.currID,
        title: title
      });
      $scope.newPageText = '';
    } else {
      console.log('Too many pages!');
    }
  };
  $scope.activatePage = function(id) {
    $scope.activePage = id;
  };

  $scope.gridToggle = false; // need add hover state
});
