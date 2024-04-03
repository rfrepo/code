(function () {
    'use strict';
    describe('StandardFeaturesProxy', function () {

        var proxy,

            CATEGORY = 'category',
            STANDARD_FEATURE_VO_ID = '0037',
            TOTAL_NUMBER_0F_VOS = 3;

        describe('initialising', function () {

            it('should be initialised', function (done) {

                expect(proxy).to.not.be(undefined);
                done();
            });
        });

        describe('parsing data', function () {

            it('should populate a standardFeatures array containing vos', function () {
                expect(proxy.standardFeatures[0]).to.have.property(CATEGORY);
            });

            it('should have the standardFeatures array containing 3 vos', function () {
                expect(proxy.standardFeatures.length).to.be(TOTAL_NUMBER_0F_VOS);
            });
        });

        describe('retrieving data', function () {

            it('should return the vo with the required id', function () {

                var standardFeatureVO = proxy.getById(STANDARD_FEATURE_VO_ID).getId();
                expect(standardFeatureVO).to.be(STANDARD_FEATURE_VO_ID);
            });

        });

        beforeEach(function (done) {

            require(getDependencies(), function () {

                var facade = puremvc.Facade.getInstance(String(new Date().getTime()));

                proxy = new bmc.model.proxy.data.StandardFeaturesProxy();
                facade.registerProxy(proxy);
                proxy.parseData(mockData());

                done();
            });
        });

        function getDependencies() {
            return [
                'model/proxy/data/StandardFeaturesProxy',
                'support/NotificationNames'
            ];
        }

        function mockData() {
            return {
                'modelID': 'M6',
                'modelName': 'Mazda6',
                'startupBaseVehicleId': 'GHW8BAA',
                'option': [
                    {
                        'value': '0028',
                        'price': '0.00',
                        'itemBelongsToSpecificationCategory': 'Comfort and Convenience',
                        'file': {
                            'filename': '82d14fbe-1d09-432f-9a06-53639a03c791.jpg'
                        },
                        'title': 'Front and rear electric windows'
                    },
                    {
                        'value': '0037',
                        'price': '0.00',
                        'itemBelongsToSpecificationCategory': 'Comfort and Convenience',
                        'file': {
                            'filename': '9a0456ce-0fa4-442a-9287-33ee449491a7.jpg'
                        },
                        'title': 'Manual air-conditioning'
                    },
                    {
                        'value': '0038',
                        'price': '0.00',
                        'itemBelongsToSpecificationCategory': 'Comfort and Convenience',
                        'file': {
                            'filename': '03bb1f26-82fc-49ce-9fb8-07c46dabeb66.jpg'
                        },
                        'title': 'Dual-zone climate control air-conditioning'
                    }

                ]
            };
        }


    });
})();
