define([
    'jquery',
    'support/HTMLTemplate',
    'support/HTMLTemplateURL',
    'support/HTMLAttributes',
    'view/components/HTMLComponentUI',
    'model/vo/SimpleConfigurationVO'
], function () {
    'use strict';
    var HTMLTemplateURL = arguments[2],
        HTMLAttributes = arguments[3],
        HTMLComponentUI = arguments[4];


    return puremvc.define({
            name: 'bmc.view.components.VehicleDetailsUI',
            parent: HTMLComponentUI,
            constructor: function (parentSelector) {
                HTMLComponentUI.call(this,
                    '.' + HTMLAttributes.VEHICLE_DETAILS_CLASS,
                    parentSelector,
                    HTMLTemplateURL.VEHICLE_DETAILS_UI);
            }
        },
        {
            createTemplateData: function (simpleConfigurationVO) {
                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    vehicleName = globalConfig.LANGUAGE[simpleConfigurationVO.getVehicleId()],
                    bodyStyleName = globalConfig.getBodyStyleVO().getName();

                return {
                    vehicleNiceName: vehicleName,
                    bodystyleNiceName: bodyStyleName
                };
            },

            render: function (simpleConfigurationVO) {
                var variables = this.createTemplateData(simpleConfigurationVO);

                HTMLComponentUI.prototype.render.call(this, variables);

                jQuery('.' + HTMLAttributes.RECENT_CONFIG_BUTTON_CLASS).click(function () {
                    jQuery('#' + HTMLAttributes.RECENT_CONFIG_ID).toggle('blind', {'direction': 'up'}, 500);
                    jQuery('.' + HTMLAttributes.RECENT_CONFIG_BUTTON_CLASS).toggleClass('open');
                    return false;
                });
            },

            appendToDOM: function (html) {
                jQuery(this.getParentSelector()).prepend(html);
            }
        },
        {});
});