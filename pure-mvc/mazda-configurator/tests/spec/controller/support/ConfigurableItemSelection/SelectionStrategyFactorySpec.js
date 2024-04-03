(function () {
    'use strict';
    describe('SelectionStrategyFactory', function () {

        var strategyFactory;

        describe('class should exist ', function () {

            it('should instance SelectionStrategyFactory', function () {
                expect(strategyFactory).not.to.be(undefined);
            });
        });

        describe('createStrategy', function () {

            it('should create SelectGradeStrategy', function () {

                var delegate = strategyFactory.createStrategy(bmc.support.ConfigurableType.GRADE),
                    gradeStrategyClass =
                        bmc.controller.support.ConfigurableItemSelection.SelectGradeStrategy;

                expect(delegate instanceof gradeStrategyClass).to.be(true);
            });

            it('should create SelectEngineStrategy', function () {

                var delegate = strategyFactory.createStrategy(bmc.support.ConfigurableType.ENGINE),
                    engineStrategyClass =
                        bmc.controller.support.ConfigurableItemSelection.SelectEngineStrategy;

                expect(delegate instanceof engineStrategyClass).to.be(true);
            });

            it('should create SelectTrimStrategy', function () {
                var delegate = strategyFactory.createStrategy(bmc.support.ConfigurableType.TRIM),
                    trimStrategyClass =
                        bmc.controller.support.ConfigurableItemSelection.SelectTrimStrategy;

                expect(delegate instanceof trimStrategyClass).to.be(true);
            });

            it('should create SelectAccessoryStrategy', function () {
                var delegate = strategyFactory.createStrategy(bmc.support.ConfigurableType.ACCESSORIES),
                    addAccessoryStrategyClass =
                        bmc.controller.support.ConfigurableItemSelection.SelectAccessoryStrategy;

                expect(delegate instanceof addAccessoryStrategyClass).to.be(true);
            });

            it('should create SelectItemStrategy when type is not provided', function () {
                var delegate = strategyFactory.createStrategy(bmc.support.ConfigurableType.COLOUR),
                    itemStrategyClass =
                        bmc.controller.support.ConfigurableItemSelection.SelectItemStrategy;

                expect(delegate instanceof itemStrategyClass).to.be(true);
            });

            it('should create SelectOptionPackStrategy when type is not provided', function () {
                var delegate = strategyFactory.createStrategy(bmc.support.ConfigurableType.OPTIONPACK),
                    itemStrategyClass =
                        bmc.controller.support.ConfigurableItemSelection.SelectOptionPackStrategy;

                expect(delegate instanceof itemStrategyClass).to.be(true);
            });
        });

        function getDependencies() {
            return [
                'support/ConfigurableType',
                'controller/support/ConfigurableItemSelection/SelectionStrategyFactory',
                'controller/support/ConfigurableItemSelection/SelectTrimStrategy',
                'controller/support/ConfigurableItemSelection/SelectEngineStrategy',
                'controller/support/ConfigurableItemSelection/SelectGradeStrategy',
                'controller/support/ConfigurableItemSelection/SelectAccessoryStrategy',
                'controller/support/ConfigurableItemSelection/SelectItemStrategy',
                'controller/support/ConfigurableItemSelection/SelectOptionPackStrategy'
            ];
        }

        function createStrategyFactory() {
            strategyFactory = new bmc.controller.support.ConfigurableItemSelection.SelectionStrategyFactory();
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createStrategyFactory();
                done();
            });
        });
    });
})();
