(function () {
    'use strict';
    describe('RecentConfigurationsMediator', function () {

        var mediator,
            facade,
            facadeStub,
            sendNoteStub;

        function setupDOM() {
            jQuery(document.body).append('<div class="' +
                bmc.support.HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS +
                '"></div>');
        }

        function createFacade() {
            return puremvc.Facade.getInstance(new Date().getTime());
        }

        beforeEach(function (done) {
            require([
                'support/NotificationNames',
                'view/mediators/RecentConfigurationsMediator',
                'controller/command/RequestUserConfigurationsCommand'
            ], function () {
                mediator = new bmc.view.mediators.RecentConfigurationsMediator();
                facadeStub = sinon.stub(mediator, 'getFacade');
                facade = createFacade();
                sendNoteStub = sinon.stub(facade, 'sendNotification', function () {});

                facadeStub.returns(facade);

                setupDOM();

                done();
            });
        });

        afterEach(function () {
            jQuery('.' + bmc.support.HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS).remove();

            facadeStub.restore();
        });

        describe('initializing', function () {
            it('should be defined', function () {
                expect(mediator).not.to.be(undefined);
            });
        });

        describe('registering', function () {
            beforeEach(function () {
                sinon.spy(mediator, 'sendNotification');

                mediator.onRegister();
            });

            afterEach(function () {
                mediator.sendNotification.restore();
                mediator.getFacade().sendNotification.restore();
            });

            it('should request for all current saved configurations', function () {
                sinon.assert.calledWith(mediator.sendNotification,
                    bmc.support.NotificationNames.REQUEST_USER_CONFIGURATIONS);
            });

            it('should render the base template to the dom', function () {
                expect(
                    jQuery('.' + bmc.support.HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS).html()
                ).to.contain(bmc.support.HTMLAttributes.RECENT_CONFIG_CONTAINER_CLASS);
            });
        });

        describe('handling notifications', function () {
            function getSimpleConfiguration(baseVehicleId, parts) {
                var simpleConfig = new bmc.model.vo.SimpleConfigurationVO();
                simpleConfig.setBaseVehicleVO(
                    new bmc.model.vo.data.BaseVehicleVO({
                        id: baseVehicleId
                    })
                );

                parts = parts || {};

                simpleConfig.addConfigurableItemVO(
                    bmc.support.ConfigurableType.COLOUR,
                    new bmc.model.vo.data.ColourVO({
                        id: parts.colour
                    })
                );
                simpleConfig.addConfigurableItemVO(
                    bmc.support.ConfigurableType.WHEEL,
                    new bmc.model.vo.data.WheelVO({
                        id: parts.wheel
                    })
                );
                simpleConfig.addConfigurableItemVO(
                    bmc.support.ConfigurableType.TRIM,
                    new bmc.model.vo.data.TrimVO({
                        id: parts.trim
                    })
                );

                return simpleConfig;
            }

            beforeEach(function () {
                mediator.onRegister();
            });

            it('should be listening for saved configuration changes', function () {
                expect(mediator.listNotificationInterests()).to.contain(
                    bmc.support.NotificationNames.USER_CONFIGURATIONS_CHANGED);
            });

            it('should render nothing to the dom if there are no saved configurations', function () {
                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.USER_CONFIGURATIONS_CHANGED,
                    []
                ));

                expect(
                    jQuery('.' + bmc.support.HTMLAttributes.RECENT_CONFIG_CONTAINER_CLASS).html()
                ).not.to.contain(bmc.support.HTMLAttributes.RECENT_CONFIGURATION);
            });

            it('should render a configuration to the dom if one is in the data', function () {
                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.USER_CONFIGURATIONS_CHANGED,
                    [
                        getSimpleConfiguration('vehicle1', {
                            colour: 'colour1'
                        })
                    ]
                ));

                expect(
                    jQuery('.' + bmc.support.HTMLAttributes.RECENT_CONFIG_CONTAINER_CLASS).html()
                ).to.contain(bmc.support.HTMLAttributes.RECENT_CONFIGURATION);
            });

            it('should clear the dom before re-rendering', function () {
                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.USER_CONFIGURATIONS_CHANGED,
                    [
                        getSimpleConfiguration('vehicle1', {
                            colour: 'colour1'
                        })
                    ]
                ));

                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.USER_CONFIGURATIONS_CHANGED,
                    [
                        getSimpleConfiguration('vehicle1', {
                            colour: 'colour1'
                        })
                    ]
                ));

                expect(
                    jQuery('.' + bmc.support.HTMLAttributes.RECENT_CONFIG_CONTAINER_CLASS +
                        ' .' + bmc.support.HTMLAttributes.RECENT_CONFIGURATION).length
                ).to.equal(1);
            });
        });
    });
})();
