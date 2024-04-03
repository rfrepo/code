define([
    'jquery',
    'support/HTMLAttributes',
    '../../../core/view/components/MobileUI',
    'view/components/support/AusPostcodeFinderEvents'
], function () {
    'use strict';
    var MobileUI = arguments[2],
        AusPostcodeFinderEvents = arguments[3];


    return puremvc.define({
            name: 'bmc.view.components.MobileUI',
            parent: MobileUI
        },
        {
            setConfiguration: function (simpleConfiguration) {
                this.configuration = simpleConfiguration;
                this.renderConfigurationValuesInActiveTrayItems();
                this.renderVehicleImages(this.configuration);
                this.renderSummary(this.configuration);
                this.renderPostCode();
                this.renderWhichItemIsSelected();
            },

            setupEvents: function () {
                this.setupClickEvents();
                this.setupResizeEvent();

                AusPostcodeFinderEvents.initilise();
            },

            renderPostCode: function () {
                var postCodeText = bmc.support.GlobalConfig.getInstance().LOCALE_POSTCODE,
                    postCodeElement = jQuery('#postcode');
                if (postCodeText) {
                    postCodeElement.html(postCodeText);
                }
            }
        },
        {});
});