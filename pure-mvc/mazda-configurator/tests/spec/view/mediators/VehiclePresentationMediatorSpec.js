(function () {
    'use strict';
    describe('VehiclePresentationMediator', function () {

        var mediator,
            facade,
            viewComponent;

        describe('initializing VehiclePresentationMediator', function () {

            it('should be defined', function () {
                expect(mediator).not.to.be(undefined);
            });
        });

        describe('listNotificationInterests & handleNotification', function () {

            it('should call the view component\'s updateView on VEHICLE_PRESENTATION_UPDATE', function () {

                viewComponent.updateView = function () {
                };

                var spy = sinon.spy(viewComponent, 'updateView');

                facade.sendNotification(bmc.support.NotificationNames.VEHICLE_PRESENTATION_UPDATE);
                viewComponent.updateView.restore();

                expect(spy.called).to.be(true);
            });

            it('should call the view component\'s updateView on ACTIVE_SECTION_UPDATED', function () {

                viewComponent.updateState = function () {
                };

                var spy = sinon.spy(viewComponent, 'updateState');

                facade.sendNotification(bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED);
                viewComponent.updateState.restore();

                expect(spy.called).to.be(true);
            });

            it('should call the view component\'s updateView on VEHICLE_PRESENTATION_UPDATE', function () {

                viewComponent.scaleImage = function () {
                };

                var spy = sinon.spy(viewComponent, 'scaleImage');

                facade.sendNotification(bmc.support.NotificationNames.VIEW_SCROLL_UPDATED);
                viewComponent.scaleImage.restore();

                expect(spy.called).to.be(true);
            });
        });


        beforeEach(function (done) {

            require([
                'view/mediators/VehiclePresentationMediator',
                'support/NotificationNames'
            ], function () {

                mediator = new bmc.view.mediators.VehiclePresentationMediator();
                viewComponent = mediator.getViewComponent();
                facade = puremvc.Facade.getInstance(new Date().getTime());
                facade.registerMediator(mediator);
                done();
            });
        });


    });
})();
