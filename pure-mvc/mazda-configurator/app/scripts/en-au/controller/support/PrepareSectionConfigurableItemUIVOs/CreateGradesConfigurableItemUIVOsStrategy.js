define([
    'controller/support/PrepareSectionConfigurableItemUIVOs/AbstractCreateConfigurableItemUIVOsStrategy',
    'support/ConfigurableType',
    'support/GlobalConstants'
], function () {
    'use strict';
    var AbstractCreateConfigurableItemUIVOsStrategy = arguments[0],
        ConfigurableType = arguments[1];


    puremvc.define({
            name: 'bmc.controller.support.PrepareSectionConfigurableItemUIVOs.' +
                'CreateGradesConfigurableItemUIVOsStrategy',
            parent: AbstractCreateConfigurableItemUIVOsStrategy,
            constructor: function (host, data) {

                this.abstractsPackage = bmc.controller.support.PrepareSectionConfigurableItemUIVOs;
                this.abstractsPackage.AbstractCreateConfigurableItemUIVOsStrategy.call(this, host, data);
            }
        },
        {
            getCriteria: function () {
                var criteria = {},
                    driveType = bmc.support.GlobalConfig.getInstance().getDriveType();

                criteria[ConfigurableType.BODYSTYLE] = this.getActiveConfigurationVO().getBodyStyle();
                if (driveType) {
                    criteria[bmc.support.GlobalConstants.DRIVETYPE] = driveType;
                }


                return criteria;
            }

        });
});