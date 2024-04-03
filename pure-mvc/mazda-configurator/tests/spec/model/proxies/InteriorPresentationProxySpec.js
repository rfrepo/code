(function () {
    'use strict';

    describe('InteriorPresentationProxy', function () {

        var facade,
            activeConfigurationProxy,
            interiorPresentationProxy;


        beforeEach(function (done) {
            require(['model/proxy/InteriorPresentationProxy', 'support/HTMLTemplate'], function () {
                createFacade();
                activeConfigurationProxy = new bmc.model.proxy.ActiveConfigurationProxy();
                interiorPresentationProxy = new bmc.model.proxy.InteriorPresentationProxy();

                facade.registerProxy(activeConfigurationProxy);

                facade.registerProxy(interiorPresentationProxy);

                activeConfigurationProxy.facade = facade;
                interiorPresentationProxy.facade = facade;

                populateActiveConfigurationProxy();
                done();
            });
        });


        describe('InteriorPresentationProxy should initialised', function () {
            it('should be initialised', function () {
                expect(interiorPresentationProxy).not.to.be(undefined);
            });
        });

        describe('trawl dependancies for an available Image', function () {
            it('should be able to find an image for a trim value if one exists', function () {
                var needsToSearchForImage;

                interiorPresentationProxy.setImageFromDependencies(activeConfigurationProxy.getSimplified());
                needsToSearchForImage = interiorPresentationProxy.hasSpecificImage();

                expect(needsToSearchForImage).to.equal(false);//to be extended with specific image case

                expect(interiorPresentationProxy.imageToLoad).to.equal(null);//to be extended with specific image case
            });

        });

        describe('obtain image to pull in from activeConfiguration', function () {
            function mockGlobalConfig() {
                bmc.support.GlobalConfig = (function () {
                    var real = bmc.support.GlobalConfig;

                    function GlobalConfig() {}

                    GlobalConfig.getInstance = function () {
                        return {
                            INTERIOR_IMAGES_LOCATION: 'resources/images/interior/'
                        };
                    };

                    GlobalConfig.restore = function () {
                        bmc.support.GlobalConfig = real;
                    };

                    return GlobalConfig;
                }());
            }

            it('should be able to obtain the image name to pull in', function () {
                mockGlobalConfig();

                interiorPresentationProxy.setImageFromActiveConfiguration(activeConfigurationProxy.getSimplified());

                expect(interiorPresentationProxy.imageToLoad).to.be(
                    'resources/images/interior/001_gn5_manual.jpg');

                bmc.support.GlobalConfig.restore();
            });
        });


        function returnDependancies() {
            return {
                'availability': [
                    {
                        'id': '5500',
                        'type': 'bodyStyle',
                        'value': '',
                        'preconditions': [
                            {
                                'id': '003',
                                'type': 'grade',
                                'value': '',
                                'preconditions': []
                            }
                        ]
                    },
                    {
                        'id': '2200',
                        'type': 'bodyStyle',
                        'value': '',
                        'preconditions': [
                            {
                                'id': '003',
                                'type': 'grade',
                                'value': '',
                                'preconditions': []
                            }
                        ]
                    }
                ],
                'price': [
                    {
                        'id': '003',
                        'type': 'grade',
                        'value': '200.00',
                        'preconditions': []
                    }
                ],
                'selection': [
                    [
                        ''
                    ],
                    [
                        ''
                    ]
                ]
            };
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function populateActiveConfigurationProxy() {
            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.BODYSTYLE,
                {'id': '2200'});
            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.GRADE,
                {'id': '001'});
            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.COLOUR,
                {'id': 'A4D'});
            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.WHEEL,
                {'id': 'WHE_01'});
            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.ENGINE,
                {'id': '600BMCXPE00', 'transmission': 'Manual'});
            activeConfigurationProxy.setConfigurableItemVO(bmc.support.ConfigurableType.TRIM,
                {'id': 'GN5', 'dependencies': returnDependancies()});
        }

    });
})();