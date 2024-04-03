(function () {
    'use strict';
    describe('SummaryMediator', function () {

        var mediator,
            globalConfig;

        function setupDOM() {
            jQuery(document.body).append('<div class="' +
                bmc.support.HTMLAttributes.SECTION_CONTENT_CLASS +
                '"></div>');
        }

        function setupGlobalConfig() {

            globalConfig = bmc.support.GlobalConfig.getInstance();
            globalConfig.setVehicleId('M6');
            globalConfig.applyLocaleData('en-gb');
            globalConfig.setBodyStyleVO({
                getName: function () {
                    return '5 Door Hatchback';
                }
            });
        }


        beforeEach(function (done) {
            require([
                'model/vo/SimpleConfigurationVO',
                'support/NotificationNames',
                'support/ConfigurableType',
                'view/mediators/SummaryMediator'
            ], function () {

                setupDOM();
                setupGlobalConfig();
                mediator = new bmc.view.mediators.SummaryMediator();
                BTesting.wrap(mediator, 'sendNotification');
                mediator.onRegister();

                done();
            });
        });

        afterEach(function () {
            jQuery('.' + bmc.support.HTMLAttributes.SECTION_CONTENT_CLASS).remove();

            mediator.sendNotification.restore();
        });

        describe('initializing', function () {
            it('should be defined', function () {
                expect(mediator).not.to.be(undefined);
            });
        });

        describe('registering', function () {
            it('should render the raw component to the dom', function () {
                var html = jQuery('.' + bmc.support.HTMLAttributes.SECTION_CONTENT_CLASS).html();

                expect(html).to.contain(bmc.support.HTMLAttributes.SUMMARY_DETAILS_CONTAINER_CLASS);
            });
        });

        describe('events', function () {

            var dataBuilder,
                globalConfig;

            function getSimpleConfiguration() {
                var ConfigurableType = bmc.support.ConfigurableType,
                    simpleConfig = new bmc.model.vo.SimpleConfigurationVO(),
                    baseVehicleVO = dataBuilder.VEHICLE_1_VO();

                simpleConfig.setVehicleId('M6');
                simpleConfig.setBaseVehicleVO(baseVehicleVO);
                simpleConfig.addConfigurableItemVO(ConfigurableType.COLOUR, dataBuilder.COLOUR_1_VO());
                simpleConfig.addConfigurableItemVO(ConfigurableType.WHEEL, dataBuilder.WHEEL_1_VO());
                simpleConfig.addConfigurableItemVO(ConfigurableType.TRIM, dataBuilder.TRIM_1_VO());

                return simpleConfig;
            }

            function getStandardFeatures() {
                return [
                    dataBuilder.STANDARD_FEATURE_1_VO(),
                    dataBuilder.STANDARD_FEATURE_2_VO(),
                    dataBuilder.STANDARD_FEATURE_3_VO()
                ];
            }

            function setupGlobalConfig() {

                globalConfig = bmc.support.GlobalConfig.getInstance();
                globalConfig.setVehicleId('M6');
                globalConfig.applyLocaleData('en-gb');
                globalConfig.setBodyStyleVO({
                    getName: function () {
                        return '5 Door Hatchback';
                    }
                });
            }

            function getAccessoryUIVOs() {

                return [createAccessoryUIVO('Accessory Name', 'accessories'),
                    createAccessoryUIVO('OptionPack Name', 'optionPack')];
            }

            function createAccessoryUIVO(name, type) {

                var blankFunction = function () {
                };

                return {
                    getName: function () {
                        return name;
                    },
                    getId: blankFunction,
                    getSelected: blankFunction,
                    getThumbnailURL: blankFunction,
                    getCallToActionText: blankFunction,
                    getFormattedPriceText: blankFunction,
                    configurableItemVO: {
                        type: type
                    }
                };
            }

            beforeEach(function (done) {

                require(['../../../' + 'test/spec/support/data/DataBuilder'], function () {

                    dataBuilder = new bmc.support.data.DataBuilder();

                    var standardFeatures = getStandardFeatures(),
                        gradeId = getSimpleConfiguration().getBaseVehicleVO().getGradeVO().getId();

                    setupGlobalConfig();

                    standardFeatures[0].setStandardOnGrades(gradeId);
                    standardFeatures[1].setOptionalOnGrades(gradeId);

                    mediator.handleNotification(new puremvc.Notification(
                        bmc.support.NotificationNames.SHOW_SUMMARY_PAGE,
                        {
                            configuration: getSimpleConfiguration(),
                            standardFeatures: getStandardFeatures(),
                            accessoryUIVOs: getAccessoryUIVOs()
                        }
                    ));

                    done();
                });
            });

            describe('handling notifications', function () {
                it('should be listening for when summary needs to be shown', function () {
                    expect(mediator.listNotificationInterests()).to.contain(
                        bmc.support.NotificationNames.SHOW_SUMMARY_PAGE);
                });

                it('should render the overview template when show summary event is handled', function () {
                    var html = jQuery('.' + bmc.support.HTMLAttributes.SUMMARY_DETAILS_CONTAINER_CLASS).html();

                    expect(html).to.contain('Mazda6');
                    expect(html).to.contain('5 Door Hatchback, SE');
                    expect(html).to.contain('2.0l 145ps Petrol Manual');
                    expect(html).to.contain('Colour');
                    expect(html).to.contain('Arctic White');
                    expect(html).to.contain('Wheel');
                    expect(html).to.contain('Black Cloth');
                    expect(html).to.contain('Trim');
                    expect(html).to.contain('17" Alloy wheel');
                });

                it('should render the features template when show summary event is handled', function () {
                    var selector = '.' + bmc.support.HTMLAttributes.SUMMARY_DETAILS_CONTAINER_CLASS,
                        dataSelector = selector + ' .accordion-header + div',
                        html = jQuery(selector).html();

                    expect(html).to.contain('Standard Features');
                    expect(html).to.contain('Comfort and Convenience');
                    expect(html).to.contain('Front and rear electric windows');
                    expect(jQuery(dataSelector + ' .availability-icon').length).to.equal(3);
                    expect(jQuery(dataSelector + ' .optional').length).to.equal(1);
                    expect(jQuery(dataSelector + ' .not-available').length).to.equal(1);
                    expect(html).to.contain('Manual air-conditioning');
                    expect(html).to.contain('Exterior');
                    expect(html).to.contain('Halogen headlights');
                    expect(jQuery(dataSelector)[1].innerHTML).to.contain('Not available');
                });

                it('should render the technical template when show summary event is handled', function () {
                    var selector = '.' + bmc.support.HTMLAttributes.SUMMARY_DETAILS_CONTAINER_CLASS,
                        html = jQuery(selector).html();

                    expect(html).to.contain('Technical Data');
                    expect(html).to.contain('Dimensions and Weights');
                });

                it.skip('should render the accessories template when show summary event is handled', function () {
                    var selector = '.' + bmc.support.HTMLAttributes.SUMMARY_DETAILS_CONTAINER_CLASS,
                        html = jQuery(selector).html();

                    expect(html).to.contain('Accessory Name');
                });

                it('should render the option packs template when show summary event is handled', function () {
                    var selector = '.' + bmc.support.HTMLAttributes.SUMMARY_DETAILS_CONTAINER_CLASS,
                        html = jQuery(selector).html();

                    expect(html).to.contain('OptionPack Name');
                });
            });

            describe('handling view component events', function () {
                it('should dispatch hide summary notification when edit configuration is clicked', function () {
                    jQuery(
                        mediator.getViewComponent().getSelector() +
                            ' .' + bmc.support.HTMLAttributes.EDIT_CONFIGURATION_BUTTON
                    ).trigger('click');

                    expect(mediator.sendNotification.hasBeenCalled).to.be.ok();
                    expect(mediator.sendNotification.calls.length).to.equal(6);
                    expect(mediator.sendNotification.calls[0][0]).to.equal(
                        bmc.support.NotificationNames.HIDE_SUMMARY_PAGE);
                    expect(mediator.sendNotification.calls[1][0]).to.equal(
                        bmc.support.NotificationNames.NAVIGATION_ITEM_SELECTED);
                    expect(mediator.sendNotification.calls[1][1].getType()).to.equal(
                        bmc.support.ConfigurableType.GRADE);
                });
            });
        });
    });
})();
