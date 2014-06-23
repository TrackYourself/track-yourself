/* Auth interceptor -- redirects to login page when needed */

module.exports.authInterceptor = function($q, $location, $rootScope) {
  return {
    request: function(config) {
      if (!$rootScope.currentUser && config.url !== '/login' && config.url !== '/register' && config.url !== '/') {
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


