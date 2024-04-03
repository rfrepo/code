(function () {
    'use strict';
    describe('ConfigurationConflictProxy', function () {

        var proxy,
            facade,
            SEND_NOTIFICATION = 'sendNotification',
            dataBuilder;

        describe('class should exist ', function () {

            it('should be instanced', function () {
                expect(proxy).not.to.be(undefined);
            });
        });

        describe('checkForConfilcts ', function () {

            it('compare current and previous configurations for differences', function () {

                var conflicts,
                    spy = sinon.spy(proxy, SEND_NOTIFICATION);

                proxy.checkForConflicts(createCurrentActiveConfigurationVO(),
                    new bmc.model.vo.NavigationItemVO());

                proxy[SEND_NOTIFICATION].restore();

                conflicts = spy.args[0][1];

                expect(conflicts.length).to.be(5);

            });

            it('should send an on confilicts found notification', function () {

                var notificationName,
                    spy = sinon.spy(proxy, SEND_NOTIFICATION);

                proxy.checkForConflicts(createCurrentActiveConfigurationVO(),
                    new bmc.model.vo.NavigationItemVO());

                proxy[SEND_NOTIFICATION].restore();

                notificationName = spy.args[0][0];

                expect(notificationName).to.be(bmc.support.NotificationNames.ON_CONFLICTS_FOUND);

            });

            it('should create a price conflict vo as first item in the array', function () {

                var conflicts,
                    spy = sinon.spy(proxy, SEND_NOTIFICATION);

                proxy.checkForConflicts(createCurrentActiveConfigurationVO(),
                    new bmc.model.vo.NavigationItemVO());

                proxy[SEND_NOTIFICATION].restore();

                conflicts = spy.args[0][1];

                expect(conflicts[0].type).to.be(bmc.support.GlobalConstants.PRICE);

            });

            describe.skip('Accessories ', function () {

                it('should cater for accessory conflicts, accessory conflicts show only the number not actual vo types',
                    function () {

                        var conflicts,
                            accessoryConflictVO,
                            spy = sinon.spy(proxy, SEND_NOTIFICATION);

                        proxy.checkForConflicts(createCurrentActiveConfigurationVOWithAccessories(),
                            new bmc.model.vo.NavigationItemVO());

                        proxy[SEND_NOTIFICATION].restore();

                        conflicts = spy.args[0][1];
                        accessoryConflictVO = conflicts[conflicts.length - 1];

                        expect(accessoryConflictVO.getPreviousValue()).to.be(2);
                        expect(accessoryConflictVO.getCurrentValue()).to.be(4);
                    });
            });
        });

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createConfigurationConflictProxy();
                done();
            });
        });

        function createCurrentActiveConfigurationVO() {

            var activeConfigurationVO = new bmc.model.vo.SimpleConfigurationVO();
            activeConfigurationVO.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.GRADE, dataBuilder.GRADE_003_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.ENGINE, dataBuilder.ENGINE_6_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.WHEEL, dataBuilder.WHEEL_2_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.TRIM, dataBuilder.TRIM_2_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.COLOUR, dataBuilder.COLOUR_1_VO());
            activeConfigurationVO.setPreviousConfigurationVO(createPreviousConfigurationVO());

            return activeConfigurationVO;
        }

        function createPreviousConfigurationVO() {

            var activeConfigurationVO = new bmc.model.vo.SimpleConfigurationVO();
            activeConfigurationVO.setBaseVehicleVO(dataBuilder.VEHICLE_2_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.GRADE, dataBuilder.GRADE_001_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.ENGINE, dataBuilder.ENGINE_1_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.WHEEL, dataBuilder.WHEEL_1_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.TRIM, dataBuilder.TRIM_1_VO());
            activeConfigurationVO.addConfigurableItemVO(bmc.support.ConfigurableType.COLOUR, dataBuilder.COLOUR_1_VO());

            return activeConfigurationVO;
        }


        function createCurrentActiveConfigurationVOWithAccessories() {

            var activeConfigurationVO = createCurrentActiveConfigurationVO(),
                previousConfigurationVO = activeConfigurationVO.getPreviousConfigurationVO();

            activeConfigurationVO.accessoryVOs = [dataBuilder.ACCESSORY_1_VO(), dataBuilder.ACCESSORY_2_VO()];
            previousConfigurationVO.accessoryVOs = [dataBuilder.ACCESSORY_1_VO()];

            activeConfigurationVO.optionPackVOs = [dataBuilder.OPTIONPACK_1_VO(), dataBuilder.OPTIONPACK_2_VO()];
            previousConfigurationVO.optionPackVOs = [dataBuilder.OPTIONPACK_1_VO()];

            return activeConfigurationVO;
        }

        function getDependencies() {
            return [
                'model/proxy/ConfigurationConflictProxy',
                'model/vo/SimpleConfigurationVO',
                'model/vo/NavigationItemVO',
                'support/ConfigurableType',
                'support/NotificationNames',
                'support/GlobalConstants'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createConfigurationConflictProxy() {
            proxy = new bmc.model.proxy.ConfigurationConflictProxy();
            facade.registerProxy(proxy);
        }

    });
})();
