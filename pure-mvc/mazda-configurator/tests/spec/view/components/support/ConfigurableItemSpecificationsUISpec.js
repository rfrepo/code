(function () {
    'use strict';
    describe('ConfigurableItemSpecificationsUI', function () {

        var configurableItemSpecificationsUI,
            facade,

            LEFT_POSITION = 0,
            CURRENT_INDEX = 1,
            CONTAINER_ID = 'container',
            HEADER_TITLE = 'Performance and Economy',
            ROW_TITLE = 'row title',
            HTML_FROM_GRADE_TEMPLATE = '<span class="dot"></span>';

        describe('class should exist ', function () {

            it('should instance ConfigurableItemSpecificationsUI', function () {
                expect(configurableItemSpecificationsUI).not.to.be(undefined);
            });
        });

        describe('Rendering data', function () {

            describe('The table accordion requires a cell render template is provided to enable it to complete ' +
                'the rendering of data',
                function () {

                    it('should render 2 tables tables to the dom', function () {

                        configurableItemSpecificationsUI.setCellRendererTemplateURL(
                            bmc.support.HTMLTemplateURL.GRADE_ROW_ACCORDION);
                        configurableItemSpecificationsUI.render(createMockData());

                        var renderedHTML = jQuery('#' + CONTAINER_ID).html();

                        expect(jQuery('table').length).to.be(2);
                        expect(renderedHTML).to.contain(HEADER_TITLE);
                        expect(renderedHTML).to.contain(HTML_FROM_GRADE_TEMPLATE);
                    });

                    it('should throw an error if render is called and cell renderer has not been set', function () {
                        expect(configurableItemSpecificationsUI.render).to.throwError();
                    });
                });
        });

        describe('ScrollTo', function () {

            it('should move the left property of all target tables', function (done) {

                configurableItemSpecificationsUI.setCellRendererTemplateURL(
                    bmc.support.HTMLTemplateURL.GRADE_ROW_ACCORDION);
                configurableItemSpecificationsUI.render(createMockData());

                var scrollTarget = jQuery(configurableItemSpecificationsUI.scrollTargets[0]);
                scrollTarget.css('position', 'relative');

                configurableItemSpecificationsUI.scrollTo(createUpdateData());

                setTimeout(function () {

                    expect(scrollTarget[0].outerHTML).to.contain(-237);
                    done();

                }, 600);
            });

        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                createFacade();
                createConfigurableItemSpecificationsUI();
                createDOMContainer();
                done();
            });
        });

        afterEach(function () {
            jQuery('#' + CONTAINER_ID).remove();
        });

        function getDependencies() {
            return [
                'view/components/support/ConfigurableItemSpecificationsUI',
                'support/HTMLTemplateURL'
            ];
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createConfigurableItemSpecificationsUI() {
            configurableItemSpecificationsUI =
                new bmc.view.components.support.ConfigurableItemSpecificationsUI('#' + CONTAINER_ID);
        }

        function createMockData() {
            return {
                sections: [sectionData()]
            };
        }

        function sectionData() {

            return {
                'title': HEADER_TITLE,
                'table': {
                    'rows': [
                        rowData(1),
                        rowData(2),
                        rowData(3),
                        rowData(4),
                        rowData(5)
                    ]
                }
            };
        }

        function rowData(titleValue) {

            return {
                'title': ROW_TITLE + titleValue,
                'values': [ 1, 2, 3, 4]
            };
        }

        function createDOMContainer() {
            jQuery('body').append('<div id=' + CONTAINER_ID + ' style="display:none"></div>');
        }

        function createUpdateData() {
            return { currentPosition: LEFT_POSITION, currentPositionIndex: CURRENT_INDEX };
        }
    });
})();
