angular
  .module('lifeLine')
  .filter('online', function() {

  // Create the return function and set the required parameter name to **input**
    return function(input , onlineUsers) {

      var out = [];

      // Using the angular.forEach method, go through the array of data and perform the operation of figuring out if the language is statically or dynamically typed.
      angular.forEach(input, function(user) {

        if(onlineUsers.indexOf(user._id) !== -1) {
          out.push(user);
        }

      });

      return out;
    }
  });
