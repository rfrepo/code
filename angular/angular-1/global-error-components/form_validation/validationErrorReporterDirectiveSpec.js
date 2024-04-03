define(['directive/validationErrorReporter.directive'], function () {

  'use strict';

  describe('validationErrorReporter.directive', function () {

    var scope;
    var element;
    var injector;
    var validationErrorReporterController;

    describe('Existence', function () {

      it('should exist', function () {
        expect(injector.get('rfValidationErrorReporterDirective')).to.be.defined;
      });
    });

    describe('Communicating DOM Events to the controller', function () {

      it('should call the initialise method on the controller passing dependencies', function () {

        var formController    = validationErrorReporterController.initialise.args[0][1];
        var ngModelController = validationErrorReporterController.initialise.args[0][0];

        expect(formController).to.have.property('$name');
        expect(ngModelController).to.have.property('$viewValue');
        expect(validationErrorReporterController.initialise).to.be.called;
      });

      it.skip('should when focused call a method on its controller', function () {

        element[0].focus();
        expect(validationErrorReporterController.onElementFocus).to.be.called;
      });

      it('should when blurred call a method on its controller', function () {

        element[0].focus();
        element[0].blur();
        expect(validationErrorReporterController.onElementBlur).to.be.called;
      });
    });

    beforeEach(function () {

      createMockModulesAndInjector();
      createScopes();
      createDirective();
    });

    afterEach(function () {
      element.remove();
    });

    function createMockModulesAndInjector() {

      module('errorHandling', createControllerDependencies);

      inject(function ($injector) {
        injector = $injector;
      });
    }

    function createControllerDependencies($controllerProvider) {

      validationErrorReporterController = sinon.stub({
        initialise    : angular.noop,
        onElementBlur : angular.noop,
        onElementFocus: angular.noop
      });

      $controllerProvider.register('validationErrorReporterController', function () {
        return validationErrorReporterController;
      });
    }

    function createScopes() {

      var rootScope = injector.get('$rootScope');
      scope         = rootScope.$new();
    }

    function createDirective() {

      var $compile = injector.get('$compile');

      var htmlTemplate = '<form><input ng-model="name" rf-validation-error-reporter></form>';
      element          = $compile(htmlTemplate)(scope);

      element = angular.element(element.find('input')[0]);

      angular.element(document.body).append(element);
    }
  });
});