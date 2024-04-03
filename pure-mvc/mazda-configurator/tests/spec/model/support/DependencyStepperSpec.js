(function () {
    'use strict';
    describe('DependencyStepper', function () {

        var criteriaVO,
            dataBuilder,

            BODYSTYLE = 'bodyStyle',
            GRADE = 'grade',
            ENGINE = 'engine',
            COLOUR = 'colour',

            NUMBER_OF_DEPENDENCIES = 3,
            BODYSTYLE_ID = '2200',
            GRADE_001_ID = '001',
            GRADE_316_ID = '316',
            ENGINE_ID = 'BMCXP00';

        describe('class should exist ', function () {

            it('should be instanced', function () {
                expect(bmc.model.support.DependencyStepper.isAvailable).not.to.be(undefined);
            });
        });

        describe('isAvailable ', function () {

            it('should step bodyStyle and Grade levels and return true', function () {

                var availabiliyPreconditions =
                        dataBuilder.COLOUR_1_VO().getDependencies().getAvailabilityPrecondition(),
                    isAvailble = bmc.model.support.DependencyStepper.isAvailable(criteriaVO, availabiliyPreconditions);

                expect(isAvailble).to.be(true);
            });

            it('should step bodyStyle and Grade levels and return false', function () {

                criteriaVO[GRADE] = GRADE_316_ID;

                var availabiliyPreconditions =
                        dataBuilder.COLOUR_1_VO().getDependencies().getAvailabilityPrecondition(),
                    isAvailble = bmc.model.support.DependencyStepper.isAvailable(criteriaVO, availabiliyPreconditions);

                expect(isAvailble).to.be(false);
            });

            it('should stop all recursions levels when a the deepest precondition, ' +
                '(the last precondition in the nested dependency tree without preconditions), return true',
                function () {

                    criteriaVO[COLOUR] = 1;

                    var availabiliyPreconditions = createPreconditions(),
                        isAvailble =
                            bmc.model.support.DependencyStepper.isAvailable(criteriaVO, availabiliyPreconditions);

                    expect(isAvailble).to.be(true);
                });

            describe('Handle undefined key on the criteria vo', function () {

                it('should return true if at least one of the recursions cycles returns true. ' +
                    'To know if a previous recursion returned true, a recursions counter variable is incremented ' +
                    'each time recursion is called. If the recursions counter is greater than 1 then at least ' +
                    'one of the recursions returned true', function () {

                    criteriaVO[GRADE] = undefined;
                    criteriaVO[ENGINE] = undefined;

                    var availabiliyPreconditions =
                            dataBuilder.ENGINE_1_VO().getDependencies().getAvailabilityPrecondition(),
                        isAvailble = bmc.model.support.DependencyStepper.isAvailable(
                            criteriaVO, availabiliyPreconditions);

                    expect(isAvailble).to.be(true);
                });

                it('should return false if the criteria vo object has no comparable properties', function () {

                    criteriaVO[BODYSTYLE] = undefined;
                    criteriaVO[GRADE] = undefined;
                    criteriaVO[ENGINE] = undefined;

                    var availabiliyPreconditions =
                            dataBuilder.ENGINE_1_VO().getDependencies().getAvailabilityPrecondition(),
                        isAvailble = bmc.model.support.DependencyStepper.isAvailable(criteriaVO,
                            availabiliyPreconditions);

                    expect(isAvailble).to.be(false);
                });
            });
        });


        describe('getDependenciesOnType', function () {

            it('should calculate if the passed in precondition has a dependency for a type passed in', function () {

                var availabiliyPreconditions =
                        dataBuilder.ENGINE_1_VO().getDependencies().getAvailabilityPrecondition(),

                    dependencies = bmc.model.support.DependencyStepper.getDependenciesOnType(
                        bmc.support.ConfigurableType.GRADE, availabiliyPreconditions);

                expect(dependencies.length).to.be(NUMBER_OF_DEPENDENCIES);
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

                createKeyValues();
                done();
            });
        });


        function getDependencies() {
            return [
                'support/ConfigurableType',
                'model/support/DependencyStepper'
            ];
        }

        function createPreconditions() {

            return [
                {
                    getId: function () {
                        return '2200';
                    },

                    getType: function () {
                        return 'bodyStyle';
                    },

                    getPreconditions: function () {
                        return [
                            {
                                getType: function () {
                                    return 'colour';
                                },
                                getId: function () {
                                    return 1;
                                },
                                getPreconditions: function () {
                                    return [];
                                }
                            },
                            {
                                getType: function () {
                                    return 'colour';
                                },
                                getId: function () {
                                    return 2;
                                },
                                getPreconditions: function () {
                                    return [];
                                }
                            }
                        ];
                    }
                }
            ];
        }

        function createKeyValues() {

            criteriaVO = {};

            criteriaVO[BODYSTYLE] = BODYSTYLE_ID;
            criteriaVO[GRADE] = GRADE_001_ID;
            criteriaVO[ENGINE] = ENGINE_ID;
        }
    });
})();
