(function () {
    'use strict';

    var USER_AGENT_WARNING = 'PLEASE RUN CarouselSpec in the HTML spec runnner not ' + navigator.userAgent;

    describe('Carousel', function () {

        var carousel,
            jQuery = window.jQuery,

            BODY = 'body',

            DISPLAY_ITEMS = 3,
            EXPECTED_NUMBER_OF_LIST_ITEMS = 6,
            LIST_ITEM_WIDTH = 100,
            EXPECTED_NUMBER_OF_POSITIONS = 4,

            NAV_CLASS = 'option-nav',
            CAROUSEL_TARGET_ID = 'carousel',
            NEXT_UI_ID = 'nav-next',
            PREVIOUS_UI_ID = 'nav-prev',
            CSS_DISPLAY_NONE = 'display: none;',

            DISPATCH_EVENT = 'dispatchEvent',

            DIRECTION_NEXT = 1,
            DIRECTION_PREVIOUS = -1;

        describe('command class should exist ', function () {

            it('should be instance Carousel', function () {
                expect(carousel).not.to.be(undefined);
            });
        });

        describe('initialisation ', function () {

            it('should not initialise if content cannot be scrollled, expect the navigation buttons ' +
                'not to be visible', function () {

                carousel.itemsInView = 6;
                carousel.initialise();

                var nextUICSS = carousel.nextUI[0].outerHTML,
                    previousUICSS = carousel.previousUI[0].outerHTML;

                expect(nextUICSS).to.contain(CSS_DISPLAY_NONE);
                expect(previousUICSS).to.contain(CSS_DISPLAY_NONE);
            });

            it('should retrieve an array of list elements from the dom passed in dom id', function () {
                expect(carousel.targetUIChildren.length).to.be(EXPECTED_NUMBER_OF_LIST_ITEMS);
            });

            it('should retrieve the first list items width value', function () {
                expect(carousel.targetUIChildWidth).to.be(LIST_ITEM_WIDTH);
            });

            it('should create a positions array', function () {
                expect(carousel.positions.length).to.be(EXPECTED_NUMBER_OF_POSITIONS);
            });

            it('should set currentPositionIndex', function () {
                expect(carousel.currentPositionIndex).not.to.be(undefined);
            });
        });

        describe('directionDetected ', function () {

            describe('updateCurrentPositionIndex ', function () {

                describe('incrementCurrentPositionIndex ', function () {

                    it('should increment currentPositionIndex', function () {

                        carousel.directionDetected(DIRECTION_NEXT);
                        expect(carousel.currentPositionIndex).to.be(1);
                    });

                    it('should not increment currentPositionIndex the carousel is showing the last element',
                        function () {

                            gotoToLastElementInCarousel();

                            carousel.directionDetected(DIRECTION_NEXT);

                            expect(carousel.currentPositionIndex).to.be(3);
                        });
                });

                describe('decrementCurrentPositionIndex', function () {

                    it('should decrement currentPositionIndex', function () {

                        carousel.directionDetected(DIRECTION_NEXT);

                        carousel.directionDetected(DIRECTION_PREVIOUS);

                        expect(carousel.currentPositionIndex).to.be(0);
                    });

                    it('should not decrement currentPositionIndex carousel is showing the first element',
                        function () {

                            gotoToFirstElementInCarousel();
                            expect(carousel.currentPositionIndex).to.be(0);
                        });
                });

                describe('dispatchEvent', function () {

                    it('should dispatch an event containing the carousel\'s current position and position index',
                        function () {

                            var spy = sinon.spy(carousel, DISPATCH_EVENT);

                            carousel.directionDetected(DIRECTION_NEXT);

                            carousel[DISPATCH_EVENT].restore();

                            expect(spy.called).to.be(true);
                        });
                });
            });

            describe('updateUIViewState', function () {

                describe('updateNavigationViewState', function () {

                    describe('toggleNextUIVisibility', function () {

                        it('should hide nextUI when the current position index equal to the number of ' +
                            'available positions ', function () {

                            gotoToLastElementInCarousel();

                            var uiCSS = carousel.nextUI[0].outerHTML;

                            expect(uiCSS).to.contain(CSS_DISPLAY_NONE);

                        });

                        it('should show nextUI when no more options are available and previous is selected',
                            function () {

                                gotoToLastElementInCarousel();
                                carousel.directionDetected(DIRECTION_PREVIOUS);

                                var uiCSS = carousel.nextUI[0].outerHTML;

                                expect(uiCSS).not.to.be(CSS_DISPLAY_NONE);

                            });
                    });

                    describe('togglePreviousUIVisibility', function () {

                        it('should hide previousUI when no previous positions are available', function () {

                            gotoToFirstElementInCarousel();

                            var uiCSS = carousel.previousUI[0].outerHTML;

                            expect(uiCSS).to.contain(CSS_DISPLAY_NONE);
                        });

                        it('should show previousUI when previous positions are available', function () {

                            gotoToFirstElementInCarousel();
                            carousel.directionDetected(DIRECTION_NEXT);

                            var uiCSS = carousel.previousUI[0].outerHTML;

                            expect(uiCSS).not.to.be(CSS_DISPLAY_NONE);
                        });
                    });
                });
            });


            if (navigator.userAgent.indexOf('Phantom') !== -1) {
                console.log(USER_AGENT_WARNING);
            }
            else {

                describe('updateTargetsChildrenViewState', function () {

                    it('should fadeout the last 3 items in carousel because they are outside the carousel\'s ' +
                        'set viewable area',
                        function (done) {

                            this.timeout(3000);

                            var opacity = 0.5,
                                item1 = carousel.targetUIChildren[5],
                                item2 = carousel.targetUIChildren[4],
                                item3 = carousel.targetUIChildren[3];

                            setTimeout(function () {

                                expect(item1.outerHTML).to.contain(opacity);
                                expect(item3.outerHTML).to.contain(opacity);
                                expect(item2.outerHTML).to.contain(opacity);

                                done();
                            }, 1500);
                        });

                    it('should fadeout the first items in carousel because they are outside the carousel\'s ' +
                        'set viewable area',
                        function (done) {

                            this.timeout(3000);

                            var opacity = 0.5,
                                item1 = carousel.targetUIChildren[0],
                                item2 = carousel.targetUIChildren[5],
                                item3 = carousel.targetUIChildren[4];

                            carousel.directionDetected(DIRECTION_NEXT);

                            setTimeout(function () {

                                expect(item1.outerHTML).to.contain(opacity);
                                expect(item3.outerHTML).to.contain(opacity);
                                expect(item2.outerHTML).to.contain(opacity);
                                done();
                            }, 2500);
                        });
                });


                describe('move ', function () {

                    it('should move the carousel\'s left offset to a position specified in the positions array',
                        function (done) {

                            carousel.directionDetected(DIRECTION_NEXT);

                            var expectedPositionValue = carousel.positions[carousel.currentPositionIndex];

                            setTimeout(function () {

                                expect(carousel.targetUI[0].outerHTML).to.contain(expectedPositionValue);
                                done();

                            }, 600);
                        });
                });

                describe('moveSelectedElementIntoViewableArea', function () {

                    it('should move the selected carousel item into the viewable area when the carousel showing ' +
                        'the first set of items',
                        function () {

                            carousel.moveSelectedElementIntoViewableArea(jQuery(carousel.targetUIChildren[4]));
                            expect(carousel.currentPositionIndex).to.be(2);
                        });

                    it('should move the selected carousel item into the viewable area when the carousel showing ' +
                        'the last set of items',
                        function (done) {

                            gotoToLastElementInCarousel();

                            carousel.moveSelectedElementIntoViewableArea(jQuery(carousel.targetUIChildren[1]));
                            expect(carousel.currentPositionIndex).to.be(1);
                            done();

                        });
                });
            }
        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createNavigationButtons();
                createListContainer();
                createCarousel();
                carousel.initialise();
                done();
            });
        });

        afterEach(function () {
            jQuery('#' + CAROUSEL_TARGET_ID).remove();
            jQuery('.' + NAV_CLASS).remove();
        });

        function getDependencies() {
            return [
                'view/components/support/Carousel'
            ];
        }

        function createCarousel() {
            carousel = new bmc.view.components.support.Carousel('#' + CAROUSEL_TARGET_ID, DISPLAY_ITEMS);
        }

        function gotoToLastElementInCarousel() {

            carousel.directionDetected(DIRECTION_NEXT);
            carousel.directionDetected(DIRECTION_NEXT);
            carousel.directionDetected(DIRECTION_NEXT);
            carousel.directionDetected(DIRECTION_NEXT);
        }

        function gotoToFirstElementInCarousel() {

            carousel.directionDetected(DIRECTION_PREVIOUS);
            carousel.directionDetected(DIRECTION_PREVIOUS);
            carousel.directionDetected(DIRECTION_PREVIOUS);
            carousel.directionDetected(DIRECTION_PREVIOUS);
        }

        function createListContainer() {

            var listHTML = '<ul id="' + CAROUSEL_TARGET_ID + '"' +
                'style="display:block; margin: 0; padding: 0; position: relative; ">' +

                getLiHTML(1) +
                getLiHTML(2) +
                getLiHTML(3) +
                getLiHTML(4) +
                getLiHTML(5) +
                getLiHTML(6) +

                '</ul>';

            jQuery(BODY).append(listHTML);
        }

        function createNavigationButtons() {

            var buttonHTML = '<nav class="' + NAV_CLASS + '">' +
                '<span class="' + PREVIOUS_UI_ID + '" style="display: none;">Previous</span>' +
                '<span class="' + NEXT_UI_ID + '" style="display: none;">Next</span>' +
                '</nav>';


            jQuery(BODY).append(buttonHTML);
        }

        function getLiHTML() {
            return '<li style="display: inline-block; text-align: center; height: 100%; ' +
                ' position: relative; width:' + LIST_ITEM_WIDTH + 'px; ' +
                '/*height:50px; background-color: #cecece;"*/></li>';
        }

    });
})();
