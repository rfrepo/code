define(['controller/support/PrepareSectionContent/DataBuilders/EngineSectionDataBuilderStrategy',
    'controller/support/PrepareSectionContent/DataBuilders/GradeSectionDataBuilderStrategy',
    'controller/support/PrepareSectionContent/DataBuilders/GenericSectionDataBuilderStrategy',
    'controller/support/PrepareSectionContent/DataBuilders/SummarySectionDataBuilderStrategy',
    'controller/support/PrepareSectionContent/DataBuilders/AccessoriesSectionDataBuilderStrategy',
    'support/GlobalConstants',
    'support/ConfigurableType'],
    function () {
        'use strict';

        var EngineSectionDataBuilderStrategy = arguments[0],
            GradeSectionDataBuilderStrategy = arguments[1],
            GenericSectionDataBuilderStrategy = arguments[2],
            SummarySectionDataBuilderStrategy = arguments[3],
            AccessoriesSectionDataBuilderStrategy = arguments[4],
            ConfigurableType = arguments[6];

        return puremvc.define({
                name: 'bmc.controller.support.PrepareSectionContent.SectionDataBuilderStrategyFactory'
            },
            {
                createStrategy: function (delegateType, host) {

                    var strategyInstance;

                    if (delegateType === ConfigurableType.GRADE) {

                        strategyInstance = new GradeSectionDataBuilderStrategy(host, delegateType);

                    } else if (delegateType === bmc.support.GlobalConstants.SUMMARY) {

                        strategyInstance = new SummarySectionDataBuilderStrategy(host);

                    } else if (delegateType === ConfigurableType.ENGINE) {

                        strategyInstance = new EngineSectionDataBuilderStrategy(host);

                    } else if (delegateType === ConfigurableType.ACCESSORIES) {

                        strategyInstance = new AccessoriesSectionDataBuilderStrategy(host, delegateType);
                    }
                    else {

                        strategyInstance = new GenericSectionDataBuilderStrategy(host, delegateType);
                    }

                    return strategyInstance;
                }
            });
    });