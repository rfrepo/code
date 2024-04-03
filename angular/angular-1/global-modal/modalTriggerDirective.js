define(['commonModule'], function (commonModuleDefinition) {
  'use strict';

  commonModuleDefinition.directive('rfModalTrigger', modalTrigger);

  modalTrigger.$inject = ['modalService'];

  function modalTrigger(modalService) {

    return {
      restrict: 'A',
      scope   : {
        modalContentId   : '@',
        modalContentData : '=?',
        modalTriggerEvent: '@'
      },
      link    : link
    };

    function link($scope, element) {

      element.bind($scope.modalTriggerEvent, function () {

        $scope.$apply(function () {
          modalService.open(createModalConfigurationVO());
        });
      });

      function createModalConfigurationVO() {

        return {

          templateId : $scope.modalContentId,
          contentData: $scope.modalContentData
        };
      }
    }
  }
});