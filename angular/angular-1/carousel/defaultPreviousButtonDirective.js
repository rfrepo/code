define(['common/scripts/modules/carousel/carouselModule'], function (carouselModule) {
  'use strict';

  carouselModule.directive('rfDefaultPreviousButton', DefaultNextButton);

  DefaultNextButton.$inject = ['$templateCache', '$compile'];

  function DefaultNextButton($templateCache, $compile) {

    var TEMPLATE_ID      = '/previous-btn.html';
    var CLICK_EVENT_NAME = 'click';

    return {
      scope   : false,
      restrict: 'A',
      require : 'rfCarousel',
      link    : createPostLinkVO()
    };

    function createPostLinkVO() {
      return {
        post: postLInk
      };
    }

    function postLInk() {

      var carouselElement    = arguments[1];
      var carouselController = arguments[3];
      var carouselScope      = carouselController.getScope();
      var buttonElement      = getElementFromCompiledTemplate(carouselScope);

      addButtonEvents(buttonElement, carouselScope);

      createVMForTemplateBindings(carouselScope);

      appendButtonToCarouselDomElement(carouselElement, buttonElement);
    }

    function getElementFromCompiledTemplate(scope) {

      var templateHTML = $templateCache.get(TEMPLATE_ID);
      return $compile(templateHTML)(scope);
    }

    function addButtonEvents(buttonElement, carouselScope) {

      buttonElement.on(CLICK_EVENT_NAME, function () {

        carouselScope.previous();
        carouselScope.$digest();
      });
    }

    function createVMForTemplateBindings(carouselScope) {

      carouselScope.previousBtnVM = {

        isVisible    : function () {
          return carouselScope.currentPositionIndex !== 0;
        },
        getPagingText: function () {
          return (carouselScope.currentPositionIndex + 1) + '/' + carouselScope.positions.length;
        }
      };
    }

    function appendButtonToCarouselDomElement(element, buttonElement) {
      angular.element(element[0].querySelector('.carousel__button-container')).append(buttonElement);
    }
  }
});