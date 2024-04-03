(function () {
    'use strict';
    describe('SelectTrimStrategy', function () {

        var strategy,
            facade,
            dataBuilder,
            activeConfigurationProxy,

            TRIM = 'trim',
            BODYSTYLE = 'bodyStyle',
            ENGINE = 'engine',
            GRADE = 'grade';

        describe('class should exist ', function () {

            it('should instance SelectTrimStrategy', function () {
                expect(strategy).not.to.be(undefined);
            });
        });

        describe('handleItemSelected', function () {

            it('should update the active configuration with only the selected trim', function () {

                strategy.handleItemSelected(dataBuilder.TRIM_4_VO());
                expect(activeConfigurationProxy.getTrim()).to.be(dataBuilder.TRIM_4_VO());
            });

            it('should update the active configuration with a new base vehicle and the selected trim', function () {

                strategy.handleItemSelected(dataBuilder.TRIM_3_VO());

                expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_5_VO());
                expect(activeConfigurationProxy.getTrim()).to.be(dataBuilder.TRIM_3_VO());
            });

            it('should select the lowest ranking vehicle when a grade change produces multiple compatible vehicles ',
                function () {

                    activeConfigurationProxy[ENGINE] = dataBuilder.ENGINE_3_VO();

                    strategy.handleItemSelected(dataBuilder.TRIM_3_VO());

                    expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_5_VO());
                    expect(activeConfigurationProxy.getTrim()).to.be(dataBuilder.TRIM_3_VO());
                });
        });


        describe('Selecting and Removing trim with Option pack dependencies', function () {

            it('should set the selected trim and trim\'s option pack', function () {

                strategy.handleItemSelected(dataBuilder.TRIM_2_VO());
                expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_6_VO());
            });

            it('should set the selected trim whilst removing the current trim and it\'s option pack dependent',
                function () {

                    activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_6_VO());

                    strategy.handleItemSelected(dataBuilder.TRIM_3_VO());

                    expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_5_VO());
                });

            it('should set the selected trim whilst retaining base vehicle and selected option packs',
                function () {

                    activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_8_VO());
                    activeConfigurationProxy.setConfigurableItemVO(TRIM, dataBuilder.TRIM_1_VO());

                    strategy.handleItemSelected(dataBuilder.TRIM_3_VO());

                    expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_8_VO());
                    expect(activeConfigurationProxy.getConfigurableItemVO(TRIM)).to.be(dataBuilder.TRIM_3_VO());
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
                createProxies();
                populateActiveConfigurationProxy();
                createSelectTrimStrategy();
                done();
            });
        });

        function getDependencies() {
            return [
                'support/ConfigurableType',
                'model/proxy/data/BaseVehiclesProxy',
                'model/proxy/data/OptionPackProxy',
                'model/proxy/ActiveConfigurationProxy',
                'controller/support/ConfigurableItemSelection/SelectTrimStrategy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createProxies() {

            var baseVehiclesProxy = new bmc.model.proxy.data.BaseVehiclesProxy(),
                optionPackProxy = new bmc.model.proxy.data.OptionPackProxy();

            activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();

            facade.registerProxy(optionPackProxy);
            facade.registerProxy(baseVehiclesProxy);
            facade.registerProxy(activeConfigurationProxy);

            baseVehiclesProxy.data = dataBuilder.baseVehicles;
            optionPackProxy.data = dataBuilder.optionPacks;
        }

        function populateActiveConfigurationProxy() {

            activeConfigurationProxy[TRIM] = dataBuilder.TRIM_1_VO();
            activeConfigurationProxy[GRADE] = dataBuilder.GRADE_001_VO();
            activeConfigurationProxy[ENGINE] = dataBuilder.ENGINE_1_VO();
            activeConfigurationProxy[BODYSTYLE] = dataBuilder.BODYSTYLE_2200_VO();
        }

        function createSelectTrimStrategy() {
            strategy = new bmc.controller.support.ConfigurableItemSelection.SelectTrimStrategy(facade);
        }
    });
})();
