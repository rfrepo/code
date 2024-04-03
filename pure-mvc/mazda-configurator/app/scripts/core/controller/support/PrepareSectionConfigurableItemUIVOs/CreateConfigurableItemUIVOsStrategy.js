define(['controller/support/PrepareSectionConfigurableItemUIVOs/AbstractCreateConfigurableItemUIVOsStrategy'
], function () {
    'use strict';
    var AbstractCreateConfigurableItemUIVOsStrategy = arguments[0];


    puremvc.define({
            name: 'bmc.controller.support.PrepareSectionConfigurableItemUIVOs.CreateConfigurableItemUIVOsStrategy',
            parent:
                AbstractCreateConfigurableItemUIVOsStrategy,
            constructor: function (host, data) {

                var abstractsPackage = bmc.controller.support.PrepareSectionConfigurableItemUIVOs;

                abstractsPackage.AbstractCreateConfigurableItemUIVOsStrategy.call(this, host, data);
            }
        },
        {
        });
});