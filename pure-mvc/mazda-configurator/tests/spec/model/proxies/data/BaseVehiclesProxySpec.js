(function () {
    'use strict';
    describe('BaseVehiclesProxy', function () {
        var proxy,
            dataBuilder;

        function getDependencies() {
            return [
                'model/proxy/data/BaseVehiclesProxy',
                'support/NotificationNames'
            ];
        }

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });

        function mockData() {
            return {
                'modelID': 'M6',
                'modelName': 'Mazda6',
                'startupBaseVehicleId': 'GHW8BAA',
                'baseVehicles': [
                    {
                        'id': 'GHW8BAA',
                        'rank': '1',
                        'bodyStyleId': '2200',
                        'gradeId': '001',
                        'engineId': '600BMCXPE00',
                        'keyCriteriaIds': 'KC03,KC05,KC06,KC07,KC08,KC11,KC13,KC16',
                        'standardFeatureIds': '0001,0003,0016,0028,0030,0031,0032,0033',
                        'capCode': 'MA6 20SE 4SPIM  2',
                        'specPage': 'ghw8baa_specs.xml',
                        'price': '19595.0000'
                    },
                    {
                        'id': 'GHW8BAA6N3',
                        'rank': '2',
                        'bodyStyleId': '2200',
                        'gradeId': '001',
                        'engineId': '600BMCXPE00',
                        'keyCriteriaIds': 'KC03,KC05,KC06,KC07,KC08,KC11,KC13,KC16',
                        'standardFeatureIds': '0001,0003,0016,0028,0030,0031,0032,0033',
                        'optionPackIds': 'P_01_2200_001',
                        'capCode': 'MA6 20SEN4SPIM  2',
                        'specPage': 'ghw8baa6n3_specs.xml',
                        'price': '20195.0000'
                    },
                    {
                        'id': 'GLG7BAA',
                        'rank': '3',
                        'bodyStyleId': '2200',
                        'gradeId': '001',
                        'engineId': '600BMCXPY00',
                        'keyCriteriaIds': 'KC03,KC05,KC06,KC07,KC08,KC11,KC13,KC16',
                        'standardFeatureIds': '0001,0003,0016,0028,0030,0031,0032,0033,0034,0037,0041',
                        'capCode': 'MA6 22SE 4SDTM  2',
                        'specPage': 'glg7baa_specs.xml',
                        'price': '21795.0000'
                    },
                    {
                        'id': 'GHW8BAD',
                        'rank': '5',
                        'bodyStyleId': '2200',
                        'gradeId': '002',
                        'engineId': '600BMCXPE00',
                        'keyCriteriaIds': 'KC04,KC05,KC06,KC07,KC08,KC11,KC12,KC14,KC16',
                        'standardFeatureIds': '0001,0003,0004,0011,0014,0017,0018,0028,0030',
                        'capCode': 'MA6 20LSE4SPIM  2',
                        'specPage': 'ghw8bad_specs.xml',
                        'price': '20395.0000'
                    },
                    {
                        'id': 'GHW8BAD6N3',
                        'rank': '6',
                        'bodyStyleId': '2200',
                        'gradeId': '002',
                        'engineId': '600BMCXPE00',
                        'keyCriteriaIds': 'KC04,KC05,KC06,KC07,KC08,KC11,KC12,KC14,KC16',
                        'standardFeatureIds': '0001,0003,0004,0011,0014,0017,0018,0028,0030,0031',
                        'optionPackIds': 'P_01_2200_002',
                        'capCode': 'MA6 20LSN4SPIM  2',
                        'specPage': 'ghw8bad6n3_specs.xml',
                        'price': '20995.0000'
                    }
                ]
            };
        }

        beforeEach(function (done) {
            require(getDependencies(), function () {
                var facade = puremvc.Facade.getInstance(String(new Date().getTime()));

                proxy = new bmc.model.proxy.data.BaseVehiclesProxy();
                facade.registerProxy(proxy);

                proxy.parseData(mockData());

                done();
            });
        });

        describe('initialising', function () {
            it('should be initialised', function (done) {
                expect(proxy).to.not.be(undefined);
                done();
            });
        });

        describe('parsing data', function () {
            it('should populate a baseVehicles array containing vos', function () {
                expect(proxy.getData()[0]).to.have.property('capCode');
            });

            it('should set the value of the default starting vehicle', function () {
                expect(proxy.getStartupBaseVehicleId()).to.equal('GHW8BAA');
            });
        });

        describe('retrieving data', function () {
            it('should return null if the vehicle id does not exist', function () {
                expect(proxy.getById('Mazda')).to.be(null);
            });

            it('should return the correct default model when given GHW8BAA', function () {
                expect(proxy.getById('GHW8BAA')).to.be(proxy.getData()[0]);
            });

            it('should return the correct default model when given GHW8BAA6N3', function () {
                expect(proxy.getById('GHW8BAA6N3')).to.be(proxy.getData()[1]);
            });

            it('should return the correct default model when given GLG7BAA', function () {
                expect(proxy.getById('GLG7BAA')).to.be(proxy.getData()[2]);
            });

            it('should return an array of vehicle(s) belonging to BODYSTYLE & GRADE', function () {

                var vehicles = proxy.getByBodyStyleGrade('2200', '002');
                expect(vehicles.length).to.be(2);
            });

            it('should return an array of vehicle(s) belonging to BODYSTYLE & ENGINE', function () {

                var vehicles = proxy.getByBodyStyleEngine('2200', '600BMCXPE00');
                expect(vehicles.length).to.be(4);
            });

            it('should return an array of all vehicle(s) belonging to BODYSTYLE', function () {

                var vehicles = proxy.getByBodyStyle('2200');
                expect(vehicles.length).to.be(5);
            });
        });

    });
})();
