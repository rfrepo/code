define(['support/abstractErrorsInterceptor'], function (AbstractErrorsInterceptor) {

  'use strict';

  describe('AbstractErrorsInterceptor', function () {

    var service;
    var injector;
    var injectables;
    var response;

    it('should be an injectable instance of the AbstractErrorsInterceptor', function () {
      expect(service).to.have.property('response');
    });

    describe('public api', function () {

      it('should pass errors to the pageErrorModel if response contains errors', function () {

        var errorSearchResult = {errors: []};

        var dataParser      = injectables.dataParser;
        var pageErrorsModel = injectables.pageErrorsModel;

        dataParser.searchDataForErrors.returns(errorSearchResult);

        service.response(response);

        expect(dataParser.searchDataForErrors).to.have.been.calledWith(response.data);
        expect(pageErrorsModel.storeErrors).to.have.been.calledWith(errorSearchResult.errors);
      });

      it('should not call store errors on pageErrorsModel if response contains no errors', function () {

        var errorSearchResult = {errors: undefined};

        var dataParser      = injectables.dataParser;
        var pageErrorsModel = injectables.pageErrorsModel;

        dataParser.searchDataForErrors.returns(errorSearchResult);

        service.response(response);

        expect(dataParser.searchDataForErrors).to.have.been.calledWith(response.data);
        expect(pageErrorsModel.storeErrors).not.to.have.been.calledWith(errorSearchResult);
      });

      it('should clear all the errors contained in the pageErrorsModel', function () {

        var errorSearchResult = {errors: undefined};

        var dataParser      = injectables.dataParser;
        var pageErrorsModel = injectables.pageErrorsModel;

        dataParser.searchDataForErrors.returns(errorSearchResult);

        service.response(response);

        expect(pageErrorsModel.clearErrors).to.have.been.called;
      });

      it('should have the ability to stop intercepting', function () {

        var dataParser = injectables.dataParser;

        service.stopIntercepting();

        service.response(response);

        expect(dataParser.searchDataForErrors).not.to.have.been.called;

      });

      it('should have the ability to resume intercepting', function () {

        var dataParser = injectables.dataParser;
        dataParser.searchDataForErrors.returns({});

        service.stopIntercepting();

        service.response(response);

        expect(dataParser.searchDataForErrors).not.to.have.been.called;

        service.resumeIntercepting();

        service.response(response);

        expect(dataParser.searchDataForErrors).to.have.been.called;

      });

      it('should not process response\'s data that contains html strings', function () {

        var dataParser = injectables.dataParser;

        response.data = '<div></div>';

        service.response(response);

        expect(dataParser.searchDataForErrors).not.to.have.been.called;

      });

      it('should throw an error when setErrorsModel is called with an object that does not have clearErrors and storeErrors', function () {

        function setErrorsModel() {
          service.setErrorsModel({});
        }

        expect(setErrorsModel).to.throw('model should have clearErrors and storeErrors functions');
      });

    });

    beforeEach(function () {

      createInjectables();
      createResponseObject();
      createMockModulesAndInjector();
      createService();
    });

    function createInjectables() {
      injectables = {

        pageErrorsModel: sinon.stub({
          storeErrors: angular.noop,
          clearErrors: angular.noop
        }),

        dataParser: sinon.stub({
          searchDataForErrors: angular.noop
        })
      };
    }

    function createResponseObject() {

      response = {
        data  : {},
        config: {
          url: 'AjaxResponseCmd'
        }
      };
    }

    function createMockModulesAndInjector() {

      module('errorHandling');

      inject(function ($injector) {
        injector = $injector;
      });
    }

    function createService() {

      var $controller = injector.get('$controller');
      service         = $controller(AbstractErrorsInterceptor, injectables);
    }
  });
});