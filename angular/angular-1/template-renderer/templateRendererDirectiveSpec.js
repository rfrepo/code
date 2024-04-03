define(['templateRendererDirective'], function () {

  'use strict';

  describe('rfTemplateRenderer', function () {

    var scope;
    var injector;
    var rootScope;
    var directiveElement;
    var templateIdAttributeValue;
    var templateIdIsDynamicAttribute;

    var TEMPLATE_MARKUP_1 = '<div><p>TEMPLATE 1</p></div>';
    var TEMPLATE_MARKUP_2 = '<div><p>TEMPLATE 2</p></div>';
    var TEMPLATE_MARKUP_3 = '<div><p>{{dynamicContent}}</p></div>';

    it('should render to the DOM content set through the configurationVO.templateId property', function () {

      compileDirective();
      expect(directiveElement.html()).to.contain('TEMPLATE 1');
    });

    it('should render to the DOM content set through the template-id attribute and configurationVO.templateId is not set', function () {

      scope.configurationVO.templateId = undefined;

      templateIdAttributeValue = 'templateId2';

      compileDirective();

      expect(directiveElement.html()).to.contain('TEMPLATE 2');
    });

    it('should re-render the content when the templateId is changed and configurationVO has a ' +
      'property templateIdIsDynamic', function () {

      scope.configurationVO.templateIdIsDynamic = true;

      compileDirective();

      expect(directiveElement.html()).to.contain('TEMPLATE 1');

      scope.configurationVO.templateId = 'templateId2';

      directiveElement.isolateScope().$digest();

      expect(directiveElement.html()).to.contain('TEMPLATE 2');
    });

    it('should re-render the content when the templateId is changed and template-id-is-dynamic present on the ' +
      'markup that hosts the directive', function () {

      templateIdIsDynamicAttribute = 'template-id-is-dynamic';

      compileDirective();

      scope.configurationVO.templateId = 'templateId2';

      directiveElement.isolateScope().$digest();

      expect(directiveElement.html()).to.contain('TEMPLATE 2');
    });

    it('should not re-render the content when the templateId is changed when :' +
      'i) template-id-is-dynamic is not present on the markup that hosts the directive.' +
      'ii) configurationVO does not have property templateIdIsDynamic)', function () {

      compileDirective();
      scope.configurationVO.templateId = 'templateId2';

      directiveElement.isolateScope().$digest();

      expect(directiveElement.html()).not.to.contain('TEMPLATE 2');
    });

    it('should expose the configurationVO.contentData object\'s properties for the template to bind to and consume', function () {

      var DATA_PASSED_TO_TEMPLATES_SCOPE = 'DATA PASSED ON TO THE SCOPE OF THE TEMPLATE';

      scope.configurationVO.templateId  = 'templateId3';
      scope.configurationVO.contentData = {
        dynamicContent: DATA_PASSED_TO_TEMPLATES_SCOPE
      };

      compileDirective();

      expect(directiveElement.html()).to.contain(DATA_PASSED_TO_TEMPLATES_SCOPE);
    });

    beforeEach(function () {

      module('common', function ($interpolateProvider, $provide) {
        $interpolateProvider.startSymbol('{{').endSymbol('}}');
        subTemplateCache($provide);
      });

      angular.mock.inject(function ($injector, $rootScope) {

        injector              = $injector;
        rootScope             = $rootScope;
        scope                 = $rootScope.$new();
        scope.configurationVO = {templateId: 'templateId1'};
      });

      templateIdAttributeValue     = '';
      templateIdIsDynamicAttribute = '';

    });

    function subTemplateCache(provide) {

      var templateCache = sinon.stub({get: angular.noop});

      templateCache.get.withArgs('templateId1').returns(TEMPLATE_MARKUP_1);
      templateCache.get.withArgs('templateId2').returns(TEMPLATE_MARKUP_2);
      templateCache.get.withArgs('templateId3').returns(TEMPLATE_MARKUP_3);

      provide.value('$templateCache', templateCache);
    }

    function compileDirective() {

      var $compile = injector.get('$compile');

      directiveElement = $compile(getDirectiveTemplate())(scope);

      rootScope.$digest();
    }

    function getDirectiveTemplate() {

      return '<div rf-template-renderer=\'configurationVO\' ' +
        'template-id=\'' + templateIdAttributeValue + '\' ' + templateIdIsDynamicAttribute + '></div>';
    }
  });
});