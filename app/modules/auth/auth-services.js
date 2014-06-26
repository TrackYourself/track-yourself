/* Auth interceptor -- redirects to login page when needed */

var PUBLIC_URLS = {
  '/auth/login': true,
  '/auth/register': true,
  'templates/index.html': true,
  'templates/home.html': true,
  'templates/login.html': true,
  'templates/register.html': true,
  '': true,
  '/': true,
};

module.exports.authInterceptor = function($q, $location, $rootScope) {

  function isPublic(path) {
    console.log('checking whether ' + path + ' is public');
    if (PUBLIC_URLS[path]) {
      return true;
    }
    return false;
  }

  return {
    request: function(config) {
      if (!$rootScope.currentUser && !isPublic(config.url)) {
        console.log('no user, not public; routing to login');
        $location.path('/login');
      }
      return config;
    },
    response: function(response) {
      if (response.status === 401 && !isPublic(rejection.config.url)) {
        console.log('401, not auth; routing to login');
        $location.path('/login');
      }
      return response;
    },
    responseError: function(rejection) {
      if (rejection.status === 401 && !isPublic(rejection.config.url)) {
        console.log('401, not auth; routing to login');
        $location.path('/login');
      }
      return $q.reject(rejection);
    }
  };
};

