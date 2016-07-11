angular
  .module('logging')
  .controller('TopicsController', TopicsController);

TopicsController.$inject = ['Topic', 'CurrentUser', '$state', '$http', 'CurrentTopic', '$stateParams'];
function TopicsController(Topic, CurrentUser, $state, $http, CurrentTopic, $stateParams){

  var self              = this;
  self.all              = [];
  self.topic            = null;
  self.currentUser      = null;
  self.chat             = "";
  self.topicId          = "";

  self.getTopics = function() {
    Topic.query(function(data){
      self.all = data.topics;
    });
  }

  self.getTopic = function() {
    self.topicId = $stateParams.topicId;
    console.log(self.topicId);
  }

  self.createTopic = function() {
    self.currentUser  = CurrentUser.getUser();
    self.topic.user   = self.currentUser._id;
    $http.post("http://localhost:3000/api/topics/" , {topic: self.topic}, function(data) {
        //console.log(data);
     });
     self.getTopics();
  }

  self.sendMessege = function() {
      // self.currentUser  = CurrentUser.getUser();
      // socket.emit('chat message', self.chat);
  }

  var socket = io();
  socket.on('chat message' , function(message){
    // var myEl = angular.element( document.querySelector( '#chatRoom' ) );
    // myEl.append(self.currentUser.local.username + " : " + message+'<br/>');
  });

  self.getTopics();
  return self;
}
