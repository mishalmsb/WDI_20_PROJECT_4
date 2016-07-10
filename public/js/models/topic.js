angular
  .module('logging')
  .factory('Topic', Topic);

Topic.$inject = ['$resource', 'API'];
function Topic($resource, API){

  return $resource(
    API+'/users/:id/topics', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
