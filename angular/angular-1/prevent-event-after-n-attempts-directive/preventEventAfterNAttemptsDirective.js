define(['underscore', 'commonModule'], function (_, commonModuleDefinition) {

  'use strict';

  commonModuleDefinition.directive('rfPreventEventAfterNAttempts', preventEventAfterNAttempts);

  function preventEventAfterNAttempts() {

    return {
      restrict: 'A',
      link    : link
    };

    function link($scope, element, $attrs) {

      var attempts    = 0;
      var action      = $attrs.eventToPrevent || '';
      var maxAttempts = parseInt($attrs.numberOfAttempts) || 0;

      element.on(action, eventHandler);

      function eventHandler() {

        attempts++;

        if (attempts === maxAttempts) {
          removeEventListener();
          addEventListener();
        }
      }

      function removeEventListener() {
        element.off(action);
      }

      function addEventListener() {
        element.on(action, preventEventDefault);
      }

      function preventEventDefault(event) {

        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }
});