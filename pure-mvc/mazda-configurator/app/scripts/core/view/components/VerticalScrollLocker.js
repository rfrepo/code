define(['support/HTMLAttributes'], function () {
    'use strict';
    var HTMLAttributes = arguments[0];

    return puremvc.define({
            name: 'bmc.view.components.VerticalScrollLocker',
            constructor: function () {

                this.vehicleContainer = jQuery('#' + HTMLAttributes.VEHICLE_CONTAINER_ID);
                this.sectionContentUI = jQuery('#' + HTMLAttributes.SECTION_CONTENT_ID);
                this.navigationTabsUI = jQuery('#' + HTMLAttributes.NAVIGATION_TABS_ID);

                this.vehicleContainertLockedClass = HTMLAttributes.VEHICLE_CONTAINER_LOCKED_CLASS;
                this.sectionContentLockedClass = HTMLAttributes.SECTION_CONTENT_LOCKED_CLASS;
                this.navigationTabsLockedClass = HTMLAttributes.NAVIGATION_TABS_LOCKED_CLASS;
            }
        },
        {
            initialise: function () {
                if (this.isTouchDevice()) {
                    this.changeDOMElementCSSForFullPageScroll();
                } else {
                    this.addWindowScrollListener();
                    this.resetWindowScrollPosition();
                }
            },

            changeDOMElementCSSForFullPageScroll: function () {

                jQuery('.' + HTMLAttributes.TOP_NAV_CLASS).css(
                    this.constructor.POSITION, this.constructor.RELATIVE);
                this.vehicleContainer.css(this.constructor.POSITION, this.constructor.RELATIVE);
                this.sectionContentUI.css(this.constructor.TOP, this.constructor.TOP_VALUE);
                this.navigationTabsUI.css(this.constructor.TOP, this.constructor.TOP_VALUE);
            },

            isTouchDevice: function () {
                return Boolean((typeof(window.ontouchstart) !== 'undefined'));
            },

            addWindowScrollListener: function () {

                var self = this;

                jQuery(window).scroll(function () {
                    self.onWindowScrollPositionChanged();
                });
            },

            resetWindowScrollPosition: function () {
                jQuery(this.constructor.BODY + ', ' + this.constructor.HTML).animate(
                    {scrollTop: this.constructor.DEFAULT_SCROLL_TOP_VALUE}, this.constructor.ANIMATION_INTERVAL);
            },

            determineScrollStateBasedOnCurrentWindowScrollPosition: function () {
                if (this.isWindowScrollPositionIsGreaterThanContentScrollLockPosition()) {
                    this.lockView();
                }
                else {
                    this.unlockView();
                }
            },

            onWindowScrollPositionChanged: function () {
                this.setCurrentWindowScrollPosition(jQuery(window).scrollTop());
                this.handleWindowScrollPositionChanged();
            },

            handleWindowScrollPositionChanged: function () {
                if (this.isWindowScrollPositionIsGreaterThanContentScrollLockPosition() &&
                    this.currentViewStateIsNot(this.constructor.VIEW_LOCKED)) {
                    this.lockView();
                }
                else if (this.isWindowScrollPositionIsLessThanContentScrollLockPosition() &&
                    this.currentViewStateIsNot(this.constructor.VIEW_UNLOCKED)) {
                    this.unlockView();
                }
                else if (this.isWindowScrollPositionIsLessThanContentScrollLockPosition() &&
                    this.getCurrentViewState() === this.constructor.VIEW_UNLOCKED) {
                    this.setScaleOfVehicle(this.calculateScaleSizeOfVehicle());
                }
            },

            calculateScaleSizeOfVehicle: function () {
                var scale = 1 + ((this.currentWindowScrollPosition * -0.5) /
                    this.constructor.SECTION_CONTENT_SCROLL_LOCK_POSITION);

                if (scale >= 1) {
                    return 1;
                } else if (scale <= 0.5) {
                    return 0.5;
                } else {
                    return scale;
                }
            },

            setScaleOfVehicle: function (scale) {
                var ui = jQuery('#vehicleDisplay');
                ui.css('transform', 'scale(' + scale + ',' + scale + ')');
                ui.css('-o-transfrom', 'scale(' + scale + ',' + scale + ')');
                ui.css('-moz-transform', 'scale(' + scale + ',' + scale + ')');
                ui.css('-webkit-transform', 'scale(' + scale + ',' + scale + ')');
                ui.css('-ms-transform', 'scale(' + scale + ',' + scale + ')');
            },

            lockView: function () {
                this.setCurrentViewState(this.constructor.VIEW_LOCKED);

                this.vehicleContainer.addClass(this.vehicleContainertLockedClass);
                this.sectionContentUI.addClass(this.sectionContentLockedClass);
                this.navigationTabsUI.addClass(this.navigationTabsLockedClass);

                this.dispatchUILockState(this.constructor.VIEW_LOCKED);
            },

            unlockView: function () {
                this.setCurrentViewState(this.constructor.VIEW_UNLOCKED);

                this.vehicleContainer.removeClass(this.vehicleContainertLockedClass);
                this.sectionContentUI.removeClass(this.sectionContentLockedClass);
                this.navigationTabsUI.removeClass(this.navigationTabsLockedClass);

                this.dispatchUILockState(this.constructor.VIEW_UNLOCKED);
            },

            dispatchUILockState: function (lockState) {
                jQuery(this).trigger(this.constructor.VIEW_SCROLL_STATE_CHANGED, lockState);
            },

            setCurrentWindowScrollPosition: function (value) {
                this.currentWindowScrollPosition = value;
            },

            isWindowScrollPositionIsLessThanContentScrollLockPosition: function () {
                return this.currentWindowScrollPosition < this.constructor.SECTION_CONTENT_SCROLL_LOCK_POSITION;
            },

            isWindowScrollPositionIsGreaterThanContentScrollLockPosition: function () {
                return this.currentWindowScrollPosition > this.constructor.SECTION_CONTENT_SCROLL_LOCK_POSITION;
            },

            setCurrentViewState: function (value) {
                this.currentViewState = value;
            },

            getCurrentViewState: function () {
                return this.currentViewState;
            },

            currentViewStateIsNot: function (state) {
                return this.getCurrentViewState() !== state;
            }
        },
        {
            SECTION_CONTENT_SCROLL_LOCK_POSITION: 240,
            VIEW_LOCKED: 'view-locked',
            VIEW_UNLOCKED: 'view-unlocked',
            VIEW_SCROLL_STATE_CHANGED: 'state-changed',
            ANIMATION_INTERVAL: 400,
            TOP: 'top',
            TOP_VALUE: '-60px',
            POSITION: 'position',
            RELATIVE: 'relative',
            DEFAULT_SCROLL_TOP_VALUE: 0,
            BODY: 'body',
            HTML: 'html'
        });
})
;