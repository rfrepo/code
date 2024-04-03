define(['commonModule'], function (commonModuleDefinition) {
  'use strict';

  commonModuleDefinitionService('modalService', modalService);

  function modalService() {

    var isOpen;
    var configurationVO = createBaseConfigurationVO();

    return {
      open              : open,
      close             : close,
      getState          : getState,
      getConfigurationVO: getConfigurationVO
    };

    function open(configObject) {
      isOpen = true;
      updateConfigurationVO(configObject);

    }

    function updateConfigurationVO(configObject) {

      angular.copy({}, configurationVO);

      for (var key in configObject) {
        if (configObject.hasOwnProperty(key)) {
          configurationVO[key] = configObject[key];
        }
      }
    }

    function close() {
      isOpen = false;
    }

    function getState() {
      return isOpen;
    }

    function getConfigurationVO() {
      return configurationVO;
    }

    function createBaseConfigurationVO() {

      return {
        panelContentIsDynamic: true
      };
    }
  }
});