define(['controller/validationErrorReporter.controller'], function () {
  'use strict';

  describe('validationErrorReporter.controller', function () {

    var injector;
    var controller;
    var injectables;

    var ngModelController;
    var formController = {$name: 'formName'};

    describe('Initialisation', function () {

      it('should create an instance of the validationErrorReporterController', function () {

        ngModelController = createNgModelController();

        controller.initialise(ngModelController, formController);

        expect(controller).to.have.property('initialise');
        expect(controller.constructor.name).to.equal('ValidationErrorReporterController');
        expect(ngModelController.$parsers.push.args[0][0]).to.be.an('function');
      });
    });

    describe('Adding & Removing errors', function () {

      describe('Input receives text', function () {

        it('should register error with every input. Given when that the input is has a validation error', function () {

          ngModelController.$error = {required: true};

          ngModelController.$parsers.push.args[0][0]();
          ngModelController.$parsers.push.args[0][0]();
          ngModelController.$parsers.push.args[0][0]();

          expect(injectables.validationErrorsModel.registerError).to.be.calledThrice;
        });

        it('should deregister error with every input. Given when that the input is has not got a validation error', function () {

          ngModelController.$error = {required: false};

          ngModelController.$parsers.push.args[0][0]();
          ngModelController.$parsers.push.args[0][0]();
          ngModelController.$parsers.push.args[0][0]();

          expect(injectables.validationErrorsModel.removeError).to.be.calledThrice;
        });

        it('should not called either of error updated methods if the input is valid', function () {

          ngModelController.$invalid = false;

          expect(injectables.validationErrorsModel.registerError).not.to.be.called;
          expect(injectables.validationErrorsModel.removeError).not.to.be.called;
        });
      });

      describe('Input loses focus (blur)', function () {

        it('should add any validation errors associated with input', function () {

          ngModelController.$error = {required: true};

          controller.onElementBlur();
          expect(injectables.validationErrorsModel.registerError).to.be.calledWith(formController.$name, ngModelController.$name);
        });
      });

      beforeEach(function () {
        ngModelController = createNgModelController();
        controller.initialise(ngModelController, formController);
      });
    });

    function createNgModelController() {

      return sinon.stub({
        $invalid     : true,
        $name        : 'fieldName',
        $setViewValue: angular.noop,
        $parsers     : sinon.stub({push: angular.noop})
      });
    }

    beforeEach(function () {
      setup();
      createController();
    });

    function setup() {

      createMockModulesAndInjector();
      createInjectables();
    }

    function createMockModulesAndInjector() {

      module('errorHandling');

      inject(function ($injector) {
        injector = $injector;
      });
    }

    function createController() {

      var $controller = injector.get('$controller');
      controller      = $controller('validationErrorReporterController', injectables);
    }

    function createInjectables() {

      injectables = {
        $scope               : injector.get('$rootScope').$new(),
        validationErrorsModel: sinon.stub({
          registerError: angular.noop,
          removeError  : angular.noop
        })
      };
    }

  });
});