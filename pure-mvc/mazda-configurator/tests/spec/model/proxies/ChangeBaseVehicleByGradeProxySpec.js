(function () {
    'use strict';
    describe('ChangeBaseVehicleByGradeProxy', function () {
        var proxy,
            facade,
            GRADE = 'grade',
            ENGINE = 'engine',
            COLOUR = 'colour',
            BODYSTYLE = 'bodyStyle',
            SEND_NOFICATION_METHOD = 'sendNotification',

            dataBuilder;

        describe('proxy class should exist ', function () {

            it('should be instanced', function () {
                expect(proxy).not.to.be(undefined);
            });
        });

        describe('updateBaseVehicle', function () {

            it('should keep existing engine choice if available on new grade', function () {

                sameEngineSetup();
                proxy.updateBaseVehicle();
                expect(proxy.getNewBaseVehicle().getId()).to.be(dataBuilder.VEHICLE_3_ID());
                expect(proxy.getNewBaseVehicle().engineId).to.be(dataBuilder.ENGINE_1_ID());
            });

            it('should replace engine choice with the new grades lowest ranking vehicle', function () {

                noEngineAvailableSetup();
                proxy.updateBaseVehicle();
                expect(proxy.getNewBaseVehicle().getId()).to.be(dataBuilder.VEHICLE_5_ID());
                expect(proxy.getNewBaseVehicle().engineId).to.be(dataBuilder.ENGINE_3_ID());

            });

            it('should send a notification containing the new base vehicle', function () {

                var spy = sinon.spy(proxy, SEND_NOFICATION_METHOD);

                sameEngineSetup();
                proxy.updateBaseVehicle();

                expect(spy.called).to.be(true);
                expect(spy.args[0][1]).not.have.property(dataBuilder.VEHICLE_3_ID());

                proxy.sendNotification.restore();
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
                createChangeBaseVehicleByGradeProxy();
                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/ChangeBaseVehicleByGradeProxy'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createChangeBaseVehicleByGradeProxy() {
            proxy = new bmc.model.proxy.ChangeBaseVehicleByGradeProxy();
            facade.registerProxy(proxy);
            proxy.setActiveConfigurationVO(mockActiveConfiguration());
        }

        function mockActiveConfiguration() {

            var activeConfiguration = {
                getConfigurableItemVO: function (type) {
                    return this[type];
                }
            };

            populateActiveConfiguration(activeConfiguration);

            return activeConfiguration;
        }

        function populateActiveConfiguration(activeConfiguration) {

            activeConfiguration[COLOUR] = dataBuilder.COLOUR_1_VO();
            activeConfiguration[ENGINE] = dataBuilder.ENGINE_1_VO();
            activeConfiguration[GRADE] = dataBuilder.GRADE_001_VO();
            activeConfiguration[BODYSTYLE] = dataBuilder.BODYSTYLE_2200_VO();
            activeConfiguration.baseVehicle = dataBuilder.VEHICLE_1_VO();
        }

        function sameEngineSetup() {

            proxy.selectedGrade = dataBuilder.GRADE_002_ID();
            proxy.setBaseVehicles([
                dataBuilder.VEHICLE_3_VO(),
                dataBuilder.VEHICLE_4_VO()
            ]);
        }

        function noEngineAvailableSetup() {
            proxy.selectedGrade = dataBuilder.GRADE_003_ID();
            proxy.setBaseVehicles([
                dataBuilder.VEHICLE_5_VO(),
                dataBuilder.VEHICLE_6_VO()
            ]);
        }
    });

})();
