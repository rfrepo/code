define(['support/HTMLAttributes'], function () {
    'use strict';
    var HTMLAttributes = arguments[0];

    return puremvc.define({ name: 'bmc.support.Accordion' },
        {},
        {
            setupAccordion: function (opts) {
                var accordionContainer = jQuery('.' + HTMLAttributes.ACCORDION_CLASS),
                    accordionCells = accordionContainer.children('.accordion-header + div'),
                    accordionHeaders = accordionContainer.children('.accordion-header');

                opts = opts === undefined ? {active: false} : opts;

                accordionCells.hide();

                if (opts.active) {
                    jQuery(accordionCells[0]).show().prev().addClass(HTMLAttributes.ACCORDION_ACTIVE_CLASS);
                }

                accordionHeaders.prepend('<span class="ui-accordion-header-icon"></span>');

                accordionContainer.on('click', 'h3', jQuery.proxy(this.toggleSingleAccordionElement, this));
                accordionContainer.on('click', '.expand-all', accordionContainer,
                    jQuery.proxy(this.toggleExpandAllElements, this));
            },

            toggleSingleAccordionElement: function (event) {
                this.alignWithAccordionElement(event.currentTarget);
                this.toggleAccordionElement(event.currentTarget);
            },

            toggleAccordionElement: function (accordionHeader) {
                jQuery(accordionHeader).toggleClass(HTMLAttributes.ACCORDION_ACTIVE_CLASS);
                jQuery(accordionHeader).next().slideToggle('1000');
            },

            alignWithAccordionElement: function (element) {
                jQuery('html, body').animate({scrollTop: jQuery(element).offset().top - 450}, 400);
            },

            toggleExpandAllElements: function (event) {
                var accordionContainer = event.data,
                    accordionHeaders = accordionContainer.children('.accordion-header');

                this.alignWithAccordionElement(accordionHeaders[0]);

                if (jQuery(event.target).hasClass('collapse-all')) {
                    jQuery(accordionHeaders).each(function (index) {
                        if (jQuery(accordionHeaders[index]).hasClass(HTMLAttributes.ACCORDION_ACTIVE_CLASS)) {
                            this.toggleAccordionElement(accordionHeaders[index]);
                        }
                    });
                } else {
                    jQuery(accordionHeaders).each(function (index) {
                        if (!jQuery(accordionHeaders[index]).hasClass(HTMLAttributes.ACCORDION_ACTIVE_CLASS)) {
                            this.toggleAccordionElement(accordionHeaders[index]);
                        }
                    });
                }

                jQuery(event.target).toggleClass('collapse-all');
            }
        })
        ;
})
;
