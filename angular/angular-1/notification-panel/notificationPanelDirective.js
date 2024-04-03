/**
 *  @name rfNotificationPanel
 *  @file: notificationPanelDirective.js
 *  @description: A panel that displays warning, success messages.
 */
define(['commonModule'], function (commonModuleDefinition) {
  'use strict';

  commonModuleDefinition.directive('rfNotificationPanel', rfNotificationPanel);

  rfNotificationPanel.$inject = ['$templateCache', '$compile'];

  function rfNotificationPanel($templateCache, $compile) {

    return {
      restrict   : 'A',
      transclude : true,
      templateUrl: '/rf-notification-panel.html',
      scope      : {
        panelConfigurationVO: '=panelConfiguration'
      },
      link       : link
    };

    function link(scope, element, $attrs) {

      var panelConfigurationVO = scope.panelConfigurationVO || {};
      var contentContainer     = angular.element(element.find('div')[1]);

      updateConfigurations();
      watchChangesInTemplateURL();
      addContent();

      function updateConfigurations() {

        scope.panelStyle             = panelConfigurationVO.panelStyle || $attrs.panelStyle || '';
        scope.panelContentTemplateId = panelConfigurationVO.panelContentTemplateId || $attrs.panelContentTemplateId;

        scope.panelHasTail          = doAttrsOrConfigHaveProperty('panelHasTail');
        scope.panelHasIcon          = doAttrsOrConfigHaveProperty('panelHasIcon');
        scope.panelContentIsDynamic = doAttrsOrConfigHaveProperty('panelContentIsDynamic');
      }

      function watchChangesInTemplateURL() {

        if (scope.panelContentIsDynamic) {

          scope.$watch('panelConfigurationVO.panelContentTemplateId', handleChangeInTemplateUrl);
          scope.$watch(updateConfigurations);
        }
      }

      function handleChangeInTemplateUrl(newURL, oldURL) {

        if (newURL !== oldURL) {

          scope.panelContentTemplateId = newURL;
          addContent();
        }
      }

      function addContent() {

        if (scope.panelContentTemplateId) {

          var contentTemplate = $templateCache.get(scope.panelContentTemplateId);
          var newElement      = $compile(contentTemplate)(scope);

          contentContainer.empty();
          contentContainer.append(newElement);
        }
      }

      function doAttrsOrConfigHaveProperty(propertyName) {
        return (panelConfigurationVO.hasOwnProperty(propertyName) && panelConfigurationVO[propertyName]) ||
          $attrs.hasOwnProperty(propertyName);
      }
    }
  }
});