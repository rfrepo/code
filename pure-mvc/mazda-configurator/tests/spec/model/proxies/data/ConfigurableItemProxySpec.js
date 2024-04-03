(function () {
    'use strict';
    describe('ConfigurableItemProxy', function () {

        var proxy,
            TEST_DISCLAIMER = 'test disclaimer',
            facade;

        beforeEach(function (done) {
            require(getDependencies(), function () {
                var ConfigurableType = bmc.support.ConfigurableType,
                    type = ConfigurableType.BODYSTYLE;

                resetGlobalConfig();

                proxy = new bmc.model.proxy.data.ConfigurableItemProxy(type,
                    ConfigurableType.getDataKey(type),
                    ConfigurableType.getTypeVO(type));

                facade = puremvc.Facade.getInstance(new Date().getTime());

                facade.registerProxy(proxy);
                proxy.facade = facade;

                populateProxy();

                done();
            });
        });

        describe('initializing', function () {

            it('should be initialised', function () {
                expect(proxy).not.to.be(undefined);
            });
        });

        describe('retrieving data', function () {

            it('should return null if an item cannot be found with the matching id', function () {
                expect(proxy.getById('ricky')).to.be(null);
            });

            it('should return the correct vo matching BB1', function () {
                expect(proxy.getById('BB1')).not.to.be(null);
            });

            it('should return the correct disclaimer', function () {
                expect(proxy.disclaimer).to.be(TEST_DISCLAIMER);
            });
        });

        function resetGlobalConfig() {
            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().setVehicleId('M6');
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }

        function getDependencies() {
            return [
                'model/proxy/data/ConfigurableItemProxy',
                'support/ConfigurableType',
                'support/GlobalConfig'
            ];
        }

        function getDataMock() {
            return {
                bodyStyles: [
                    {
                        id: 'BB1'
                    }
                ],
                disclaimers: {

                    bodyStyles: TEST_DISCLAIMER,
                    grades: TEST_DISCLAIMER,
                    colours: TEST_DISCLAIMER,
                    trims: TEST_DISCLAIMER,
                    wheels: TEST_DISCLAIMER

                }
            };
        }

        function populateProxy() {
            proxy.parseData(getDataMock());
        }

    });
})();
