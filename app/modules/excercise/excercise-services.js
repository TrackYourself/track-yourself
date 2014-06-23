/* Define a resource that connects to REST API for excercise records */

module.exports.resource = function($resource) {
    return $resource('/api/excercise',
    {}, //paramdefaults
    { //custom methods
        getAll: {
            method: 'GET',
            url: '/api/excercise/all',
            isArray: true,
            responseType: 'json'
        }
    });
};
