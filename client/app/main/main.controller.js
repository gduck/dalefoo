'use strict';

angular.module('yeoTestApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    var $container = $('#packery-container');
    // init
    $container.packery({
      itemSelector: '.cell'
      // gutter: 10
    });

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.$container = $('#packery-container');
    $scope.repack = function() {
      $scope.$container.packery();
      return true;
    }
  
    $('#packery-container').imagesLoaded( function() {
      $scope.repack();
    });

    // $scope.$container.find('.cell').each( function( i, itemElem ) {
    //   // make element draggable with Draggabilly
    //   var draggie = new Draggabilly( itemElem );
    //   // bind Draggabilly events to Packery
    //   $scope.$container.packery( 'bindDraggabillyEvents', draggie );
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('thing');
    // });

    var project = $('.project');
    console.log(project);
    var vid = $('video');

    $(project).hover(function() { 
        console.log('in hover:');
        // console.log($(this));
        $(this).find($('.img-cover')).addClass('img-hide'); 
        $(this).find($('video')).removeClass('img-hide'); 
        console.log($(this).find($('.img-cover')));
        console.log($(this).find($('.vid')));
        // vid.play();
      }, function() {
        console.log('out of hover');
        $(this).find($('.img-cover')).removeClass('img-hide');
        $(this).find($('video')).addClass('img-hide'); 
        // vid.load();
      }
    );

    [].forEach.call(vid, function (item) {
      item.addEventListener('mouseover', hoverVideo, false);
      item.addEventListener('mouseout', hideVideo, false);
    });
    
    function hoverVideo(e) {  
      // console.log('calling play');
      console.log(e);
      this.play();
    }

    function hideVideo(e) {
      // console.log('calling pause');
      console.log(e);
      this.pause();
    }



  });
