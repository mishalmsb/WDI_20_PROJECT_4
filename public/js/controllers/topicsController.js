angular
  .module('lifeLine')
  .controller('TopicsController', TopicsController);

TopicsController.$inject = ['Topic', 'CurrentUser', '$state', '$http', 'CurrentTopic', '$stateParams', '$scope', '$mdDialog'];
function TopicsController(Topic, CurrentUser, $state, $http, CurrentTopic, $stateParams, $scope, $mdDialog){

  var self              = this;
  self.all              = [];
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

  self.sendMessege = function() {
      self.currentUser  = CurrentUser.getUser();
      var newMessage = {
        user:     self.currentUser._id,
        message:  self.chat
      }
      socket.emit('chat message', newMessage);

  }
  var socket = io();

  socket.on('chat message' , function(message){
    console.log(message);
    var chatEl = angular.element( document.querySelector( '#chatRoom' ) );
    chatEl.append(self.currentUser.local.username + " : " + message.message+'<br/>');
    var newTopicUser = angular.element( document.querySelector( '#newTopicUser' ) );
    if (message.user != self.currentUser._id ) {
      self.helpingUser = message.user;
    }
    newTopicUser.val(self.helpingUser);
  });

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

  function closeTopic(topic) {
    self.topic.resolved = true;
      $http.patch('http://localhost:3000/api/topics/' + topic, {topic: self.topic})
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

  function createTopic() {
    // self.currentUser  = CurrentUser.getUser();
    // self.topic.user   = self.currentUser._id;
    // $http.post("http://localhost:3000/api/topics/" , {topic: self.topic}, function(data) {
    //     //console.log(data);
    //  });
    //  getTopics();
    console.log(self.topic);
  }

  function justForOwner(topicId) {
    self.currentUser  = CurrentUser.getUser();
    if (self.currentUser.topics.indexOf(topicId) != -1) {
      return false;
    }
    return true;
  }

  getTopics();


  // self.getTopics = function() {
  //   Topic.query(function(data){
  //     self.all = data.topics;
  //   });
  // }
  //
  // self.getTopic = function() {
  //   self.topicId = $stateParams.topicId;
  //   console.log(self.topicId);
  // }
  //
  // self.createTopic = function() {
  //   self.currentUser  = CurrentUser.getUser();
  //   self.topic.user   = self.currentUser._id;
  //   $http.post("http://localhost:3000/api/topics/" , {topic: self.topic}, function(data) {
  //       //console.log(data);
  //    });
  //    self.getTopics();
  // }
  //
  // self.getTopics();

  angular.element(document).ready(function () {

    getTopics();

  });


  return self;
}
