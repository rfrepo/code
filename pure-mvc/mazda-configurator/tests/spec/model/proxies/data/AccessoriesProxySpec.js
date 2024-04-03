(function () {
    'use strict';
    describe('AccessoriesProxy', function () {

        var proxy,
            dataBuilder,
            TEST_DISCLAIMER = 'test disclaimer';

        describe('initialising', function () {
            it('should be initialised', function (done) {
                expect(proxy).to.not.be(undefined);
                done();
            });
        });

        describe('parsing data', function () {

            it('should populate an accessories array containing vos', function () {

                expect(proxy.getData().length).to.be(2);
                expect(proxy.getData()[0]).to.have.property('id');
            });
        });

        describe('retrieving data', function () {

            it('should return the correct disclaimer', function () {
                expect(proxy.getDisclaimer()).to.be(TEST_DISCLAIMER);
            });
        });

        function getDependencies() {
            return [
                'model/proxy/data/AccessoriesProxy',
                'support/NotificationNames'
            ];
        }

        before(function (done) {

            require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                dataBuilder = new bmc.support.data.DataBuilder();
                done();
            });
        });


        beforeEach(function (done) {
            require(getDependencies(), function () {
                var facade = puremvc.Facade.getInstance(String(new Date().getTime()));

                proxy = new bmc.model.proxy.data.AccessoriesProxy();
                facade.registerProxy(proxy);
                proxy.parseData(mockData());
                done();
            });
        });

        function mockData() {
            return {
                'disclaimers': {
                    accessories: TEST_DISCLAIMER
                },
                'modelID': 'M6',
                'modelName': 'Mazda6',
                'startupBaseVehicleId': 'GHW8BAA',
                'accessories': [
                    {
                        'unit': '1',
                        'id': 'GHP9-V4-090',
                        'name': 'Rear bumper step plate',
                        'group': null,
                        'dependencies': {
                            'price': [],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '25ba4cee-953b-464d-a118-938a27398746.jpg',
                        'price': [],
                        'disclaimer': null
                    },
                    {
                        'unit': '1',
                        'id': 'GHK1-V4-920 -00',
                        'name': 'Rear spoiler, lip type',
                        'group': null,
                        'dependencies': {
                            'price': [],
                            'availability': [
                                {
                                    'id': '001',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '002',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                },
                                {
                                    'id': '003',
                                    'type': 'grade',
                                    'value': '',
                                    'preconditions': [
                                        {
                                            'id': '600BMCXPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': '600BMCXPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00BMC2XPE00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        },
                                        {
                                            'id': 'A00XPY00',
                                            'type': 'engine',
                                            'value': '',
                                            'preconditions': []
                                        }
                                    ]
                                }
                            ]
                        },
                        'imageFileName': '7ee60705-07d7-484f-8f7d-0143f562e277.jpg',
                        'price': [],
                        'disclaimer': null
                    }
                ]
            };
        }

    });
})();
