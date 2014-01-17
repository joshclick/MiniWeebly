'use strict';

angular.module('contentService', [])
.factory('Contents', function ($http) {
  return {
    get : function () {
      return $http.get('/api/contents');
    },
    create : function (contentData) {
      return $http.post('/api/contents', contentData);
    },
    edit   : function (newPageData) {
      return $http.post('/api/contents/edit', newPageData);
    },
    delete : function (id) {
      return $http.delete('/api/contents/del/' + id);
    }
  };
});