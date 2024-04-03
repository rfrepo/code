define([
    '../../../core/view/components/SectionContentUI',
    'support/ConfigurableType',
    'support/GlobalConstants',
    'support/HTMLAttributes'
], function () {
    'use strict';
    var SectionContentUI = arguments[0],
        HTMLAttributes = arguments[3],
        GlobalConstants = bmc.support.GlobalConstants;

    return puremvc.define({
            name: 'bmc.view.components.SectionContentUI',
            parent: SectionContentUI
        },
        {
            displayDisclaimerContent: function (data) {
                var disclaimer = data.getDisclaimer();

                this.setFooterDisclaimer(disclaimer);
                this.setRdpHeader(disclaimer);
                this.setRdpDisclaimer(disclaimer);
            },

            setFooterDisclaimer: function (disclaimer) {
                var disclaimerTitles = [
                        'section',
                        GlobalConstants.DISCLAIMER_TITLES.initialDisclaimer,
                        GlobalConstants.DISCLAIMER_TITLES.colourDisclaimer
                    ],
                    index,
                    disclaimerText = '', sectionText;

                for (index = 0; index < disclaimerTitles.length; index++) {
                    sectionText =
                        this.forEachDisclaimer(disclaimer[disclaimerTitles[index]],
                            '<br /><br />');

                    if (sectionText) {
                        disclaimerText += sectionText + '<br /><br />';
                        sectionText = undefined;
                    }
                }

                this.disclaimerUI.parent().append(this.disclaimerUI);
                this.disclaimerUI.html(disclaimerText);
            },

            setRdpHeader: function (disclaimer) {
                var disclaimerText =
                    this.forEachDisclaimer(disclaimer[GlobalConstants.DISCLAIMER_TITLES.disclaimerHeader], ' ');

                disclaimerText += '<span class="disclaimer-button"></span>';

                jQuery('.' + HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS + ' .otr').html(disclaimerText);
            },

            setRdpDisclaimer: function (disclaimer) {
                var disclaimerText =
                        this.forEachDisclaimer(disclaimer[GlobalConstants.DISCLAIMER_TITLES.rdpDisclaimer],
                            '<br /><br />'),
                    disclaimerParent = jQuery('.' + HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS + ' .disclaimer');


                jQuery('.' + HTMLAttributes.VEHICLE_DETAILS_CONTAINER_CLASS + ' .disclaimer p').html(disclaimerText);
                disclaimerParent.css('top', '-' + (disclaimerParent.height() + 50) + 'px');
            },


            forEachDisclaimer: function (DisclaimerSet, disclaimerBreak) {
                var index,
                    disclaimerText = '',
                    arrayLength = DisclaimerSet.length;

                for (index = 0; index < arrayLength; index++) {
                    if (disclaimerText === '') {
                        disclaimerText = DisclaimerSet[index];
                    } else {
                        disclaimerText += disclaimerBreak + DisclaimerSet[index];
                    }
                }

                return disclaimerText;
            }
        },
        {}
    );
});