(function () {
    'use strict';

    describe('VerticalScrollLocker', function () {

        var verticalScroller,
            jQuery = window.jQuery,

            BODY = 'body',
            HANDLE_WINDOW_SCROLL_POSITION_CHANGED = 'handleWindowScrollPositionChanged',
            RESET_WINDOW_SCROLL_POSITION = 'resetWindowScrollPosition',
            DISPATCHUI_LOCK_STATE = 'dispatchUILockState',
            LOCK_POSITION = 270,
            UNLOCKED_POSITION = 40,
            RELATIVE = 'relative',
            TOP_VALUE = '-60px';

        describe('initialise', function () {

            it('should be defined', function () {
                expect(verticalScroller).not.to.be(undefined);
            });

            it('should add scroll listener to the window object', function () {

                verticalScroller.isTouchDevice = function () {
                    return false;
                };

                verticalScroller.initialise();

                var spy = sinon.spy(verticalScroller, HANDLE_WINDOW_SCROLL_POSITION_CHANGED);
                jQuery(window).scroll();
                verticalScroller[HANDLE_WINDOW_SCROLL_POSITION_CHANGED].restore();

                expect(spy.called).to.be(true);
            });

            it('should call resetWindowScrollPosition', function () {

                verticalScroller.isTouchDevice = function () {
                    return false;
                };

                var spy = sinon.spy(verticalScroller, RESET_WINDOW_SCROLL_POSITION);
                verticalScroller.initialise();
                verticalScroller[RESET_WINDOW_SCROLL_POSITION].restore();

                expect(spy.called).to.be(true);
            });

        });

        describe('handleWindowScrollPositionChanged', function () {

            it('should add the locked css class to section and navigation dom Elements/containers ' +
                'when scroll value is above lock threshold', function () {

                setScrollPositionAndCallHandleWindowScrollPositionChanged(LOCK_POSITION);

                expect(doContainersHaveLockedClass()).to.be(true);
            });

            it('should remove the locked css class to section and navigation dom Elements/containers ' +
                'when scroll value is below lock threshold', function () {

                setScrollPositionAndCallHandleWindowScrollPositionChanged(LOCK_POSITION);
                setScrollPositionAndCallHandleWindowScrollPositionChanged(UNLOCKED_POSITION);

                expect(doContainersHaveLockedClass()).to.be(false);
            });
        });


        describe('dispatchUILockState', function () {

            it('should only be called once so long as the scroll value is ABOVE lock threshold', function () {

                var spy = sinon.spy(verticalScroller, DISPATCHUI_LOCK_STATE);

                setScrollPositionAndCallHandleWindowScrollPositionChanged(LOCK_POSITION);
                setScrollPositionAndCallHandleWindowScrollPositionChanged(LOCK_POSITION);
                verticalScroller[DISPATCHUI_LOCK_STATE].restore();

                expect(spy.calledOnce).to.be(true);
            });

            it('should only be called once so long as the scroll value is BELOW lock threshold', function () {

                var spy = sinon.spy(verticalScroller, DISPATCHUI_LOCK_STATE);

                verticalScroller.initialise();
                setScrollPositionAndCallHandleWindowScrollPositionChanged(UNLOCKED_POSITION);
                setScrollPositionAndCallHandleWindowScrollPositionChanged(UNLOCKED_POSITION);
                setScrollPositionAndCallHandleWindowScrollPositionChanged(UNLOCKED_POSITION);
                verticalScroller[DISPATCHUI_LOCK_STATE].restore();

                expect(spy.calledOnce).to.be(true);
            });
        });

        describe('changeDOMElementCSSForFullPageScroll', function () {

            it('should change the css properties of the necessary dom elements to allow the page to scroll normally ' +
                'on touch enabled devices', function () {

                verticalScroller.isTouchDevice = function () {
                    return true;
                };

                verticalScroller.initialise();

                var topNavHTML = jQuery('.' + bmc.support.HTMLAttributes.TOP_NAV_CLASS)[0].outerHTML,
                    vehicleContainerHTML = verticalScroller.vehicleContainer[0].outerHTML,
                    sectionContentUIHTML = verticalScroller.sectionContentUI[0].outerHTML,
                    navigationTabsUIHTML = verticalScroller.navigationTabsUI[0].outerHTML;

                expect(topNavHTML).to.contain(RELATIVE);
                expect(vehicleContainerHTML).to.contain(RELATIVE);
                expect(navigationTabsUIHTML).to.contain(TOP_VALUE);
                expect(sectionContentUIHTML).to.contain(TOP_VALUE);
            });

            it('should only be called once so long as the scroll value is BELOW lock threshold', function () {

                var spy = sinon.spy(verticalScroller, DISPATCHUI_LOCK_STATE);

                verticalScroller.initialise();
                setScrollPositionAndCallHandleWindowScrollPositionChanged(UNLOCKED_POSITION);
                setScrollPositionAndCallHandleWindowScrollPositionChanged(UNLOCKED_POSITION);
                setScrollPositionAndCallHandleWindowScrollPositionChanged(UNLOCKED_POSITION);
                verticalScroller[DISPATCHUI_LOCK_STATE].restore();

                expect(spy.calledOnce).to.be(true);
            });
        });

        beforeEach(function (done) {

            require([
                'view/components/VerticalScrollLocker',
                'support/HTMLAttributes'
            ], function () {
                createDomContainers();
                verticalScroller = new bmc.view.components.VerticalScrollLocker();
                done();
            });
        });

        afterEach(function () {

            jQuery('#' + bmc.support.HTMLAttributes.SECTION_CONTENT_ID).remove();
            jQuery('#' + bmc.support.HTMLAttributes.NAVIGATION_TABS_ID).remove();
        });

        function createDomContainers() {

            var HTMLContainers = '<div id="' + bmc.support.HTMLAttributes.SECTION_CONTENT_ID +
                '" style="display:none"></div>' +
                '<div id="' + bmc.support.HTMLAttributes.NAVIGATION_TABS_ID + '" style="display:none"></div>' +
                '<div class="' + bmc.support.HTMLAttributes.TOP_NAV_CLASS + '" style="display:none"></div>' +
                '<div id="' + bmc.support.HTMLAttributes.VEHICLE_CONTAINER_ID + '" style="display:none"></div>';

            jQuery(BODY).append(HTMLContainers);
        }

        function doContainersHaveLockedClass() {

            var sectionHasLocked = jQuery('#' + bmc.support.HTMLAttributes.SECTION_CONTENT_ID).hasClass(
                    bmc.support.HTMLAttributes.SECTION_CONTENT_LOCKED_CLASS),

                navigationHasLocked = jQuery('#' + bmc.support.HTMLAttributes.NAVIGATION_TABS_ID).hasClass(
                    bmc.support.HTMLAttributes.NAVIGATION_TABS_LOCKED_CLASS);

            return sectionHasLocked && navigationHasLocked;
        }

        function setScrollPositionAndCallHandleWindowScrollPositionChanged(scrollPosition) {
            verticalScroller.currentWindowScrollPosition = scrollPosition;
            verticalScroller.handleWindowScrollPositionChanged();
        }

    });
})();