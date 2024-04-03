(function () {
    'use strict';
    describe('PriceCalculatorDelegateFactory', function () {

        var delegateFactory;

        describe('class should exist ', function () {

            it('should be instanced SectionDataBuilderDelegateFactory', function () {
                expect(delegateFactory).not.to.be(undefined);
            });
        });

        describe('createStrategy', function () {

            it('should create GradePriceCalculatorDelegate', function () {

                var delegate = delegateFactory.createStrategy(bmc.support.ConfigurableType.GRADE, {}),
                    delegateClass =
                        bmc.model.support.sectionData.delegate.GradePriceCalculatorDelegate;

                expect(delegate instanceof delegateClass).to.be(true);
            });

            it('should create EnginePriceCalculatorDelegate', function () {

                var delegate = delegateFactory.createStrategy(bmc.support.ConfigurableType.ENGINE, {}),
                    delegateClass =
                        bmc.model.support.sectionData.delegate.EnginePriceCalculatorDelegate;

                expect(delegate instanceof delegateClass).to.be(true);
            });

            it('should create DependencyPriceCalculatorDelegate', function () {

                var delegate = delegateFactory.createStrategy(bmc.support.ConfigurableType.WHEEL, {}),
                    delegateClass =
                        bmc.model.support.sectionData.delegate.DependencyPriceCalculatorDelegate;

                expect(delegate instanceof delegateClass).to.be(true);
            });


        });

        function getDependencies() {
            return ['support/ConfigurableType',
                'model/support/SectionData/factory/PriceCalculatorDelegateFactory',
                'model/support/sectionData/delegate/GradePriceCalculatorDelegate',
                'model/support/sectionData/delegate/EnginePriceCalculatorDelegate',
                'model/support/sectionData/delegate/DependencyPriceCalculatorDelegate'

            ];
        }

        function createDelegateFactory() {
            delegateFactory = new bmc.model.support.sectionData.factory.PriceCalculatorDelegateFactory();
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createDelegateFactory();
                done();
            });
        });
    });
})();
