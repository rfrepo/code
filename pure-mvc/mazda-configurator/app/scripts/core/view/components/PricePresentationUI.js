define([
    'view/components/HTMLComponentUI',
    'support/HTMLAttributes'
], function () {
    'use strict';
    var HTMLComponentUI = arguments[0],
        HTMLAttributes = arguments[1];


    return puremvc.define({
            name: 'bmc.view.components.PricePresentationUI',
            parent: HTMLComponentUI,

            constructor: function (parentSelector) {
                HTMLComponentUI.call(this,
                    parentSelector + ' .' + HTMLAttributes.VEHICLE_PRICE_CLASS,
                    parentSelector,
                    bmc.support.HTMLTemplateURL.PRICING_UI);
            }
        },
        {
            updatePrice: function (price) {
                jQuery(this.getSelector() + ' .' + HTMLAttributes.PRICE_VALUE_CLASS).html(
                    bmc.support.StringUtils.formatPrice(price) + '&nbsp;' //non breaking space for IE8 workaround
                );
            },

            renderHTML: function () {
                this.render();
                this.setupjQueryEvents();
            },

            setupjQueryEvents: function () {
                var self = this,
                    disclaimerText = jQuery('.vehicle-price .disclaimer');

                this.isClicked = false;

                disclaimerText.css('top', '-' + (disclaimerText.height() + 50) + 'px');

                jQuery('.otr').on('mouseenter', '.disclaimer-button', function () {
                    self.toggleDisclaimer();
                });

                jQuery('.otr').on('mouseout', '.disclaimer-button', function () {
                    self.toggleDisclaimer();
                });

                jQuery('.otr').on('click', '.disclaimer-button', function () {
                    if (disclaimerText.hasClass('disclaimer-hidden') || self.isClicked) {
                        self.toggleDisclaimer();
                        self.isClicked = true;
                    }
                });
            },

            toggleDisclaimer: function () {
                var disclaimer = jQuery('.' + HTMLAttributes.VEHICLE_PRICE_CLASS + ' .disclaimer');

                disclaimer.toggleClass('disclaimer-hidden');
                disclaimer.toggleClass('disclaimer-show');
            }
        },
        {});
});