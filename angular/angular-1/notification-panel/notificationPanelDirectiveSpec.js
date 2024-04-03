define(['notificationPanelDirective'], function () {

  'use strict';

  describe('notificationPanel', function () {

    var scope;
    var injector;
    var directiveElement;
    var directiveTemplate;

    it('should create an instance to the notification directive', function () {

      compileDirectiveWithAttributes();
      expect(directiveElement.html()).to.contain('notification-panel');
    });

    describe('Panel style : sets the appearance and icon style of the panel (success, error and information)', function () {

      it('should add the "panel style" class to the directive markup', function () {

        compileDirectiveWithAttributes('panel-style="success"');

        expect(directiveElement.html()).to.contain('notification-panel--success');
      });
    });

    describe('Tail adding & removing : (arrow at the bottom of the panel) ', function () {

      it('should add the "tail" css class when the "panel-has-tail" attribute is added on the panel\'s host element', function () {

        compileDirectiveWithAttributes('panel-has-tail');

        var childElement = angular.element(directiveElement.children()[0]);

        expect(childElement.hasClass('tail')).to.equal(true);
      });

      it('should not add the "tail" css class when the "panel-has-tail" attribute not present on the panel\'s host element', function () {

        compileDirectiveWithNoAttributes();

        var childElement = angular.element(directiveElement.children()[0]);

        expect(childElement.hasClass('tail')).to.equal(false);
      });
    });

    describe('Panel Icon showing & hiding', function () {

      it('should contain the icon html element when the "panel-has-icon" attribute is added on the panel\'s host element', function () {

        compileDirectiveWithAttributes('panel-has-icon');

        expect(directiveElement.html()).to.contain('notification-panel__icon');
        expect(directiveElement.find('i').length).to.equal(1);
      });

      it('should not contain the icon html element when the "panel-has-icon" attribute is not on the panel\'s host element', function () {

        compileDirectiveWithNoAttributes();

        expect(directiveElement.html()).not.to.contain('notification-panel__icon');
        expect(directiveElement.find('i').length).to.equal(0);
      });
    });

    describe('Programmatic Configuration', function () {

      it('should support configuration through a configuration object ', function () {

        scope.panelConfigVO = {
          panelStyle            : 'error',
          panelHasTail          : true,
          panelHasIcon          : true,
          panelContentTemplateId: '/dynamic-content-1.html'
        };

        compileDirectiveWithAttributes('panel-configuration="panelConfigVO"');

        var childElement = angular.element(directiveElement.children()[0]);

        expect(childElement.hasClass('tail')).to.equal(true);

        expect(directiveElement.find('i').length).to.equal(1);

        expect(directiveElement.html()).to.contain('Dynamic content 1');

        expect(directiveElement.html()).to.contain('notification-panel--error');

      });
    });

    describe('Content via transclusion', function () {

      it('should support transcluded content', function () {

        var contentToTransclude = '<h1>Transcluded Content</h1>';

        setDirectiveTemplateString('', contentToTransclude);

        compileDirective();

        expect(directiveElement.find('h1').length).to.equal(1);
      });
    });

    describe('Content via ng/template template id', function () {

      it('should support loading content through the "panel-content-template-id" attribute (ng/template)', function () {

        compileDirectiveWithAttributes('panel-content-template-id="/dynamic-content-1.html"');
        expect(directiveElement.html()).to.contain('Dynamic content 1');
      });
    });

    describe('Content via a dynamic ng/template id. Note : This feature is only enabled in the following conditions ' +
      'i) This panel is configured through a configuration object' +
      'ii) The "panelContentIsDynamic" / "panel-content-is-dynamic" property is set on the ' +
      'configuration object or set on element as an attribute.',
      function () {

        it('should support loading content templates dynamically', function () {

          scope.panelConfigVO = {
            panelContentTemplateId: '/dynamic-content-1.html'
          };

          compileDirectiveWithAttributes('panel-configuration="panelConfigVO" panel-content-is-dynamic');

          expect(directiveElement.html()).to.contain('Dynamic content 1');

          scope.panelConfigVO.panelContentTemplateId = '/dynamic-content-2.html';
          scope.$digest();

          expect(directiveElement.html()).to.contain('Dynamic content 2');
        });
      });

    beforeEach(function () {

      module('templates');

      module('common', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{{').endSymbol('}}');
      });

      angular.mock.inject(function ($injector, $rootScope) {

        injector = $injector;
        scope    = $rootScope.$new();
      });
    });

    function setDirectiveTemplateString(attributeString, transcludeContent) {
      directiveTemplate = '<div id="directiveUnderTest" rf-notification-panel ' + (attributeString || '') + ' >' + (transcludeContent || '') + '</div>';
    }

    function compileDirectiveWithAttributes(attributeString) {

      setDirectiveTemplateString(attributeString);
      compileDirective();
    }

    function compileDirectiveWithNoAttributes() {

      setDirectiveTemplateString();
      compileDirective();
    }

    function compileDirective() {

      var $compile = injector.get('$compile');

      directiveElement = $compile(directiveTemplate)(scope);

      scope.$digest();
    }
  });
});