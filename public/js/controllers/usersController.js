angular
  .module('lifeLine')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser', '$state' , 'SocketsService' , '$scope', '$window', '$mdDialog'];
function UsersController(User, CurrentUser, $state , SocketsService , $scope, $window, $mdDialog){

  var self            = this;
  self.all            = [];
  self.user           = null;
  self.currentUser    = null;
  self.error          = null;
  self.getUsers       = getUsers;
  self.register       = register;
  self.login          = login;
  self.checkLoggedIn  = checkLoggedIn;
  self.chat           = "";
  self.onlineUsers    = SocketsService.onlineUsers;
  self.socket         = io();

  $scope.$watch(function(){ return SocketsService.onlineUsers }, function(newVal){
      self.onlineUsers = newVal;
  } , true);

  self.sendMessege = function() {
    self.currentUser  = CurrentUser.getUser();
    var newMessage = {
      user:     self.currentUser,
      message:  self.chat,
      room:     "room1"
    };
    SocketsService.sendMessege(newMessage);
    self.chat = "";

  }

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('home')
    } else {
      $state.go('login')
    }
    self.currentUser = CurrentUser.getUser();
    self.socket.emit('onlineUser' , self.currentUser);
  }

  function handleError(e) {
    self.error = e.data.message;
    self.currentUser = CurrentUser.getUser();
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  // self.logout = function() {
  //   self.all         = [];
  //   self.currentUser = null;
  //   CurrentUser.clearUser();
  //   self.onlineUsers   = null;
  // }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  if (checkLoggedIn()) {
    self.getUsers();
    $state.go('home');
  }

  return self;
}
