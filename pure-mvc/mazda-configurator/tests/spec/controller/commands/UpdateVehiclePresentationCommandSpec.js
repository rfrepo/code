(function () {
    'use strict';
    describe('UpdateVehiclePresentationCommand', function () {

        var facade,
            command,
            dataBuilder,

            BASE = 'base',
            WHEEL = 'wheel',
            TRIM = 'trim',
            ACCESSORIES = 'accessories',
            URL_FRAGMENT = '/',
            SEND_NOTIFICATION = 'sendNotification';

        describe('command class should exist', function () {

            it('should instance ConfigurableItemUpdatedCommand', function () {
                expect(command).not.to.be(undefined);
            });
        });

        describe('Updating vehicle presentation', function () {

            it('should send out the urls of changed vehicle parts that affect the appearance of the vehicle',
                function () {

                    var spy = getSpyFromSendNotification(),
                        notificationPayLoad = spy.getCall(0).args[1];

                    expect(notificationPayLoad[0].layer).to.be(BASE);
                    expect(notificationPayLoad[1].layer).to.be(WHEEL);

                    expect(notificationPayLoad[1].imageURL).to.contain(URL_FRAGMENT);
                    expect(notificationPayLoad[1].imageURL).to.contain(URL_FRAGMENT);

                    expect(notificationPayLoad[2].layer).to.be(TRIM);
                    expect(notificationPayLoad[1].imageURL).to.contain(URL_FRAGMENT);

                    expect(command).not.to.be(undefined);

                });

            it('should not send a notification if run twice and nothing in the active configuration has changed',
                function () {

                    command.execute(createNotification());

                    var spy = getSpyFromSendNotification();

                    expect(spy.called).to.be(false);
                });

            describe('Accessories', function () {

                it('should include an accessory url and set a layerDataId changes in notification payload',
                    function () {

                        command.execute(createNotification());

                        addAnAccessoryToTheActiveConfigurationProxy(dataBuilder.ACCESSORY_1_VO());

                        var spy = getSpyFromSendNotification(),
                            notificationPayLoad = spy.getCall(0).args[1];

                        expect(notificationPayLoad[0].layer).to.be(ACCESSORIES);
                        expect(notificationPayLoad[0].layerDataId).to.be(dataBuilder.ACCESSORY_1_VO().getId());
                    });

                describe('Adding multiple accessories one after another', function () {

                    it('should include only one changed item the in notification payload',
                        function () {

                            addAnAccessoryToTheActiveConfigurationProxy(dataBuilder.ACCESSORY_1_VO());

                            command.execute(createNotification());

                            addAnAccessoryToTheActiveConfigurationProxy(dataBuilder.ACCESSORY_3_VO());

                            var spy = getSpyFromSendNotification(),
                                notificationPayLoad = spy.getCall(0).args[1];

                            expect(notificationPayLoad.length).to.be(1);
                            expect(notificationPayLoad[0].layer).to.be(ACCESSORIES);
                            expect(notificationPayLoad[0].layerDataId).to.be(dataBuilder.ACCESSORY_3_VO().getId());
                        });
                });

                describe('Removing an accessory', function () {

                    it('should include removed accessories in changed item notification payload',
                        function () {

                            addAnAccessoryToTheActiveConfigurationProxy(dataBuilder.ACCESSORY_1_VO());
                            addAnAccessoryToTheActiveConfigurationProxy(dataBuilder.ACCESSORY_3_VO());
                            removeAnAccessoryFromActiveConfigurationProxy(dataBuilder.ACCESSORY_1_VO());

                            var spy = getSpyFromSendNotification(),
                                notificationPayLoad = spy.getCall(0).args[1];

                            expect(notificationPayLoad[0].remove).to.be(true);

                        });
                });
            });

        });

        function getSpyFromSendNotification() {

            var spy = sinon.spy(command, SEND_NOTIFICATION);
            command.execute(createNotification());
            command[SEND_NOTIFICATION].restore();

            return spy;
        }

        function createNotification() {

            return {
                getName: function () {
                    return '';
                }
            };
        }

        function addAnAccessoryToTheActiveConfigurationProxy(accessoryVO) {
            facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME).addAccessoryVO(accessoryVO);
        }

        function removeAnAccessoryFromActiveConfigurationProxy(accessoryVO) {
            facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME).removeAccessoryVO(accessoryVO);
        }

        beforeEach(function (done) {

            require([
                'controller/command/UpdateVehiclePresentationCommand',
                'model/proxy/ActiveConfigurationProxy',
                'model/proxy/NavigationProxy',
                'support/NotificationNames',
                'model/vo/NavigationItemVO'
            ], function () {

                createFacade();
                createProxies();
                createUpdateVehiclePresentationCommand();

                done();
            });
        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createProxies() {

            var activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy(),
                vehiclePresentationProxy = new bmc.model.proxy.VehiclePresentationProxy(),
                navigationProxy = new bmc.model.proxy.NavigationProxy();

            facade.registerProxy(activeConfigurationProxy);
            facade.registerProxy(navigationProxy);
            facade.registerProxy(vehiclePresentationProxy);


            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
        }

        function createUpdateVehiclePresentationCommand() {

            command = new bmc.controller.command.UpdateVehiclePresentationCommand();
            command.initializeNotifier(new Date().getTime());
            command.facade = facade;
        }


        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                setupGlobalConfig();
                done();
            });
        });

        function setupGlobalConfig() {

            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
            bmc.support.GlobalConfig.getInstance().setVehicleId('m2');
        }
    });
})();
