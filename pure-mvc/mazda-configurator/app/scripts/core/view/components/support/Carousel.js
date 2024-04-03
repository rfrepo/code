define(['support/HTMLAttributes'], function () {
    'use strict';
    var HTMLAttributes = arguments[0];

    return puremvc.define({
            name: 'bmc.view.components.support.Carousel',
            constructor: function (targetContainerId, itemsInView) {
                this.itemsInView = itemsInView;
                this.targetUI = jQuery(targetContainerId);
            }
        },
        {
            initialise: function () {

                this.setButtonUIComponents();
                this.setInitialVariables();
                this.determineState();
            },

            setButtonUIComponents: function () {

                this.previousUI = jQuery('.' + HTMLAttributes.CAROUSEL_PREVIOUS_BUTTON_CLASS);
                this.nextUI = jQuery('.' + HTMLAttributes.CAROUSEL_NEXT_BUTTON_CLASS);
            },

            setInitialVariables: function () {

                this.targetUIChildren = jQuery(this.targetUI[0]).find(this.constructor.TARGET_CHILD_TAG_NAME);

                this.setChildrenIndexes();
                this.targetUIChildWidth = jQuery(this.targetUIChildren[0]).width();

                this.currentPositionIndex = 0;

                this.determineTargetChildrenOpacityEffect();
            },

            setChildrenIndexes: function () {

                var self = this;

                this.targetUIChildren.each(function (index) {
                    jQuery(this).data(self.constructor.POSITION_INDEX, index);
                });
            },

            determineState: function () {

                if (this.isContentScrollable()) {
                    this.activate();

                } else {
                    this.deactivate();
                }
            },

            activate: function () {

                this.positions = this.createScrollPositions();
                this.removePreviousListeners();
                this.setupButtonListeners();
                this.updateNavigationViewState();
                this.updateTargetsChildrenViewState();
            },

            deactivate: function () {

                this.nextUI.hide();
                this.previousUI.hide();
                this.removePreviousListeners();
            },

            isContentScrollable: function () {
                return this.itemsInView < this.targetUIChildren.length;
            },

            createScrollPositions: function () {

                var i,
                    initialPosition = this.targetUI.position().left,
                    positions = [initialPosition],
                    totalPositions = this.targetUIChildren.length - (this.itemsInView - 1);

                for (i = 1; i < totalPositions; i++) {
                    positions.push(positions[i - 1] - (this.targetUIChildWidth));
                }

                return positions;
            },

            removePreviousListeners: function () {

                this.nextUI.off(this.constructor.CLICK);
                this.previousUI.off(this.constructor.CLICK);
                this.targetUI.undelegate(this.constructor.TARGET_CHILD_TAG_NAME, this.constructor.CLICK);
            },

            setupButtonListeners: function () {

                var self = this,
                    navClickHandler = function (event) {

                        var direction = (event.target === self.nextUI[0] ||
                            event.target.parentNode === self.nextUI[0]) ?
                            self.constructor.NEXT_VALUE : self.constructor.PREVIOUS_VALUE;
                        self.directionDetected(direction);
                    },

                    listClickHandler = function (event) {
                        self.moveSelectedElementIntoViewableArea(jQuery(event.currentTarget));
                    };

                this.previousUI.click(navClickHandler);
                this.nextUI.click(navClickHandler);
                this.targetUI.delegate(
                    this.constructor.TARGET_CHILD_TAG_NAME, this.constructor.CLICK, listClickHandler);
            },

            directionDetected: function (direction) {

                var oldPositionIndex = this.currentPositionIndex;

                this.updateCurrentPositionIndex(direction);

                if (this.currentPositionIndex !== oldPositionIndex) {

                    this.updateUIViewState();
                }
            },

            updateUIViewState: function () {

                this.dispatchEvent();
                this.updateNavigationViewState();
                this.updateTargetsChildrenViewState();
                this.move();
            },

            updateNavigationViewState: function () {

                this.toggleNextUIVisibility();
                this.togglePreviousUIVisibility();
            },

            updateCurrentPositionIndex: function (direction) {

                if (direction === 1) {
                    this.incrementCurrentPositionIndex();
                }
                else {
                    this.decrementCurrentPositionIndex();
                }
            },

            incrementCurrentPositionIndex: function () {

                if ((this.currentPositionIndex + 1) !== this.positions.length) {
                    this.currentPositionIndex += 1;
                }
            },

            decrementCurrentPositionIndex: function () {

                if ((this.currentPositionIndex - 1) !== -1) {
                    this.currentPositionIndex -= 1;
                }
            },

            togglePreviousUIVisibility: function () {

                if (this.currentPositionIndex !== 0) {
                    this.previousUI.show();
                }
                else {
                    this.previousUI.hide();
                }
            },

            toggleNextUIVisibility: function () {

                if (this.currentPositionIndex !== this.positions.length - 1) {
                    this.nextUI.show();
                }
                else {
                    this.nextUI.hide();
                }
            },

            move: function () {

                var position = this.positions[this.currentPositionIndex];
                this.targetUI.stop(true, true);
                this.targetUI.animate({left: position}, 350, this.constructor.EASING_SWING);
            },

            updateTargetsChildrenViewState: function () {

                var self = this;

                this.targetUIChildren.each(function () {

                    var element = jQuery(this),
                        isInViewableArea = self.isElementInViewableArea(element);
                    element.stop(true, true);
                    element.animate({opacity: isInViewableArea ? 1 : 0.5}, 350, this.constructor.EASING_LINEAR);
                });
            },

            isElementInViewableArea: function (element) {

                var childIndex = element.data(this.constructor.POSITION_INDEX);
                return (childIndex >= this.currentPositionIndex) &&
                    (childIndex <= (this.currentPositionIndex + (this.itemsInView - 1)));
            },

            moveSelectedElementIntoViewableArea: function (element) {

                if (this.isElementInViewableArea(element)) {
                    return;
                }

                if (this.isElementOnTheLeftOfViewableArea(element)) {
                    this.currentPositionIndex = this.getPositionIndexWhenElementIsOnTheLeft(element);
                }
                else {
                    this.currentPositionIndex = this.getPositionIndexWhenElementIsOnTheRight(element);
                }

                this.updateUIViewState();
            },

            isElementOnTheLeftOfViewableArea: function (element) {
                return (element.data(this.constructor.POSITION_INDEX) < this.currentPositionIndex);
            },

            getPositionIndexWhenElementIsOnTheLeft: function (element) {

                var childIndex = element.data(this.constructor.POSITION_INDEX);
                return this.currentPositionIndex - (this.currentPositionIndex - childIndex);
            },

            getPositionIndexWhenElementIsOnTheRight: function (element) {

                var childIndex = element.data(this.constructor.POSITION_INDEX) + 1;
                return this.currentPositionIndex + (childIndex - (this.currentPositionIndex + this.itemsInView));
            },

            dispatchEvent: function () {

                var currentPositionIndex = this.currentPositionIndex,
                    currentPosition = this.positions[currentPositionIndex];

                jQuery(this).trigger(this.constructor.UPDATED,
                    {currentPositionIndex: currentPositionIndex, currentPosition: currentPosition });
            },

            determineTargetChildrenOpacityEffect: function () {

                var PlatformDetector = bmc.support.PlatformDetector;

                if (PlatformDetector.isUserAgent(PlatformDetector.MSIE_8)) {
                    this.updateTargetsChildrenViewState = function () {
                    };
                }
            }
        },
        {
            TARGET_CHILD_TAG_NAME: 'li',
            EASING_LINEAR: 'linear',
            EASING_SWING: 'swing',
            CLICK: 'click',
            POSITION_INDEX: 'positionIndex',
            NEXT_VALUE: 1,
            PREVIOUS_VALUE: -1,
            UPDATED: 'updated'
        });
});
