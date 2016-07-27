angular
  .module('lifeLine')
  .controller('VideosController', VideosController);

VideosController.$inject = ['User', 'CurrentUser', '$scope', '$http'];
function VideosController(User, CurrentUser, $scope, $http){

  var self            = this;
  self.all            = [{  title: "[Official Video] Daft Punk - Pentatonix",
                            youtubeId: "3MteSlpxCpo",
                            thumbnails: "https://i.ytimg.com/vi/3MteSlpxCpo/default.jpg"
                          },
                          { title: "Duft Punk Get Lucky feat Pharrell Williams",
                            youtubeId: "25KbzxQ6VZ8",
                            thumbnails: "https://i.ytimg.com/vi/25KbzxQ6VZ8/default.jpg"
                          },
                          { title: "Daft Punk - Something About Us",
                            youtubeId: "sOS9aOIXPEk",
                            thumbnails: "https://i.ytimg.com/vi/sOS9aOIXPEk/default.jpg"
                          },
                          { title: "Daft Punk - One More Time",
                            youtubeId: "FGBhQbmPwH8",
                            thumbnails: "https://i.ytimg.com/vi/FGBhQbmPwH8/default.jpg"
                          }];

  self.youTubeVideos = [];
  self.currentVideo   = 'https://www.youtube.com/embed/FGBhQbmPwH8?rel=0';
  // self.currentVideo   = 'https://www.youtube.com/embed/FGBhQbmPwH8?enablejsapi=1&html5=1';
  self.currentUser    = CurrentUser.getUser();
  self.newMusic       = {};
  self.display        = false;
  self.searchName     = "";

  self.playVideo = function(src) {
    self.currentVideo = 'https://www.youtube.com/embed/' + src + '?rel=0&autoplay=1';
  };

  self.searchVideo = function() {
    console.log("hello");
    $http.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: 'AIzaSyDT4cu22o-CksZ93t3SXFZURQzwhIlzlHE',
        type: 'video',
        maxResults: '15',
        part: 'id,snippet',
        fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
        q: self.searchName
        // q: "Duft Punk"
      }
    })
    .success( function (data) {
      self.youTubeVideos = data;
    })
    .error( function (err) {
      console.log(err);
    });

  }

  self.addVideo = function(src) {
    self.newMusic.title = src.snippet.title;
    self.newMusic.youtubeId = src.id.videoId;
    self.newMusic.thumbnails = src.snippet.thumbnails.default.url
    self.all.push(self.newMusic);

    console.log(self.newMusic.title);
    console.log(self.newMusic.youtubeId);
    console.log(self.newMusic.thumbnails);
    self.newMusic={};
  }
  self.deleteVideo = function(index) {
    self.all.splice(index, 1);
  }

  self.searchVideo();
  return self;
}



// .directive('youtubeList', function($http, $timeout){
//   return {
//     restrict: 'E',
//     scope: {
//       search: '='
//     },
//     templateUrl: 'youtube-list.tpl.html',

//     link: function($scope, iElm, iAttrs, controller) {

//       var timer ;
//       var timerDelay = 500;

//       // Watch 'search' updates
//       $scope.$watch('search', function(newVal, oldVal) {

//         // Remove previous timers
//         $timeout.cancel(timer);

//         // Avoid too many multiple YouTube requests
//         timer = $timeout(function() {
//           if (newVal) {

//             // Ottieni video tramite YouTube API
//             var url  =  'http://gdata.youtube.com/feeds/api/videos?q=';
//               url += newVal ;
//               url += ' &start-index=21&max-results=10&v=2&alt=json';

//             $http.get(url)
//             .success(function(data) {
//               $scope.entries = data.feed.entry;
//             });
//           }
//         }, timerDelay);
//       }, true);
//     }
//   };
// });
