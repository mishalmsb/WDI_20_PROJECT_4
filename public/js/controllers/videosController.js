angular
  .module('lifeLine')
  .controller('VideosController', VideosController);

VideosController.$inject = ['User', 'CurrentUser'];
function VideosController(User, CurrentUser){

  var self          = this;
  self.all          = ['NF-kLy44Hls','FGBhQbmPwH8','gAjR4_CbPpQ'];
  self.currentVideo = 'https://www.youtube.com/embed/NF-kLy44Hls';
  self.currentUser  = CurrentUser.getUser();

  self.changeVideo = function(src) {
    self.currentVideo =  'https://www.youtube.com/embed/' + src;
  };

  return self;
}
