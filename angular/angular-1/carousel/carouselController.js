define(['carouselModule'], function (carouselModuleDefinition) {
  'use strict';

  carouselModuleDefinition.controller('CarouselController', function ($scope, $element) {

    var carouselContentElement;

    $scope.totalPositions       = 0;
    $scope.positions            = [];
    $scope.currentPositionIndex = 0;

    $scope.next     = next;
    $scope.previous = previous;

    initialise();

    $scope.$watch(getTotalItems, function (newValue, oldValue) {

      if (newValue === undefined) {
        return;
      }

      if (newValue !== oldValue) {
        recalculatePositions();
      }
    });

    function recalculatePositions() {

      if ($scope.totalPositions !== getNumberOfPositions()) {
        setScrollPositions();
        ensureCurrentPositionIndexIsValid();
      }
    }

    function ensureCurrentPositionIndexIsValid() {

      if ($scope.currentPositionIndex > ($scope.totalPositions - 1)) {
        $scope.currentPositionIndex = $scope.totalPositions - 1;
        updateView();
      }
    }

    function getTotalItems() {
      return $scope.configuration.totalItems;
    }

    function initialise() {

      setScrollPositions();
      prepareCarouselContentElement();
    }

    function prepareCarouselContentElement() {

      carouselContentElement = angular.element($element[0].querySelector('.carousel__content'));
      carouselContentElement.css({left: '0'});
      carouselContentElement.css('transition', '.65s cubic-bezier(0.000, 0.000, 0.580, 1.000) left');
    }

    function previous() {

      var previousPositionIndex = $scope.currentPositionIndex;

      decrementCurrentPositionIndex();

      if (previousPositionIndex !== $scope.currentPositionIndex) {
        updateView();
      }
    }

    function next() {

      var previousPositionIndex = $scope.currentPositionIndex;

      incrementCurrentPositionIndex();

      if (previousPositionIndex !== $scope.currentPositionIndex) {
        updateView();
      }
    }

    function setScrollPositions() {
      $scope.positions = createScrollPositions();
    }

    function createScrollPositions() {

      var i;
      var positions         = [0];
      $scope.totalPositions = getNumberOfPositions();
      var scrollPosition    = $scope.configuration.scrollValue * $scope.configuration.pageSize;

      for (i = 1; i < $scope.totalPositions; i++) {
        positions.push(positions[i - 1] - scrollPosition);
      }

      return positions;
    }

    function getNumberOfPositions() {
      return Math.ceil($scope.configuration.totalItems / $scope.configuration.pageSize);
    }

    function incrementCurrentPositionIndex() {

      if (($scope.currentPositionIndex + 1) !== $scope.positions.length) {
        $scope.currentPositionIndex += 1;
        updateView();
      }
    }

    function decrementCurrentPositionIndex() {

      if (($scope.currentPositionIndex - 1) !== -1) {
        $scope.currentPositionIndex -= 1;
        updateView();
      }
    }

    function updateView() {

      var pos = $scope.positions[$scope.currentPositionIndex];
      carouselContentElement.css({left: pos + 'px'});
    }

    this.getScope = function getScope() {
      return $scope;
    };

  });
});
