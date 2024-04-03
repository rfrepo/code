define([
    'jquery',
    'support/GlobalConstants',
    'support/HTMLTemplate',
    'support/HTMLTemplateURL',
    'support/HTMLAttributes',
    'view/components/HTMLComponentUI',
    'view/components/VerticalScrollLocker'
], function () {
    'use strict';
    var HTMLAttributes = arguments[4],
        HTMLComponentUI = arguments[5],
        VerticalScrollLocker = arguments[6];


    return puremvc.define({
            name: 'bmc.view.components.ApplicationUI',
            parent: HTMLComponentUI,
            constructor: function () {
                this.verticalScrollLocker = new VerticalScrollLocker();

                this.isLocked = false;

                this.addViewComponentListeners();

                HTMLComponentUI.call(this, document.body, document.body);
            }
        },
        {
            addViewComponentListeners: function () {
                var self = this,
                    $configuratorVehicle = jQuery('#' + HTMLAttributes.CONFIGURATOR_VEHICLE_ID +
                        ', .' + HTMLAttributes.NAVIGATION_TABS_CLASS +
                        ', .' + HTMLAttributes.RESET_SCROLLING_BUTTON_CLASS),
                    $scrollResetButton = jQuery('.' + HTMLAttributes.RESET_SCROLLING_BUTTON_CLASS);

                function eventHandler(event, eventData) {
                    self.updateScrollResetButtonVisibility(eventData);

                    if (self.onViewScrollUpdated) {
                        self.onViewScrollUpdated(eventData);
                    }
                }

                jQuery(this.getVerticalScrollLocker()).on(
                    VerticalScrollLocker.VIEW_SCROLL_STATE_CHANGED,
                    eventHandler
                );

                $configuratorVehicle.mouseover(function () {
                    if (self.isLocked) {
                        $scrollResetButton.removeClass(HTMLAttributes.BUTTON_HIDDEN_CLASS);
                    }
                });

                $configuratorVehicle.mouseout(function () {
                    $scrollResetButton.addClass(HTMLAttributes.BUTTON_HIDDEN_CLASS);
                });

                $scrollResetButton.click(function () {
                    self.handleScrollResetButtonClick();
                });
            },

            handleScrollResetButtonClick: function () {
                this.isLocked = false;
                this.getVerticalScrollLocker().resetWindowScrollPosition();
                jQuery('.' + HTMLAttributes.RESET_SCROLLING_BUTTON_CLASS).addClass(
                    HTMLAttributes.BUTTON_HIDDEN_CLASS
                );
            },

            updateScrollPosition: function () {
                this.getVerticalScrollLocker().onWindowScrollPositionChanged();
            },

            updateScrollResetButtonVisibility: function (eventData) {
                this.isLocked = eventData === HTMLAttributes.VIEW_LOCKED_CLASS;
            },

            getVerticalScrollLocker: function () {
                return this.verticalScrollLocker;
            },

            handleActiveSectionUpdated: function (sectionVO) {

                this.resetPageScrollPosition(sectionVO);
                this.manageCarouselAndPanelVisibility(sectionVO);
            },

            resetPageScrollPosition: function (sectionVO) {

                var previouslyActiveSection = sectionVO.getPreviouslyActiveSection;

                if (previouslyActiveSection !== bmc.support.GlobalConstants.SUMMARY) {
                    this.getVerticalScrollLocker().resetWindowScrollPosition();
                }
            },

            manageCarouselAndPanelVisibility: function (sectionVO) {

                var carousel = jQuery('#' + HTMLAttributes.CA_CONTAINER),
                    panel = jQuery('#' + HTMLAttributes.OPTION_PACK_AND_ACCESSORIES);

                if (sectionVO.type !== bmc.support.ConfigurableType.ACCESSORIES) {
                    carousel.show();
                    panel.hide();
                } else {
                    carousel.hide();
                    panel.show();
                }
            },


            initialise: function () {
                this.getVerticalScrollLocker().initialise();
            },

            showSummary: function () {

                jQuery('.' + HTMLAttributes.NAVIGATION_TABS_CLASS).addClass(HTMLAttributes.SUMMARY_CLASS);
                jQuery('.' + HTMLAttributes.SECTION_CONTENT_CLASS).addClass(HTMLAttributes.SUMMARY_CLASS);
            },

            hideSummary: function () {

                jQuery('.' + HTMLAttributes.NAVIGATION_TABS_CLASS).removeClass(HTMLAttributes.SUMMARY_CLASS);
                jQuery('.' + HTMLAttributes.SECTION_CONTENT_CLASS).removeClass(HTMLAttributes.SUMMARY_CLASS);
            }
        },
        {});
});