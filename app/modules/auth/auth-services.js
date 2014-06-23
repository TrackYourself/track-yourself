/* Auth interceptor -- redirects to login page when needed */

module.exports.authInterceptor = function($q, $location, $rootScope) {

  function isPublic(path) {
    if (path.search('login') !== -1 ||
        path.search('register' !== -1 ||
        path.search('index') !== -1)) {
      return true;
    }
    return false;
  }

  return {
    request: function(config) {
      if (!$rootScope.currentUser && !isPublic(config.url)) {
        $location.path('/login');
      }
      return config;
    },
    response: function(response) {
      if (response.status === 401 && response.url !== '/auth/login' && response.url !== '/auth/register') {
        $location.path('/login');
      }
      return response;
    }
  };
};


