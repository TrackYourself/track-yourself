/* Auth interceptor -- redirects to login page when needed */

var PUBLIC_URLS = {
  '/auth/login': true,
  '/auth/signup': true,
  'templates/index.html': true,
  'templates/login.html': true,
  'templates/register.html': true,
  '': true,
  '/': true
};

module.exports.authInterceptor = function($q, $location, $rootScope) {

  function isPublic(path) {
    console.log('checking if ' + path + ' is public:');
    if (PUBLIC_URLS[path]) {
      console.log('true');
      return true;
    }
    console.log('false');
    return false;
  }

  return {
    request: function(config) {
      if (!$rootScope.currentUser && isPublic(config.url)) {
        console.log('no user, not public; routing to login');
        $location.path('/login');
      }
      return config;
    },
    response: function(response) {
      if (response.status === 401 && response.url !== '/auth/login' && response.url !== '/auth/register') {
        console.log('401, not auth; routing to login');
        $location.path('/login');
      }
      return response;
    }
  };
};


