(function () {
    'use strict';
    describe('AbstractProxy', function () {

        var abstractProxy;

        beforeEach(function (done) {

            require(getDependencies(), function () {

                var facade = puremvc.Facade.getInstance(new Date().getTime());
                abstractProxy = new bmc.model.proxy.data.AbstractProxy();
                facade.registerProxy(abstractProxy);
                done();
            });
        });

        describe('the proxy should be properly initialised', function () {

            it('should be initialised', function (done) {

                expect(abstractProxy).to.not.be(undefined);
                done();
            });
        });

        describe('the proxy should extract the various dependency from the data', function () {

            it('should create an instance of a dependenciesVO', function () {

                var dependenciesVO = abstractProxy.extractDependencies(mockData());
                expect(dependenciesVO).to.have.property('addAvailabilityPrecondition');
            });

            it('should extract top level ( bodyStyle ) preconditions for availabilty', function () {

                var dependenciesVO = abstractProxy.extractDependencies(mockDataBodyStylePrecondition()),
                    availabilityPrecondition = dependenciesVO.getAvailabilityPrecondition()[0];

                expect(availabilityPrecondition.type).to.equal('bodyStyle');
                expect(availabilityPrecondition.id).to.equal('2200');
            });

            it('should extract second level ( bodyStyle + grade ) nested preconditions', function () {

                var dependenciesVO = abstractProxy.extractDependencies(mockDataBodyStyleGradePrecondition()),
                    bodyStylePrecondition = dependenciesVO.getAvailabilityPrecondition()[0].getPreconditions()[0];

                expect(bodyStylePrecondition.type).to.equal('grade');
                expect(bodyStylePrecondition.id).to.equal('001');
            });

            it('should extract precondtions for availabilty', function () {

                var dependenciesVO = abstractProxy.extractDependencies(mockDataBodyStyleGradeEnginePrecondition()),
                    bodyStyleEnginePrecondition = (dependenciesVO
                        .getAvailabilityPrecondition()[0]
                        .getPreconditions()[0]
                        .getPreconditions()[0]);

                expect(bodyStyleEnginePrecondition.type).to.equal('engine');
                expect(bodyStyleEnginePrecondition.id).to.equal('600BMCXPE00');
            });


            it('should extract precondtions for availabilty', function () {

                var dependenciesVO = abstractProxy.extractDependencies(mockDataBodyStyleGradeEnginePrecondition()),
                    bodyStyleEnginePrecondition = (dependenciesVO
                        .getAvailabilityPrecondition()[0]
                        .getPreconditions()[0]
                        .getPreconditions()[0]);

                expect(bodyStyleEnginePrecondition.type).to.equal('engine');
                expect(bodyStyleEnginePrecondition.id).to.equal('600BMCXPE00');
            });
        });

        function getDependencies() {
            return [
                'model/proxy/data/AbstractProxy',
                'support/NotificationNames'
            ];
        }

        function mockDataBodyStylePrecondition() {
            return {
                'availability': [
                    {
                        'type': 'bodyStyle',
                        'id': '2200',
                        'preconditions': []
                    }
                ]
            };
        }

        function mockDataBodyStyleGradePrecondition() {
            return {
                'availability': [
                    {
                        'type': 'bodyStyle',
                        'id': '2200',
                        'preconditions': [
                            {
                                'type': 'grade',
                                'id': '001'
                            }
                        ]
                    }
                ]
            };
        }

        function mockDataBodyStyleGradeEnginePrecondition() {
            return {
                'availability': [
                    {
                        'type': 'bodyStyle',
                        'id': '2200',
                        'preconditions': [
                            {
                                'type': 'grade',
                                'id': '001',
                                'preconditions': [
                                    {
                                        'type': 'engine',
                                        'id': '600BMCXPE00'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }


        function mockData() {
            return {
                'availability': [
                    {
                        'type': 'bodyStyle',
                        'id': '2200',
                        'preconditions': [
                            {
                                'type': 'grade',
                                'id': '001'
                            },
                            {
                                'type': 'grade',
                                'id': '002'
                            },
                            {
                                'type': 'grade',
                                'id': '003'
                            }
                        ]
                    },
                    {
                        'type': 'bodyStyle',
                        'id': '5500',
                        'preconditions': [
                            {
                                'type': 'grade',
                                'id': '001'
                            }
                        ]
                    }
                ]
            };
        }
    });
})();