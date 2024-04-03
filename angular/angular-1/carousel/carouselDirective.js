define(['carouselModule'], function (carouselModuleDefinition) {
  'use strict';

  carouselModuleDefinition.directive('rfCarousel', function () {

    return {
      restrict   : 'E',
      scope      : {
        configuration: '='
      },
      transclude : true,
      controller : 'CarouselController',
      templateUrl: '/carousel.html',
      link       : createPreLinkVO()
    };

    function createPreLinkVO() {

      return {
        pre: function () {
        }
      };
    }
  });
});