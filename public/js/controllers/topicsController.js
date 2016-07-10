angular
  .module('logging')
  .controller('TopicsController', TopicsController);

TopicsController.$inject = ['Topic', 'CurrentUser', '$state', '$http'];
function TopicsController(Topic, CurrentUser, $state, $http){

  var self = this;

  self.topic            = null;
  self.currentUser      = null;

  self.testCurrentUser = function() {
    console.log(CurrentUser);
  }

  function handleError(e) {
    //console.log(e.data.message);
    self.error = e.data.message;
  }

  self.createTopic = function() {
    self.currentUser  = CurrentUser.getUser();
    $http.post("http://localhost:3000/api/users/"+ self.currentUser._id +"/topics", {topic: self.topic}, function(data) {
        //  self.all.push(response.data.criminal);
        //  self.newCriminal = {};
        //  console.log(response.data.criminal);
        console.log(data);
     });

     //Topic.save(self.topic);
    console.log(self.currentUser);
  }

  return self;
}
