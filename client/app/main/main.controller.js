'use strict';

angular.module('yeoTestApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    var project = $(".project");
    console.log(project);
    var vid = $("video");
    var cover = $(".img-cover");

    $(project).hover(function() { 
        console.log("in hover:");
        // console.log($(this));
        $(this).find($(".img-cover")).addClass("img-hide"); 
        $(this).find($("video")).removeClass("img-hide"); 
        console.log($(this).find($(".img-cover")));
        console.log($(this).find($(".vid")));
        // vid.play();
      }, function() {
        console.log("out of hover");
        $(this).find($(".img-cover")).removeClass("img-hide");
        $(this).find($("video")).addClass("img-hide"); 
        // vid.load();
      }
    );

    [].forEach.call(vid, function (item) {
      item.addEventListener('mouseover', hoverVideo, false);
      item.addEventListener('mouseout', hideVideo, false);
    });
    
    function hoverVideo(e) {  
      // console.log("calling play");
      console.log(e);
      this.play();
    }

    function hideVideo(e) {
      // console.log("calling pause");
      console.log(e);
      this.pause();
    }



  });
