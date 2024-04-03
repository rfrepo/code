(function () {
    'use strict';
    describe('VehicleDetailsMediator', function () {

        var mediator,
            facade,
            globalConfig,
            MODEL_ID = 'M6',
            BODYSTYLE_NAME = '5 Door Hatchback',
            LOCALE = 'en-gb',
            facadeStub;

        function setupDOM() {
            jQuery(document.body).append('<div class="' +
                bmc.support.HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS +
                '"></div>');
        }

        function createFacade() {
            return puremvc.Facade.getInstance(Math.floor(Math.random() * 1000) + new Date().getTime());
        }

        beforeEach(function (done) {
            require([
                'jquery',
                'support/HTMLAttributes',
                'support/NotificationNames',
                'model/vo/data/BaseVehicleVO',
                'model/vo/data/BodyStyleVO',
                'model/vo/SimpleConfigurationVO',
                'view/mediators/VehicleDetailsMediator'
            ], function () {
                globalConfig = bmc.support.GlobalConfig.getInstance();
                globalConfig.applyLocaleData(LOCALE);
                globalConfig.setBodyStyleVO({
                    getName: function () {
                        return '5 Door Hatchback';
                    }
                });

                mediator = new bmc.view.mediators.VehicleDetailsMediator();
                facadeStub = sinon.stub(mediator, 'getFacade');
                facade = createFacade();
                facadeStub.returns(facade);

                setupDOM();

                mediator.onRegister();

                done();
            });
        });

        afterEach(function () {
            jQuery('.' + bmc.support.HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS).remove();

            facadeStub.restore();

            globalConfig = null;
            bmc.support.GlobalConfig.instance = undefined;
        });

        describe('initializing', function () {
            it('should be a VehicleDetailsMediator instance', function () {
                expect(mediator).not.to.be(undefined);
            });
        });

        describe('listening for notifications', function () {
            it('should have configuration change events', function () {
                expect(mediator.listNotificationInterests()).to.contain(
                    bmc.support.NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY
                );
            });
        });


        describe('handling notifications', function () {
            function getSimpleConfiguration(baseVehicleId, parts) {
                var simpleConfig = new bmc.model.vo.SimpleConfigurationVO(),
                    baseVehicleVO = new bmc.model.vo.data.BaseVehicleVO({
                        id: baseVehicleId
                    });

                baseVehicleVO.setBodyStyleVO(
                    new bmc.model.vo.data.BodyStyleVO({
                        name: BODYSTYLE_NAME
                    })
                );

                simpleConfig.setVehicleId(MODEL_ID);
                simpleConfig.setBaseVehicleVO(baseVehicleVO);

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

            it('should render model information to the dom when the active configuration changes', function () {
                var renderedHtml;

                mediator.handleNotification(
                    new puremvc.Notification(
                        bmc.support.NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY,
                        getSimpleConfiguration('M6')
                    )
                );

                renderedHtml = jQuery('.' + bmc.support.HTMLAttributes.VEHICLE_DETAILS_CLASS).html();

                expect(renderedHtml).to.contain(globalConfig.LANGUAGE[MODEL_ID]);
                expect(renderedHtml).to.contain(BODYSTYLE_NAME);
            });
        });
    });
})();
