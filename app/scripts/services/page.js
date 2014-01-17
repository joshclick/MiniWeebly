'use strict';

angular.module('pageService', [])
.factory('Pages', function ($http) {
  return {
    get : function () {
      return $http.get('/api/pages');
    },
    create : function (newPageForm) {
      return $http.post('/api/pages', newPageForm);
    },
    edit   : function (newPageData) {
      return $http.post('/api/pages/edit', newPageData);
    },
    delete : function (id) {
      return $http.delete('/api/pages/del/' + id);
    }
  };
});
