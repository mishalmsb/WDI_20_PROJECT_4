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
  self.getTopics        = getTopics;
  self.getTopic         = getTopic;
  self.createTopic      = createTopic;

  function getTopics() {
    Topic.query(function(data){
      self.all = data.topics;
    });
  }

  function getTopic() {
    self.topicId = $stateParams.topicId;
    console.log(self.topicId);
  }

  function createTopic() {
    self.currentUser  = CurrentUser.getUser();
    self.topic.user   = self.currentUser._id;
    $http.post("http://localhost:3000/api/topics/" , {topic: self.topic}, function(data) {
        //console.log(data);
     });
     getTopics();
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
  return self;
}
