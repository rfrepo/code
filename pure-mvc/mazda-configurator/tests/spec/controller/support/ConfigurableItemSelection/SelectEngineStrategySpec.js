(function () {
    'use strict';
    describe('SelectEngineStrategy', function () {

        var strategy,
            facade,
            dataBuilder,
            baseVehiclesProxy,
            activeConfigurationProxy;

        describe('class should exist ', function () {

            it('should instance SelectEngineStrategy', function () {
                expect(strategy).not.to.be(undefined);
            });
        });

        describe('handleItemSelected', function () {

            describe('Choosing an engine available within the same grade', function () {

                describe('Selecting an engine', function () {

                    it('should set a base vehicle that has : the current grade + the selected engine',
                        function () {

                            strategy.handleItemSelected(dataBuilder.ENGINE_2_VO());

                            expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_2_VO());
                            expect(activeConfigurationProxy.getGrade()).to.be(dataBuilder.VEHICLE_1_VO().getGradeVO());
                            expect(activeConfigurationProxy.getEngine()).to.be(
                                dataBuilder.VEHICLE_2_VO().getEngineVO());
                        });
                });

                describe('Selecting an engine with option packs on the active configuration', function () {

                    it('should set a base vehicle that has : the current grade + the selected engine + ' +
                        'same option pack as the previous vehicle',
                        function () {

                            addOptionPackToStartAndExpectedBaseVehicleVOs(
                                dataBuilder.VEHICLE_1_VO(), dataBuilder.VEHICLE_2_VO());

                            strategy.handleItemSelected(dataBuilder.ENGINE_2_VO());

                            expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_2_VO());

                            expect(activeConfigurationProxy.getGrade()).to.equal(
                                dataBuilder.VEHICLE_1_VO().getGradeVO());

                            expect(activeConfigurationProxy.getOptionPackVOs()[0]).to.be(dataBuilder.OPTIONPACK_3_VO());
                        });

                    it('should set a base vehicle that has : the selected engine + one option pack from the previous ' +
                        'vehicle',
                        function () {

                            var selectedEngineVO = dataBuilder.ENGINE_1_VO();

                            changeVehicleVOsEngine(dataBuilder.VEHICLE_5_VO(), selectedEngineVO);

                            setUpVehicleVOsOptionPacksForNearestOptionPackTest();

                            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_7_VO());

                            strategy.handleItemSelected(selectedEngineVO);

                            expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_5_VO());
                            expect(activeConfigurationProxy.getGrade()).to.equal(
                                dataBuilder.VEHICLE_7_VO().getGradeVO());
                            expect(activeConfigurationProxy.getOptionPackVOs()[0]).to.be(dataBuilder.OPTIONPACK_1_VO());
                        });

                    it('should set a base vehicle that has : the selected engine + 0 option packs', function () {

                        var selectedEngineVO = dataBuilder.ENGINE_1_VO();

                        setUpVehicleVOsOptionPacksForNearestOptionPackTest();

                        activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_7_VO());

                        strategy.handleItemSelected(selectedEngineVO);

                        expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_1_VO());
                    });
                });
            });

            describe('Choosing an engine available on a different grade', function () {

                describe('Selecting an engine', function () {

                    it('should set a base vehicle that has : a different grade + the selected engine',
                        function () {

                            strategy.handleItemSelected(dataBuilder.ENGINE_3_VO());

                            expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_5_VO());

                            expect(activeConfigurationProxy.getGrade()).not.to.be(
                                dataBuilder.VEHICLE_1_VO().getGradeVO());

                            expect(activeConfigurationProxy.getEngine()).to.be(
                                dataBuilder.VEHICLE_5_VO().getEngineVO());
                        });
                });

                describe('Selecting an engine with option packs on the active configuration', function () {

                    it('should set a base vehicle that has : a different grade + contain the selected engine' +
                        ' + the current option pack',
                        function () {

                            addOptionPackToStartAndExpectedBaseVehicleVOs(
                                dataBuilder.VEHICLE_1_VO(), dataBuilder.VEHICLE_5_VO());

                            strategy.handleItemSelected(dataBuilder.ENGINE_3_VO());

                            expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_5_VO());

                            expect(activeConfigurationProxy.getGrade()).not.to.be(
                                dataBuilder.VEHICLE_1_VO().getGradeVO());
                            expect(activeConfigurationProxy.getOptionPackVOs()[0]).to.be(dataBuilder.OPTIONPACK_3_VO());
                        });
                });
            });

        });

        function addOptionPackToStartAndExpectedBaseVehicleVOs(sartVehicleVO, expectedVehicleVO) {

            sartVehicleVO.optionPackIds = [dataBuilder.OPTIONPACK_3_VO().getId()];
            sartVehicleVO.optionPackVOs = [dataBuilder.OPTIONPACK_3_VO()];

            expectedVehicleVO.optionPackIds = [dataBuilder.OPTIONPACK_3_VO().getId()];
            expectedVehicleVO.optionPackVOs = [dataBuilder.OPTIONPACK_3_VO()];
        }

        function setUpVehicleVOsOptionPacksForNearestOptionPackTest() {

            var pack1 = dataBuilder.OPTIONPACK_1_VO(),
                pack2 = dataBuilder.OPTIONPACK_2_VO(),
                pack3 = dataBuilder.OPTIONPACK_3_VO();

            addOptionPacksToVehicle(dataBuilder.VEHICLE_5_VO(), [pack1]);
            addOptionPacksToVehicle(dataBuilder.VEHICLE_6_VO(), [pack1, pack2]);
            addOptionPacksToVehicle(dataBuilder.VEHICLE_7_VO(), [pack1, pack2, pack3]);
        }

        function addOptionPacksToVehicle(vehicleVO, optionPacks) {

            vehicleVO.optionPackIds = [];
            vehicleVO.optionPackVOs = [];

            _.each(optionPacks, function (optionPackVO) {
                vehicleVO.optionPackVOs.push(optionPackVO);
                vehicleVO.optionPackIds.push(optionPackVO.getId());
            });
        }

        function changeVehicleVOsEngine(vehicleVO, engineVO) {

            vehicleVO.engineId = engineVO.getId();
            vehicleVO.engineVO = engineVO;
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                createFacade();
                createProxies();
                createSelectEngineStrategy();
                done();
            });
        });

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createProxies() {
            createActiveConfigurationProxy();
            createBaseVehicleProxy();
        }

        function createActiveConfigurationProxy() {

            activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();

            facade.registerProxy(activeConfigurationProxy);
            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
        }

        function createBaseVehicleProxy() {

            baseVehiclesProxy = new bmc.model.proxy.data.BaseVehiclesProxy();

            baseVehiclesProxy.data = dataBuilder.baseVehicles;
            facade.registerProxy(baseVehiclesProxy);
        }

        function createSelectEngineStrategy() {
            strategy = new bmc.controller.support.ConfigurableItemSelection.SelectEngineStrategy(facade);
        }

        function getDependencies() {

            return [
                '../../../' + 'test/spec/support/data/DataBuilder',
                'support/ConfigurableType',
                'model/proxy/data/BaseVehiclesProxy',
                'model/proxy/ActiveConfigurationProxy',
                'model/proxy/ChangeBaseVehicleByEngineProxy',
                'controller/support/ConfigurableItemSelection/SelectEngineStrategy'
            ];
        }
    });
})();
