(function () {
    'use strict';

    describe('PricePresentationMediator', function () {
        var facade,
            mediator;

        function setupDOM() {
            jQuery(document.body).append('<div class="' +
                bmc.support.HTMLAttributes.VEHICLE_DETAILS_CLASS +
                '"></div>');
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        before(function () {
            bmc.support.GlobalConfig.instance = null;
        });

        beforeEach(function (done) {
            require([
                'view/mediators/PricePresentationMediator',
                'support/HTMLTemplate',
                'support/HTMLAttributes',
                'support/NotificationNames'
            ], function () {
                var globalConfig = bmc.support.GlobalConfig.getInstance();
                globalConfig.applyLocaleData('en-gb');

                setupDOM();
                createFacade();

                mediator = new bmc.view.mediators.PricePresentationMediator();
                facade.registerMediator(mediator);

                done();
            });
        });

        afterEach(function () {
            jQuery('.' + bmc.support.HTMLAttributes.VEHICLE_DETAILS_CLASS).remove();
        });

        describe('initialising', function () {
            it('should have a PricePresentationMediator instance', function () {
                expect(mediator).not.to.be(undefined);
            });
        });

        describe('registering', function () {
            it('should render the component to the dom', function () {
                mediator.onRegister();

                expect(jQuery('.' + bmc.support.HTMLAttributes.VEHICLE_DETAILS_CLASS).html()).to.contain(
                    bmc.support.HTMLAttributes.VEHICLE_PRICE_CLASS);
            });
        });

        describe('listening for notifications', function () {
            it('should be able to listening for price updates', function () {
                expect(mediator.listNotificationInterests()).to.contain(
                    bmc.support.NotificationNames.PRICE_UPDATED
                );
            });
        });

        describe('handling notification', function () {
            it('should be able to present money in the desired format', function () {
                var HTMLAttributes = bmc.support.HTMLAttributes;

                mediator.onRegister();

                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.PRICE_UPDATED,
                    '19595.0000'
                ));

                expect(jQuery('.' + HTMLAttributes.VEHICLE_DETAILS_CLASS +
                    ' .' + HTMLAttributes.PRICE_VALUE_CLASS).html()).to.contain('£19,595');
            });
        });
    });
})();