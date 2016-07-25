angular
  .module('lifeLine')
  .controller('TopicsController', TopicsController);

TopicsController.$inject = ['SocketsService', 'Topic', 'User', 'CurrentUser', '$state', '$http', 'CurrentTopic', '$stateParams', '$scope', '$mdDialog'];
function TopicsController(SocketsService, Topic, User, CurrentUser, $state, $http, CurrentTopic, $stateParams, $scope, $mdDialog){

  var self              = this;
  self.all              = [];
  self.users            = [];
  self.topic            = null;
  self.currentUser      = null;
  self.chat             = "";
  self.topicId          = "";
  self.chatTopic        = "";
  self.getTopics        = getTopics;
  self.getTopic         = getTopic;
  self.createTopic      = createTopic;
  self.closeTopic       = closeTopic;
  self.justForOwner     = justForOwner;
  self.test             = "test";
    self.onlineUsers   = SocketsService.onlineUsers;
    
  $scope.$watch(function(){ return SocketsService.onlineUsers }, function(newVal){
      self.onlineUsers = newVal;
  } , true);

  function getUsersTopics() {
    User.query(function(data){
      self.users = data.users;
    });
  }

  self.sendMessege = function() {
    self.currentUser  = CurrentUser.getUser();
    var newMessage = {
      user:     self.currentUser,
      message:  self.chat,
      room:     "room1"
    }
    SocketsService.sendMessege(newMessage);
    self.chat = "";
  }

  self.openChat = function(ev, topicId)
  {
      self.searchTopic(topicId)
      console.log(self.topic);
      $mdDialog.show({
          controller: 'TopicsController as topics',
          templateUrl: "./js/views/topics/show.html",
          targetEvent: ev,
          clickOutsideToClose: true
      })
      .then(function() {
      }, function() {
      });
  }

  self.openForm = function(ev)
  {
      $mdDialog.show({
          controller: 'TopicsController as topics',
          templateUrl: "./js/views/topics/new.html",
          targetEvent: ev,
          clickOutsideToClose: true
      })
      .then(function() {
      }, function() {
      });
  }

  self.closeForm = function()
  {
    $mdDialog.hide();
  }

  function closeTopic(topic) {
    self.topic.resolved = true;
      // $http.patch('http://localhost:3000/api/topics/' + topic, {topic: self.topic})
      $http.patch('/api/topics/' + topic, {topic: self.topic})
        .then(function(res){
          // getUsers();
          console.log(res);
      });
  }

  function getTopics() {
    Topic.query(function(data){
      self.all = data.topics;
    });
  }

  function getTopic() {
    self.topicId = $stateParams.topicId;
    console.log(self.topicId);
  }

  self.searchTopic = function(id) {
    Topic.get({id: id}, function(topic){
      self.topic = topic.topic;
    })
  }

  $scope.answer = function(answer) {
    console.log($scope.user);
    $mdDialog.hide(answer);
  };
  self.getUserTopics = function(id) {
    return self.users;
  }
  function createTopic() {
    self.currentUser  = CurrentUser.getUser();
    self.topic.user   = self.currentUser._id;
    // $http.post("http://localhost:3000/api/topics/" , {topic: self.topic}, function(data) {
    $http.post("/api/topics/" , {topic: self.topic}, function(data) {
        console.log(data);
     });
    self.closeForm();
  }

  function justForOwner(topicId) {
    self.currentUser  = CurrentUser.getUser();
    if (self.currentUser.topics.indexOf(topicId) != -1) {
      return false;
    }
    return true;
  }

  angular.element(document).ready(function () {

    // getUsersTopics();
    // getTopics();

  });

  getUsersTopics();

  return self;
}
