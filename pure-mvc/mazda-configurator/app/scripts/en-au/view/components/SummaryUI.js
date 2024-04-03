define([
    '../../../core/view/components/SummaryUI'
], function () {
    'use strict';

    var SummaryUI = arguments[0];

    return puremvc.define({
            name: 'bmc.view.components.SummaryUI',
            parent: SummaryUI
        },
        {
            getDealerLocationHTML: function () {
                return '';
            }
        },
        {});
});