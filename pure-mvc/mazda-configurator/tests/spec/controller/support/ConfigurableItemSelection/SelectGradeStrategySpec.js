(function () {
    'use strict';
    describe('SelectGradeStrategy', function () {

        var strategy,
            facade,
            dataBuilder,
            baseVehiclesProxy,
            activeConfigurationProxy;

        describe('class should exist ', function () {

            it('should instance SelectGradeStrategy', function () {
                expect(strategy).not.to.be(undefined);
            });
        });

        describe('handleItemSelected', function () {

            describe('Choosing a grade', function () {

                describe('Change grade', function () {

                    it('should set a base vehicle that has : the selected grade + the active engine',
                        function () {

                            var selectedGrade = dataBuilder.GRADE_002_VO();

                            strategy.handleItemSelected(selectedGrade);

                            expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_3_VO());
                            expect(activeConfigurationProxy.getGrade()).to.be(selectedGrade);
                        });
                });

                describe('Changing grade with option packs on the active configuration', function () {

                    it('should set a base vehicle that has : the selected grade + the active engine ' +
                        '+ same option pack as the previous base vehicle',
                        function () {

                            addOptionPackToStartAndExpectedBaseVehicleVOs(
                                dataBuilder.VEHICLE_1_VO(), dataBuilder.VEHICLE_3_VO());

                            strategy.handleItemSelected(dataBuilder.GRADE_002_VO());

                            expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_3_VO());

                            expect(activeConfigurationProxy.getGrade()).to.equal(
                                dataBuilder.VEHICLE_3_VO().getGradeVO());

                            expect(activeConfigurationProxy.getOptionPackVOs()[0]).to.be(dataBuilder.OPTIONPACK_3_VO());
                        });

                    it('should set a base vehicle that has : the selected grade + two option packs from the previous ' +
                        'base vehicle',
                        function () {

                            var selectedGradeVO = dataBuilder.GRADE_001_VO();

                            setUpVehicleVOsOptionPacksForNearestOptionPackTest();

                            activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_7_VO());

                            strategy.handleItemSelected(selectedGradeVO);

                            expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_1_VO());
                            expect(activeConfigurationProxy.getGrade()).to.equal(selectedGradeVO);
                            expect(activeConfigurationProxy.getOptionPackVOs().length).to.be(2);
                        });

                    it('should set a base vehicle that has : the selected grade + 0 option packs', function () {

                        var selectedGradeVO = dataBuilder.GRADE_001_VO();

                        setUpVehicleVOsOptionPacksForNearestOptionPackTest();

                        dataBuilder.VEHICLE_1_VO().optionPackIds = [];
                        dataBuilder.VEHICLE_1_VO().optionPackVOs = [];

                        activeConfigurationProxy.setBaseVehicleVO(dataBuilder.VEHICLE_7_VO());

                        strategy.handleItemSelected(selectedGradeVO);

                        expect(activeConfigurationProxy.baseVehicle).to.be(dataBuilder.VEHICLE_1_VO());
                        expect(activeConfigurationProxy.getGrade()).to.equal(selectedGradeVO);
                        expect(activeConfigurationProxy.getOptionPackVOs().length).to.be(0);
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


            addOptionPacksToVehicle(dataBuilder.VEHICLE_1_VO(), [pack1, pack2]);
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

        beforeEach(function (done) {

            require(getDependencies(), function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                createFacade();
                createProxies();
                createSelectGradeStrategy();
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

        function createSelectGradeStrategy() {
            strategy = new bmc.controller.support.ConfigurableItemSelection.SelectGradeStrategy(facade);
        }

        function getDependencies() {

            return [
                '../../../' + 'test/spec/support/data/DataBuilder',
                'support/ConfigurableType',
                'model/proxy/data/BaseVehiclesProxy',
                'model/proxy/ActiveConfigurationProxy',
                'model/proxy/ChangeBaseVehicleByEngineProxy',
                'controller/support/ConfigurableItemSelection/SelectGradeStrategy'
            ];
        }
    });
})();
