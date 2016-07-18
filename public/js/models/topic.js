angular
  .module('lifeLine')
  .factory('Topic', Topic);

Topic.$inject = ['$resource', 'API'];
function Topic($resource, API){

  return $resource(
    // API+'/topics/:id', {id: '@id'},
    '/topics/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
