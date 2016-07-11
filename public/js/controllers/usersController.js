angular
  .module('logging')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser', '$state'];
function UsersController(User, CurrentUser, $state){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.status   = null;

  var socket = io();
  socket.on('onlineUser' , function(data){
      //socket.emit('onlineUser' , self.currentUser);
      self.onlineUsers = data;
      console.log("onlien array " + self.onlineUsers);
  });

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('user');
    }
  }

  function handleError(e) {
    self.error = e.data.message;
  }

  self.handleUserOnline = function() {

  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    self.all         = [];
    self.currentUser = null;
    CurrentUser.clearUser();
  }

  function checkLoggedIn() {
    var c = 0;
    self.currentUser = CurrentUser.getUser();
    //socket.emit('onlineUser' , self.currentUser);
    return !!self.currentUser;
  }

  if (checkLoggedIn()) {

    self.getUsers();
  }

  // self.checkUserOnline = function(userId) {
  //   //console.log(userId);
  //   if (userId != undefined) {
  //     if (self.onlineUsers.indexOf(userId) < 0) {
  //       return true;
  //     }
  //   }
  // };

  angular.element(document).ready(function () {
    self.currentUser = CurrentUser.getUser();
    socket.emit('onlineUser' , self.currentUser);
  });

  return self;
}
