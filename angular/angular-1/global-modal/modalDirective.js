define(['commonModule'], function (commonModuleDefinition) {
  'use strict';

  commonModuleDefinition.directive('rfModal', modal);

  modal.$inject = ['modalService'];

  function modal(modalService) {

    return {
      restrict   : 'AE',
      scope      : {},
      link       : {pre: link},
      templateUrl: '/rf-modal.html'
    };

    function link($scope) {

      $scope.close           = close;
      $scope.shouldShow      = shouldShow;
      $scope.configurationVO = modalService.getConfigurationVO();

      function close() {
        modalService.close();
      }

      function shouldShow() {
        return modalService.getState();
      }
    }
  }
});