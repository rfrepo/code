(function () {
    'use strict';
    describe('MobileMediator', function () {

        var mediator,
            globalConfig,
            dataBuilder;

        function setupDOM() {
            var div = document.createElement('div');
            div.id = 'mobileDom';
            div.innerHTML = MOBILE_DOM;

            jQuery(document.body).append(div);
        }

        function createFacade() {
            return puremvc.Facade.getInstance(new Date().getTime());
        }

        function setupGlobalConfig() {
            globalConfig = bmc.support.GlobalConfig.getInstance();
            globalConfig.applyLocaleData('en-gb');
            globalConfig.setVehicleId('M6');
            globalConfig.setBodyStyleVO({
                name: '5 Door Hatchback',
                getName: function () {
                    return this.name;
                },
                setName: function (name) {
                    this.name = name;
                }
            });
        }

        beforeEach(function (done) {
            require([
                '../../../test/spec/' +
                    'support/data/DataBuilder',
                'support/HTMLAttributes',
                'support/NotificationNames',
                'support/ConfigurableType',
                'model/vo/SectionDataVO',
                'view/mediators/MobileMediator',
                'view/mediators/RecentConfigurationsMediator',
                'controller/command/RequestUserConfigurationsCommand',
                'controller/vo/ConfigurableItemUIVO'
            ], function () {
                setupGlobalConfig();
                setupDOM();

                dataBuilder = new bmc.support.data.DataBuilder();

                mediator = new bmc.view.mediators.MobileMediator();
                sinon.stub(mediator, 'sendNotification');

                createFacade();

                done();
            });
        });

        afterEach(function () {
            jQuery('#mobileDom').remove();
            mediator.sendNotification.restore();
        });

        describe('initializing', function () {
            it('should be defined', function () {
                expect(mediator).not.to.be(undefined);
            });

            it('should be have html', function () {
                expect(document.body.innerHTML).to.contain(bmc.support.HTMLAttributes.TRAY_CLASS);
            });

            it('should add all title text', function () {
                expect(document.body.innerHTML).to.contain(globalConfig.LANGUAGE.grade);
                expect(document.body.innerHTML).to.contain(globalConfig.LANGUAGE.engine);
                expect(document.body.innerHTML).to.contain(globalConfig.LANGUAGE.trim);
                expect(document.body.innerHTML).to.contain(globalConfig.LANGUAGE.trim);
                expect(document.body.innerHTML).to.contain(globalConfig.LANGUAGE.wheel);
                expect(document.body.innerHTML).to.contain(globalConfig.LANGUAGE.summary);
            });
        });

        describe('registering', function () {
            beforeEach(function () {
                mediator.onRegister();
            });

            it('should add vehicle name', function () {
                var HTMLAttributes = bmc.support.HTMLAttributes,
                    elHTML = jQuery('.' + HTMLAttributes.VEHICLE_TITLE_CLASS).html();

                expect(elHTML).to.contain(globalConfig.LANGUAGE[globalConfig.getVehicleId()]);
            });
        });

        describe('events', function () {
            beforeEach(function () {
                mediator.onRegister();
            });

            describe('component events', function () {
                it('should add open classes when show-tray is clicked', function () {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        $tray = jQuery('.' + HTMLAttributes.TRAY_CLASS),
                        $page = jQuery('.' + HTMLAttributes.PAGE_CLASS);

                    expect($tray.hasClass(HTMLAttributes.TRAY_OPEN_CLASS)).to.not.be.ok();
                    expect($page.hasClass(HTMLAttributes.TRAY_OPEN_PAGE_CLASS)).to.not.be.ok();

                    jQuery('.' + HTMLAttributes.SHOW_TRAY_CLASS).trigger('click');

                    expect($tray.hasClass(HTMLAttributes.TRAY_OPEN_CLASS)).to.be.ok();
                    expect($page.hasClass(HTMLAttributes.TRAY_OPEN_PAGE_CLASS)).to.be.ok();
                });

                it('should add an active and current class to a clicked tray button', function () {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        $engineP = jQuery('.' + HTMLAttributes.TRAY_CLASS +
                            ' a.' + HTMLAttributes.ANCHOR_CLASS_CLASS +
                            '.engine p'
                        ),
                        $engineLi;

                    $engineP.trigger('click', $engineP);

                    $engineLi = jQuery($engineP[0].parentElement.parentElement);

                    expect($engineLi.hasClass(HTMLAttributes.ACTIVE_CLASS)).to.be.ok();
                    expect($engineLi.hasClass(HTMLAttributes.CURRENT_CLASS)).to.be.ok();
                });

                it('should remove current from old clicked item but not active', function () {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        $engineP = jQuery('.' + HTMLAttributes.TRAY_CLASS +
                            ' a.' + HTMLAttributes.ANCHOR_CLASS_CLASS +
                            '.engine p'
                        ),
                        $colourP = jQuery('.' + HTMLAttributes.TRAY_CLASS +
                            ' a.' + HTMLAttributes.ANCHOR_CLASS_CLASS +
                            '.colour p'
                        ),
                        $engineLi;

                    $engineP.trigger('click', $engineP);
                    $colourP.trigger('click', $colourP);

                    $engineLi = jQuery($engineP[0].parentElement.parentElement);

                    expect($engineLi.hasClass(HTMLAttributes.ACTIVE_CLASS)).to.be.ok();
                    expect($engineLi.hasClass(HTMLAttributes.CURRENT_CLASS)).to.not.be.ok();
                });

                it('should tell the application to change section', function () {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        $engineP = jQuery('.' + HTMLAttributes.TRAY_CLASS +
                            ' a.' + HTMLAttributes.ANCHOR_CLASS_CLASS +
                            '.engine p'
                        );

                    $engineP.trigger('click', $engineP);

                    expect(mediator.sendNotification.called).to.be.ok();
                    expect(mediator.sendNotification.args[0][0]).to.be(
                        bmc.support.NotificationNames.NAVIGATION_ITEM_SELECTED
                    );
                    expect(mediator.sendNotification.args[0][1].getType()).to.be(
                        bmc.support.ConfigurableType.ENGINE
                    );
                });
            });

            describe('handling notifications', function () {
                function getSimpleConfigurationVO() {
                    var simpleConfigurationVO = new bmc.model.vo.SimpleConfigurationVO();
                    simpleConfigurationVO.setBaseVehicleVO(dataBuilder.VEHICLE_1_VO());
                    simpleConfigurationVO.addConfigurableItemVO(
                        bmc.support.ConfigurableType.COLOUR,
                        dataBuilder.COLOUR_1_VO()
                    );
                    simpleConfigurationVO.addConfigurableItemVO(
                        bmc.support.ConfigurableType.WHEEL,
                        dataBuilder.WHEEL_1_VO()
                    );

                    simpleConfigurationVO.addConfigurableItemVO(
                        bmc.support.ConfigurableType.TRIM,
                        dataBuilder.TRIM_1_VO()
                    );

                    simpleConfigurationVO.addConfigurableItemVO(
                        bmc.support.ConfigurableType.BODYSTYLE,
                        dataBuilder.BODYSTYLE_2200_VO()
                    );

                    return simpleConfigurationVO;
                }

                it('should be listening for specific notifications', function () {
                    expect(mediator.listNotificationInterests()).to.contain(
                        bmc.support.NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY
                    );

                    expect(mediator.listNotificationInterests()).to.contain(
                        bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE
                    );

                    expect(mediator.listNotificationInterests()).to.contain(
                        bmc.support.NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE
                    );

                    expect(mediator.listNotificationInterests()).to.contain(
                        bmc.support.NotificationNames.ACTIVE_CONFIGURATION_CHANGE
                    );

                    expect(mediator.listNotificationInterests()).to.contain(
                        bmc.support.NotificationNames.NON_MSC_CONFIGURATION_CHANGE
                    );
                });

                it('should add the body style name to the dom when initial configuration is ready', function () {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        elHTML;

                    mediator.handleNotification(new puremvc.Notification(
                        bmc.support.NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY,
                        getSimpleConfigurationVO()
                    ));

                    elHTML = jQuery('.' + HTMLAttributes.VEHICLE_TITLE_CLASS).html();

                    expect(elHTML).to.contain(globalConfig.getBodyStyleVO().getName());
                });

                it('should set grade to be active and current', function () {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        $gradeA;

                    mediator.handleNotification(new puremvc.Notification(
                        bmc.support.NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY,
                        getSimpleConfigurationVO()
                    ));

                    $gradeA = jQuery('.' + HTMLAttributes.TRAY_CLASS +
                        ' li .grade'
                    );

                    expect($gradeA.parent().hasClass(HTMLAttributes.ACTIVE_CLASS)).to.be.ok();
                    expect($gradeA.parent().hasClass(HTMLAttributes.CURRENT_CLASS)).to.be.ok();
                });

                it('should render the startup vehicle configuration', function (done) {


                    //this.timeout(50000)
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        elHTML;

                    mediator.handleNotification(new puremvc.Notification(
                        bmc.support.NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY,
                        getSimpleConfigurationVO()
                    ));

                    mediator.getViewComponent().onVehicleLoaded = function () {
                        elHTML = jQuery('.' + HTMLAttributes.STATIC_CAR_VIEWS_CLASS).html();

                        expect(elHTML).to.contain(
                            './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                'base/2200_001_A4D_00003.jpg'
                        );
                        expect(elHTML).to.contain(
                            './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                'wheel/whe_01_00003.png'
                        );
                        expect(elHTML).to.contain(
                            './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                'base/2200_001_A4D_00006.jpg'
                        );
                        expect(elHTML).to.contain(
                            './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                'wheel/whe_01_00006.png'
                        );
                        expect(elHTML).to.contain(
                            './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                'base/2200_001_A4D_00011.jpg'
                        );
                        expect(elHTML).to.contain(
                            './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                'wheel/whe_01_00011.png'
                        );

                        done();
                    };
                });

                it('should render the new vehicle when ACTIVE_CONFIGURATION_CHANGE is notified', function (done) {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        elHTML,
                        simpleConfigurationVO = getSimpleConfigurationVO(),
                        callbackCount = 0;

                    mediator.handleNotification(new puremvc.Notification(
                        bmc.support.NotificationNames.INITIAL_ACTIVE_CONFIGURATION_READY,
                        simpleConfigurationVO
                    ));

                    simpleConfigurationVO.addConfigurableItemVO(
                        bmc.support.ConfigurableType.WHEEL,
                        dataBuilder.WHEEL_2_VO()
                    );

                    mediator.handleNotification(new puremvc.Notification(
                        bmc.support.NotificationNames.ACTIVE_CONFIGURATION_CHANGE,
                        simpleConfigurationVO
                    ));

                    mediator.getViewComponent().onVehicleLoaded = function () {
                        if (callbackCount >= 1) {
                            elHTML = jQuery('.' + HTMLAttributes.STATIC_CAR_VIEWS_CLASS).html();

                            expect(elHTML).to.contain(
                                './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                    'base/2200_001_A4D_00003.jpg'
                            );
                            expect(elHTML).to.not.contain(
                                './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                    'wheel/whe_01_00003.png'
                            );
                            expect(elHTML).to.contain(
                                './resources/locale/en-gb/m6/images/vehicle_presentation/exterior/' +
                                    'wheel/whe_02_00003.png'
                            );

                            done();
                        }

                        callbackCount += 1;
                    };
                });

                it('should render an up-to-date summary when setConfiguration is called', function () {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        ConfigurableType = bmc.support.ConfigurableType,
                        elHTML,
                        colourHTML,
                        wheelHTML,
                        trimHTML,
                        configuration = getSimpleConfigurationVO();

                    mediator.getViewComponent().setConfiguration(getSimpleConfigurationVO());

                    elHTML = jQuery('#' + HTMLAttributes.SUMMARY_CLASS).html();
                    colourHTML = jQuery('#' + HTMLAttributes.SUMMARY_CLASS + ' .colour-price').html();
                    wheelHTML = jQuery('#' + HTMLAttributes.SUMMARY_CLASS + ' .wheel-price').html();
                    trimHTML = jQuery('#' + HTMLAttributes.SUMMARY_CLASS + ' .trim-price').html();

                    expect(elHTML).to.contain(configuration.getConfigurableItemVO(ConfigurableType.GRADE).getName());
                    expect(elHTML).to.contain(configuration.getConfigurableItemVO(ConfigurableType.ENGINE).getName());
                    expect(elHTML).to.contain(configuration.getConfigurableItemVO(ConfigurableType.COLOUR).getName());
                    expect(elHTML).to.contain(
                        configuration.getConfigurableItemVO(ConfigurableType.COLOUR).getThumbnail());
                    expect(elHTML).to.contain(configuration.getConfigurableItemVO(ConfigurableType.WHEEL).getName());
                    expect(elHTML).to.contain(
                        configuration.getConfigurableItemVO(ConfigurableType.WHEEL).getThumbnail());
                    expect(elHTML).to.contain(configuration.getConfigurableItemVO(ConfigurableType.TRIM).getName());
                    expect(elHTML).to.contain(
                        configuration.getConfigurableItemVO(ConfigurableType.TRIM).getThumbnail());

                    expect(colourHTML).to.contain(globalConfig.LANGUAGE.NO_COST_OPTION);
                    expect(wheelHTML).to.contain(globalConfig.LANGUAGE.NO_COST_OPTION);
                    expect(trimHTML).to.contain(globalConfig.LANGUAGE.NO_COST_OPTION);
                });

                it('should render an up-to-date summary when setConfiguration is changes', function () {
                    var HTMLAttributes = bmc.support.HTMLAttributes,
                        ConfigurableType = bmc.support.ConfigurableType,
                        elHTML,
                        newColourPrice = '400.00',
                        vo = dataBuilder.COLOUR_2_VO(),
                        colourHTML,
                        configuration = getSimpleConfigurationVO();

                    mediator.getViewComponent().setConfiguration(getSimpleConfigurationVO());

                    vo.setPrice(newColourPrice);

                    configuration.addConfigurableItemVO(ConfigurableType.COLOUR, vo);

                    mediator.getViewComponent().setConfiguration(configuration);

                    elHTML = jQuery('#' + HTMLAttributes.SUMMARY_CLASS).html();
                    colourHTML = jQuery('#' + HTMLAttributes.SUMMARY_CLASS + ' .colour-price').html();

                    expect(elHTML).to.contain(configuration.getConfigurableItemVO(ConfigurableType.COLOUR).getName());
                    expect(elHTML).to.contain(
                        configuration.getConfigurableItemVO(ConfigurableType.COLOUR).getThumbnail());

                    expect(colourHTML).to.contain(globalConfig.CURRENCY_SYMBOL + newColourPrice);
                });

                describe('section notifications', function () {
                    var ulSelector, carouselItems;

                    function getGradeCarouselItems() {
                        var grade1VO = new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.GRADE_001_VO());
                        grade1VO.setSelected(true);

                        return [
                            grade1VO,
                            new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.GRADE_002_VO()),
                            new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.GRADE_003_VO())
                        ];
                    }

                    function getColourCarouselItems() {
                        var vo = new bmc.controller.vo.ConfigurableItemUIVO(dataBuilder.COLOUR_1_VO());
                        vo.setSelected(true);

                        return [vo];
                    }

                    beforeEach(function () {
                        carouselItems = getGradeCarouselItems();

                        ulSelector = 'li.' + bmc.support.ConfigurableType.GRADE + ' ul';

                        mediator.handleNotification(new puremvc.Notification(
                            bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE,
                            carouselItems
                        ));
                    });

                    it('should render the grades to the dom on section change', function () {
                        var elHTML = jQuery(ulSelector).html();

                        expect(elHTML).to.contain('SE');
                        expect(elHTML).to.contain('SE-L');
                        expect(elHTML).to.contain('Sport');
                        expect(jQuery(ulSelector + ' li').length).to.equal(3);
                    });

                    it('should clear old grades when called again', function () {
                        var elHTML;

                        carouselItems.splice(1, 1);

                        mediator.handleNotification(new puremvc.Notification(
                            bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE,
                            carouselItems
                        ));

                        elHTML = jQuery(ulSelector).html();

                        expect(elHTML).to.contain('SE');
                        expect(elHTML).to.not.contain('SE-L</p>');
                        expect(elHTML).to.contain('Sport');
                        expect(jQuery(ulSelector + ' li').length).to.equal(2);
                    });

                    it('should tell the application a grade as been selected', function () {
                        var HTMLAttributes = bmc.support.HTMLAttributes;

                        jQuery(
                            '.' + HTMLAttributes.CAROUSEL_ITEMS_CLASS + ' .' +
                                bmc.support.ConfigurableType.GRADE + ' ul li:first-child p.price'
                        ).trigger('click');

                        jQuery(
                            '.' + HTMLAttributes.CAROUSEL_ITEMS_CLASS + ' .' +
                                bmc.support.ConfigurableType.GRADE + ' ul li:first-child span'
                        ).trigger('click');

                        expect(mediator.sendNotification.callCount).to.be(2);
                        expect(mediator.sendNotification.alwaysCalledWith(
                            bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION)).to.be.ok();
                        expect(mediator.sendNotification.args[0][1].getId()).to.be('001');
                        expect(mediator.sendNotification.args[1][1].getId()).to.be('001');
                    });

                    it('should tell the application a colour as been selected', function () {
                        var HTMLAttributes = bmc.support.HTMLAttributes;

                        carouselItems = getColourCarouselItems();

                        mediator.handleNotification(new puremvc.Notification(
                            bmc.support.NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE,
                            carouselItems
                        ));

                        jQuery(
                            '.' + HTMLAttributes.CAROUSEL_ITEMS_CLASS + ' .' +
                                bmc.support.ConfigurableType.COLOUR + ' ul li div img'
                        ).trigger('click');

                        expect(mediator.sendNotification.called).to.be.ok();
                        expect(mediator.sendNotification.args[0][0]).to.be(
                            bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION
                        );
                        expect(mediator.sendNotification.args[0][1].getId()).to.be('A4D');
                    });
                });

            });
        });
    });
})();
