(function () {
    'use strict';
    describe('ModelSelectorUI', function () {
        var modelSelectorUI,
            targetDomElement,
            jQuery = window.jQuery;

        describe('initialize', function () {

            it('should be defined', function () {
                expect(modelSelectorUI).not.to.be(undefined);
            });
        });

        describe('has a set data method to save model_thumnbnail value object', function () {

            it('should call set data method', function () {

                var spy = sinon.spy(modelSelectorUI, 'setData');
                modelSelectorUI.setData({});
                expect(spy.called).to.be(true);
                modelSelectorUI.setData.restore();
            });
        });

        describe('creates dom elements ( buttons ) based on model_thumnbnail data', function () {

            it('should call create model select buttons method', function () {

                var spy = sinon.spy(modelSelectorUI, 'createModelSelectButtons');
                modelSelectorUI.createModelSelectButtons();
                expect(spy.called).to.be(true);
                modelSelectorUI.createModelSelectButtons.restore();
            });

            it('should add model_thumnbnail data index to button', function () {

                var modelButton = modelSelectorUI.geModelButtons(),
                    buttonDataIndex = Number(modelButton[0].getAttribute('data-index'));
                expect(buttonDataIndex).to.be(0);
            });

            it('button click event should call dispatchModelSelectedEvent with model_thumnbnail data vo', function () {

                var spy = sinon.spy(modelSelectorUI, 'dispatchModelSelectedEvent'),
                    modelButton = getButtonModelButton();

                jQuery(modelButton).click();

                expect(spy.args[0][0]).to.be(modelSelectorUI.modelsData[0]);

                modelSelectorUI.dispatchModelSelectedEvent.restore();
            });

        });

        describe('each button should dispatch associated data value object', function () {

            it('should dispatch model selected event', function () {

                var eventDispatched = false;

                jQuery(modelSelectorUI).on(getModelSelectedEventName(), function () {
                    eventDispatched = true;
                });

                modelSelectorUI.dispatchModelSelectedEvent();

                expect(eventDispatched).to.be(true);

            });
        });


        beforeEach(function (done) {

            require(getDependencies(), function () {

                targetDomElement = createDomTargetContainer();
                createModelSelectorUI();
                modelSelectorUI.setData(createMockData());
                done();
            });
        });

        afterEach(function () {
            targetDomElement.remove();
        });

        function getDependencies() {
            return ['view/components/ModelSelectorUI'];
        }

        function createModelSelectorUI() {
            modelSelectorUI = new bmc.view.components.ModelSelectorUI(targetDomElement);
        }

        function getModelSelectedEventName() {
            return bmc.view.components.ModelSelectorUI.MODEL_SELECTED;
        }

        function createDomTargetContainer() {
            return jQuery('<div></div>');
        }

        function createMockData() {
            return [
                {
                    'getModelId': function () {
                        return 'M6';
                    },
                    'getModelName': function () {
                        return 'All-new Mazda6';
                    },
                    'getStartingPrice': function () {
                        return '19,595';
                    },
                    'getBodyStyles': function () {
                        return ['Saloon', 'Tourer'];
                    },
                    'getModelImage': function () {
                        return 'm6.png';
                    }
                }
            ];
        }

        function getButtonModelButton() {
            return jQuery(targetDomElement).find('> .content > .model-button');
        }
    });
})();

