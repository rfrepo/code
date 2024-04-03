define(['support/HTMLAttributes'], function () {
    'use strict';

    var HTMLAttributes = arguments[0];

    puremvc.define({
            name: 'bmc.view.components.support.SectionContent.AccessoryContentStrategy',
            constructor: function () {
                this.parentSelector = jQuery('#message');
            }
        },
        {
            display: function (sectionDataVO) {

                if (!sectionDataVO.sectionData.hasAccessoriesAndOptionPacks) {
                    jQuery('#' +  HTMLAttributes.OPTION_PACK_AND_ACCESSORIES).empty();
                    this.parentSelector.prepend('<p>' + sectionDataVO.sectionData.message + '</p>');
                }
            },

            cleanup: function () {
                this.parentSelector.empty();
            }
        });
});
