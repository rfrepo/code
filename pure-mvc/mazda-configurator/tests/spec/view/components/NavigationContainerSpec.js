(function () {
    'use strict';

    describe('NavigationContainer', function () {

        var ui,
            RENDER = 'render';
        //DISPATCH_ITEM_SELECTED = 'dispatchItemSelected';

        describe('initialise', function () {

            it('should be defined', function () {
                expect(ui).not.to.be(undefined);
            });

            it('should set basic selector for this component', function () {
                expect(ui.getSelector()).to.equal('#' + bmc.support.HTMLAttributes.NAVIGATION_CONTAINER_ID);
            });
        });

        describe('setData', function () {

            it('should call render when data is set NC', function () {

                var renderFunction = ui.render,
                    spy;

                ui.render = function () {
                };

                spy = sinon.spy(ui, RENDER);
                ui.setData([]);

                expect(spy.called).to.be(true);

                ui[RENDER].restore();
                ui.render = renderFunction;
            });
        });

        beforeEach(function (done) {

            require([
                'view/components/NavigationContainer',
                'support/HTMLAttributes'
            ], function () {

                ui = new bmc.view.components.NavigationContainer(
                    '#' + bmc.support.HTMLAttributes.NAVIGATION_CONTAINER_ID);
                done();
            });
        });

    });
})();