
module.exports.resource = function($resource) {
  return $resource('/sleep/:user',
    {user: 'testuser'}, //default params
    {getAll: {
      method: 'GET',
      url: '/sleep/:user/all',
      isArray: true,
      responseType: 'json'
    }}
  ); 
};

