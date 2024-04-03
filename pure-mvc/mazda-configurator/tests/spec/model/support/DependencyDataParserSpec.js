(function () {
    'use strict';
    describe('DependencyDataParser', function () {

        var dependencyDataParser;

        beforeEach(function (done) {

            require(getDependencies(), function () {

                dependencyDataParser = new bmc.model.support.DependencyDataParser();
                done();
            });
        });

        describe('the class should be properly initialised', function () {

            it('should be initialised', function (done) {

                expect(dependencyDataParser).to.not.be(undefined);
                done();
            });
        });

        describe('the instance should extract the various dependency from the data', function () {

            it('should create an instance of a dependenciesVO', function () {

                var dependenciesVO = dependencyDataParser.extractDependencies(mockData());
                expect(dependenciesVO).to.have.property('addAvailabilityPrecondition');
            });

            it('should extract top level ( bodyStyle ) preconditions for availabilty', function () {

                var dependenciesVO =
                        dependencyDataParser.extractDependencies(mockDataBodyStylePrecondition()),
                    availabilityPrecondition = dependenciesVO.getAvailabilityPrecondition()[0];

                expect(availabilityPrecondition.type).to.equal('bodyStyle');
                expect(availabilityPrecondition.id).to.equal('2200');
            });

            it('should extract second level ( bodyStyle + grade ) nested preconditions', function () {

                var dependenciesVO = dependencyDataParser.extractDependencies(mockDataBodyStyleGradePrecondition()),
                    bodyStylePrecondition = dependenciesVO.getAvailabilityPrecondition()[0].getPreconditions()[0];

                expect(bodyStylePrecondition.type).to.equal('grade');
                expect(bodyStylePrecondition.id).to.equal('001');
            });

            it('should extract third level ( bodyStyle + grade + engine )', function () {

                var dependenciesVO =
                        dependencyDataParser.extractDependencies(mockDataBodyStyleGradeEnginePrecondition()),
                    bodyStyleEnginePrecondition = (dependenciesVO
                        .getAvailabilityPrecondition()[0]
                        .getPreconditions()[0]
                        .getPreconditions()[0]);

                expect(bodyStyleEnginePrecondition.type).to.equal('engine');
                expect(bodyStyleEnginePrecondition.id).to.equal('600BMCXPE00');
            });

            it('should extract third level ( grade + engine )', function () {

                var dependenciesVO =
                        dependencyDataParser.extractDependencies(mockDataGradeEnginePrecondition()),
                    bodyStyleEnginePrecondition = (dependenciesVO
                        .getAvailabilityPrecondition()[0]
                        .getPreconditions()[0]);

                expect(bodyStyleEnginePrecondition.type).to.equal('engine');
                expect(bodyStyleEnginePrecondition.id).to.equal('600BMCXPE00');
            });

            it('should create a render precondition', function () {

                var dependenciesVO =
                        dependencyDataParser.extractDependencies(mockDataGradeRenderPrecondition()),
                    renderPrecondition = (dependenciesVO.getRenderPrecondition()[0]);

                expect(renderPrecondition.type).to.equal('grade');

            });
        });

        function getDependencies() {
            return [
                'model/support/DependencyDataParser',
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

        function mockDataGradeEnginePrecondition() {
            return {
                'availability': [
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

        function mockDataGradeRenderPrecondition() {
            return {
                'render': [
                    {
                        'type': 'grade',
                        'id': '001',
                        'value': 'test value',
                        'preconditions': []
                    }
                ]
            };
        }


    });
})();