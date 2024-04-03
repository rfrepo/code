define(['commonModule'], function (commonModuleDefinition) {
  'use strict';

  commonModuleDefinition.directive('rfTemplateRenderer', templateRenderer);

  templateRenderer.$inject = ['$templateCache', '$compile', '$rootScope'];

  function templateRenderer($templateCache, $compile, $rootScope) {

    return {
      restrict: 'A',
      scope   : {
        configurationVO: '=rfTemplateRenderer'
      },
      link    : {pre: link}
    };

    function link(scope, element, $attrs) {

      var configurationVO = scope.configurationVO || {};

      updateConfigurations();
      addWatchers();
      addContent();

      function updateConfigurations() {

        scope.templateId          = configurationVO.templateId || $attrs.templateId;
        scope.templateIdIsDynamic = hasProperty('templateIdIsDynamic');
      }

      function addWatchers() {
        watchChangesInTemplateURL();
        watchConfigurationDataChanges();
      }

      function watchChangesInTemplateURL() {

        if (scope.templateIdIsDynamic) {

          $attrs.$observe('templateId', handleChange);
          scope.$watch('configurationVO.templateId', handleChange);
        }
      }

      function watchConfigurationDataChanges() {

        scope.$watch('configurationVO.contentData', function (currentData, previousData) {

          if (currentData !== previousData) {
            addContent();
          }
        });
      }

      function handleChange(newTemplateId, oldTemplateId) {

        handleTemplateIdChange(newTemplateId, oldTemplateId);
        updateConfigurations();
      }

      function handleTemplateIdChange(newTemplateId, oldTemplateId) {

        if (newTemplateId !== oldTemplateId) {

          scope.templateId = newTemplateId;
          addContent();
        }
      }

      function addContent() {

        if (scope.templateId) {

          var contentTemplate = $templateCache.get(scope.templateId);
          var newElement      = $compile(contentTemplate)(createTemplateScope());

          element.empty();
          element.append(newElement);
        }
      }

      function createTemplateScope() {

        var templateScope = $rootScope.$new();

        angular.extend(templateScope, configurationVO.contentData);

        templateScope.contentData = configurationVO.contentData;

        return templateScope;
      }

      function hasProperty(propertyName) {
        return (configurationVO.hasOwnProperty(propertyName) && configurationVO[propertyName]) ||
          $attrs.hasOwnProperty(propertyName);
      }
    }
  }
});