define([], function () {
    'use strict';
    return puremvc.define({
            name: 'bmc.model.support.constants.DependencyTypes'
        },
        {},
        {
            AVAILABILITY: 'availability',
            PRICE: 'price',
            SELECTION: 'selection',
            RENDER: 'render',
            DEPENDENCY_TYPES: ['availability', 'price', 'selection', 'render']
        }
    );
});