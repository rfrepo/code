(function () {
    'use strict';
    describe('BaseVehiclesDefaultsProxy', function () {

        var baseVehiclesDefaultsProxy;

        beforeEach(function (done) {

            require(getDependencies(), function () {

                var facade = puremvc.Facade.getInstance(new Date().getTime());
                baseVehiclesDefaultsProxy = new bmc.model.proxy.data.BaseVehiclesDefaultsProxy();
                facade.registerProxy(baseVehiclesDefaultsProxy);
                done();
            });
        });

        describe('the proxy should be properly initialised', function () {

            it('should be initialised', function (done) {

                expect(baseVehiclesDefaultsProxy).to.not.be(undefined);
                done();
            });
        });

        describe('the proxy should parse data and convert data to vos', function () {

            it('should populate a baseVehiclesDefaults array containing vos', function () {

                baseVehiclesDefaultsProxy.parseData(mockData());
                expect(baseVehiclesDefaultsProxy.baseVehicleDefaults[0]).to.have.property('baseVehicleId');

            });
        });

        function getDependencies() {
            return [
                'model/proxy/data/BaseVehiclesDefaultsProxy',
                'support/NotificationNames'
            ];
        }

        function mockData() {
            return {
                'modelselect': 'M6',
                'modelName': 'Mazda6',
                'baseVehicleDefaults': [
                    {
                        'baseVehicleId': 'GHW8BAA',
                        'wheelId': 'WHE_01',
                        'colourId': '41V_2200',
                        'trimId': 'GN5_2200',
                        'accessoryIds': 'null'
                    },
                    {
                        'baseVehicleId': 'GHW8BAA6N3',
                        'wheelId': 'WHE_01',
                        'colourId': '41V_2200',
                        'trimId': 'GN5_2200',
                        'accessoryIds': 'null'
                    }
                ]
            };
        }

    });
})();
