define(['modules/common/commonModule'], function (commonModuleDefinition) {
  'use strict';

  commonModuleDefinitionService('validationMessagesModel', validationMessagesModel);

  validationMessagesModel.$inject = ['$parse', '$templateCache'];

  function validationMessagesModel($parse, $templateCache) {

    var validationMessagesMap = {};
    var initialised           = false;

    return {
      createMessage                 : createMessage,
      getMessageByFormAndControlName: getMessageByFormAndControlName
    };

    function getMessageByFormAndControlName(formName, controlName, validationRule) {

      if (!initialised) {

        initialised = true;
        populateValidationMessagesMap();
      }

      return $parse(validationRule + '.' + formName + '.' + controlName)(validationMessagesMap) ||
        $parse(validationRule + '.defaultMessage')(validationMessagesMap) || '...';
    }

    function populateValidationMessagesMap() {

      var markup = $templateCache.get('/validation-error-messages.html');

      var messagesElement = angular.element(markup);
      var messageNodes    = messagesElement.find('span');

      extractMessagesFromMessagesElement(messageNodes);
    }

    function extractMessagesFromMessagesElement(messageNodes) {

      var messageKey;
      var messageNode;
      var validationRule;
      var validationMessage;

      angular.forEach(messageNodes, function (_messageNode) {

        messageNode = angular.element(_messageNode);

        validationRule    = messageNode.parent()[0].attributes[0].value;
        messageKey        = messageNode.attr('message-key');
        validationMessage = messageNode.contents().text();

        createMessage(validationRule + '.' + messageKey, validationMessage);
      });
    }

    function createMessage(messageKey, message) {
      $parse(messageKey).assign(validationMessagesMap, message);

    }
  }
});