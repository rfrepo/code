(function () {
    'use strict';

    describe('MainConfiguratorContainerMediator', function () {

        var mediator, realHTMLTemplate;

        beforeEach(function (done) {
            require([
                'view/mediators/MainConfiguratorContainerMediator',
                'support/HTMLTemplate'
            ], function () {

                realHTMLTemplate = bmc.support.HTMLTemplate;
                bmc.support.HTMLTemplate = { getSynchronously: function () {} };

                mediator = new bmc.view.mediators.MainConfiguratorContainerMediator();

                done();
            });
        });

        afterEach(function () {
            bmc.support.HTMLTemplate = realHTMLTemplate;
        });

        describe('initializing MCCM', function () {
            it('should be defined', function () {
                expect(mediator).to.not.be(undefined);
            });

            it('should have a component', function () {
                expect(mediator.getViewComponent()).to.not.be(undefined);
            });
        });

        describe('registering', function () {
            it('should tell the view component to render', function () {
                mediator.getViewComponent().render = function () {};

                sinon.spy(mediator.getViewComponent(), 'render');

                mediator.onRegister();

                sinon.assert.calledOnce(mediator.getViewComponent().render);
            });
        });
    });
})();