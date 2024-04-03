define([
    'support/ConfigurableType',
    'controller/support/ConfigurableItemSelection/SelectItemStrategy',
    'controller/support/ConfigurableItemSelection/SelectEngineStrategy',
    'controller/support/ConfigurableItemSelection/SelectTrimStrategy',
    'controller/support/ConfigurableItemSelection/SelectGradeStrategy',
    'controller/support/ConfigurableItemSelection/SelectAccessoryStrategy',
    'controller/support/ConfigurableItemSelection/SelectOptionPackStrategy'
], function () {
    'use strict';
    var ConfigurableType = arguments[0],
        SelectItemStrategy = arguments[1],
        SelectEngineStrategy = arguments[2],
        SelectTrimStrategy = arguments[3],
        SelectGradeStrategy = arguments[4],
        SelectAccessoryStrategy = arguments[5],
        SelectOptionPackStrategy = arguments[6];

    return puremvc.define({
            name: 'bmc.controller.support.ConfigurableItemSelection.SelectionStrategyFactory'
        },
        {
            createStrategy: function (delegateType, facade) {
                var strategyInstance;

                if (delegateType === ConfigurableType.GRADE) {

                    strategyInstance = new SelectGradeStrategy(facade);
                }
                else if (delegateType === ConfigurableType.ENGINE) {

                    strategyInstance = new SelectEngineStrategy(facade);
                }
                else if (delegateType === ConfigurableType.TRIM) {

                    strategyInstance = new SelectTrimStrategy(facade);
                }
                else if (delegateType === ConfigurableType.ACCESSORIES) {

                    strategyInstance = new SelectAccessoryStrategy(facade);
                }
                else if (delegateType === ConfigurableType.OPTIONPACK) {

                    strategyInstance = new SelectOptionPackStrategy(facade);
                }
                else {
                    strategyInstance = new SelectItemStrategy(facade);
                }

                return strategyInstance;
            }
        }
    );
});