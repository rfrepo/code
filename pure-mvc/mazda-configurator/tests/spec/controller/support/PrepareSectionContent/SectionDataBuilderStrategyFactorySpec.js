(function () {
    'use strict';

    describe('SectionDataBuilderStrategyFactory', function () {

        var delegateFactory,
            SummarySectionDataBuilderStrategy,
            GenericSectionDataBuilderStrategy,
            SECTION_WITHOUT_DELEGATE = 'section-without-delegate';

        describe('class should exist ', function () {

            it('should be instanced SectionDataBuilderDelegateFactory', function () {
                expect(delegateFactory).not.to.be(undefined);
            });
        });

        describe('createStrategy', function () {

            it('should return GradeSectionDataBuilderStrategy', function () {

                var delegate = delegateFactory.createStrategy(bmc.support.ConfigurableType.GRADE),
                    gradeDelegateClass =
                        bmc.controller.support.PrepareSectionContent.DataBuilders.GradeSectionDataBuilderStrategy;

                expect(delegate instanceof gradeDelegateClass).to.be(true);
            });

            it('should return SummarySectionDataBuilderStrategy', function () {

                var delegate = delegateFactory.createStrategy(bmc.support.GlobalConstants.SUMMARY),
                    summaryDelegateClass = SummarySectionDataBuilderStrategy;

                expect(delegate instanceof summaryDelegateClass).to.be(true);
            });

            it('should return EngineSectionDataBuilderStrategy', function () {

                var delegate = delegateFactory.createStrategy(bmc.support.ConfigurableType.ENGINE),
                    engineDelegateClass =
                        bmc.controller.support.PrepareSectionContent.DataBuilders.EngineSectionDataBuilderStrategy;

                expect(delegate instanceof engineDelegateClass).to.be(true);
            });

            it('should return GenericSectionDataBuilderStrategy when there is no delegate for a section', function () {

                var delegate = delegateFactory.createStrategy(SECTION_WITHOUT_DELEGATE),
                    defaultDelegateClass = GenericSectionDataBuilderStrategy;

                expect(delegate instanceof defaultDelegateClass).to.be(true);
            });

        });

        function getDependencies() {
            return ['support/ConfigurableType',
                'support/GlobalConstants',
                'controller/support/PrepareSectionContent/DataBuilders/GenericSectionDataBuilderStrategy',
                'controller/support/PrepareSectionContent/DataBuilders/SummarySectionDataBuilderStrategy',
                'controller/support/PrepareSectionContent/DataBuilders/GradeSectionDataBuilderStrategy',
                'controller/support/PrepareSectionContent/SectionDataBuilderStrategyFactory'
            ];
        }

        function createDelegateFactory() {
            delegateFactory = new bmc.controller.support.PrepareSectionContent.SectionDataBuilderStrategyFactory();
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {

                SummarySectionDataBuilderStrategy = arguments[3];
                GenericSectionDataBuilderStrategy = arguments[2];
                createDelegateFactory();
                done();
            });
        });
    });
})();
