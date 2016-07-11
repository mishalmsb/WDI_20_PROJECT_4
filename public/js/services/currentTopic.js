angular
  .module('logging')
  .service("CurrentTopic", CurrentTopic);

CurrentTopic.$inject = [];
function CurrentTopic(){
  var self = this;



  self.getTopicId = function() {

    
  }

  self.clearTopicId = function(){
    self.user = null;
  }

  self.topicId = self.getTopicId();
}
