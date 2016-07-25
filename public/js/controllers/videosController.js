angular
  .module('lifeLine')
  .controller('VideosController', VideosController);

VideosController.$inject = ['User', 'CurrentUser'];
function VideosController(User, CurrentUser){

  var self          = this;
  self.all          = [ 
                      { title: "Duft Punk 1", youtubeId: 'NF-kLy44Hls' },
                      { title: "Duft Punk 2", youtubeId: 'FGBhQbmPwH8' },
                      { title: "Duft Punk 3", youtubeId: 'gAjR4_CbPpQ' }
                      ];
  self.currentVideo = 'https://www.youtube.com/embed/NF-kLy44Hls';
  self.currentUser  = CurrentUser.getUser();
  self.newMusic     = {};
  self.changeVideo = function(src) {
    self.currentVideo = 'https://www.youtube.com/embed/' + src;
  };

  self.addVideo = function() {
    self.newMusic.youtubeId = self.newMusic.youtubeId.split('v=')[1];
    var ampersandPosition = self.newMusic.youtubeId.indexOf('&');
    if(ampersandPosition != -1) {
      self.newMusic.youtubeId = self.newMusic.youtubeId.substring(0, ampersandPosition);
    }
    self.all.push(self.newMusic);
    self.newMusic={};
  }
  return self;
}
