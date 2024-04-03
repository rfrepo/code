(function () {
    'use strict';

    describe('ConfigurableItemSpecificationsUIMediator', function () {

        var facade,
            mediator,
            UPDATE_VIEW = 'updateView';

        describe('initializing', function () {

            it('should be defined ConfigurableItemSpecificationsUIMediator', function () {
                expect(mediator).not.to.be(undefined);
            });
        });

        describe('listNotificationInterests', function () {

            it('should be interested in CAROUSEL_UPDATED', function () {

                var sectionDataAvailable = bmc.support.NotificationNames.CAROUSEL_UPDATED;
                expect(mediator.listNotificationInterests()).to.contain(sectionDataAvailable);
            });
        });

        describe('handleNotification', function () {

            it('should be interested should call updateView on the view component', function () {

                var spy,
                    component = mediator.getViewComponent();

                component.updateView = function () {
                };

                spy = sinon.spy(component, UPDATE_VIEW);

                mediator.handleNotification(createNotification());

                expect(spy.called).to.be(true);

                component[UPDATE_VIEW].restore();
            });
        });

        beforeEach(function (done) {
            require([
                'view/components/support/SectionContent/GradeContentStrategy',
                'view/mediators/ConfigurableItemSpecificationsUIMediator',
                'support/ConfigurableType'
            ], function () {

                createFacade();
                mediator =
                    new bmc.view.mediators.ConfigurableItemSpecificationsUIMediator(createGradeContentStrategy());
                facade.registerMediator(mediator);

                done();
            });
        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createGradeContentStrategy() {
            return new bmc.view.components.support.SectionContent.GradeContentStrategy();
        }

        function createNotification() {

            return {
                getType: function () {
                    return  bmc.support.NotificationNames.CAROUSEL_UPDATED;
                },

                getBody: function () {
                    return {};
                }

            };
        }
    });
})();
