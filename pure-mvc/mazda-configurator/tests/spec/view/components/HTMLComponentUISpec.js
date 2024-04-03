(function () {
    'use strict';

    describe('HTMLComponentUISpec', function () {

        var ui;

        function setupDOM() {
            jQuery(document.body).append('<div id="' +
                bmc.support.HTMLAttributes.CONFIGURATOR_CONTAINER_ID +
                '"></div>');
        }

        beforeEach(function (done) {

            require([
                'view/components/HTMLComponentUI',
                'support/HTMLAttributes'
            ], function () {
                setupDOM();

                ui = new bmc.view.components.HTMLComponentUI(
                    '.' + bmc.support.HTMLAttributes.DEFAULT_COMPONENT_CLASS,
                    '#' + bmc.support.HTMLAttributes.CONFIGURATOR_CONTAINER_ID);
                done();
            });
        });

        afterEach(function () {
            jQuery('#' + bmc.support.HTMLAttributes.CONFIGURATOR_CONTAINER_ID).remove();
        });

        describe('initialise', function () {
            it('should be defined', function () {
                expect(ui).not.to.be(undefined);
            });
        });

        describe('render', function () {
            var url = './resources/html-templates/simple.html',
                responseText = '<div class="component"><%= name %></div>';

            beforeEach(function () {
                this.server = sinon.fakeServer.create();

                this.server.respondWith('GET', url,
                    [
                        200, { 'Content-Type': 'text/html' },
                        responseText
                    ]);
            });

            afterEach(function () {
                this.server.restore();
            });

            it('should be added to the dom', function () {
                ui.render();

                expect(jQuery('.' + bmc.support.HTMLAttributes.DEFAULT_COMPONENT_CLASS)).not.to.be(undefined);
            });

            it('should be removed from the dom', function () {
                ui.render();

                ui.remove();

                expect(jQuery(ui.getSelector()).html()).to.be(undefined);
            });

            it('should render a template', function () {
                ui.addTemplateHTML('resources/html-templates/simple.html');

                ui.render();

                expect(jQuery(ui.getParentSelector()).html()).to.contain('');
            });

            it('should render a template when passed in the constructor', function () {
                ui = new bmc.view.components.HTMLComponentUI(
                    '.' + bmc.support.HTMLAttributes.DEFAULT_COMPONENT_CLASS,
                    '#' + bmc.support.HTMLAttributes.CONFIGURATOR_CONTAINER_ID,
                    'resources/html-templates/simple.html');

                ui.render();

                expect(jQuery(ui.getParentSelector()).html()).to.contain('');
            });

            it('should render a template through underscore', function () {
                ui = new bmc.view.components.HTMLComponentUI(
                    '.' + bmc.support.HTMLAttributes.DEFAULT_COMPONENT_CLASS,
                    '#' + bmc.support.HTMLAttributes.CONFIGURATOR_CONTAINER_ID,
                    'resources/html-templates/simple.html');

                ui.render({name: 'Ricky'});

                expect(jQuery(ui.getSelector()).html()).to.contain('Ricky');
            });
        });

        describe('identifying', function () {
            it('should return me a way to select this component', function () {
                expect(ui.getSelector()).to.be('.' + bmc.support.HTMLAttributes.DEFAULT_COMPONENT_CLASS);
            });

            it('should return me a way to get its parent selector', function () {
                expect(ui.getParentSelector()).to.be('#' + bmc.support.HTMLAttributes.CONFIGURATOR_CONTAINER_ID);
            });
        });

    });
})();