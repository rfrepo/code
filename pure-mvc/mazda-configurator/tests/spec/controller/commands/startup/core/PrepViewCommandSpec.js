(function () {
    'use strict';
    describe('PrepViewCommand', function () {

        var facade,
            prepViewCommand,
            realHTMLTemplate;

        describe('initialize', function () {
            it('should not be undefined', function (done) {
                expect(prepViewCommand).to.not.be(undefined);
                done();
            });
        });

        describe('VehiclePresentationMediator', function () {
            it('should have the required mediator registered', function (done) {
                expect(facade.hasMediator('VehiclePresentationMediator')).to.be(true);
                done();
            });
        });

        describe('NavigationContainerMediator', function () {
            it('should have the required mediator registered', function (done) {
                expect(facade.hasMediator('NavigationContainerMediator')).to.be(true);
                done();
            });
        });

        describe('ConfigurableItemCarouselMediator', function () {
            it('should have the required mediator registered', function (done) {
                expect(facade.hasMediator('ConfigurableItemCarouselMediator')).to.be(true);
                done();
            });
        });

        describe('MainConfiguratorHTMLViewPrepareMediator', function () {
            it('should have the required mediators of the class', function (done) {
                expect(facade.hasMediator('MainConfiguratorContainerMediator')).to.be(true);
                done();
            });
        });

        describe('ChangeNotificationUIMediator', function () {
            it('should have the required mediators of the class', function (done) {
                expect(facade.hasMediator('ChangeNotificationUIMediator')).to.be(true);
                done();
            });
        });

        describe('ApplicationMediator', function () {
            it('should have the required mediators of the class', function (done) {
                expect(facade.hasMediator('ApplicationMediator')).to.be(true);
                done();
            });
        });

        describe('RecentConfigurationsMediator', function () {
            it('should have the required mediators of the class', function (done) {
                expect(facade.hasMediator('RecentConfigurationsMediator')).to.be(true);
                done();
            });
        });

        describe('SectionContentUIMediator', function () {
            it('should have the required mediators of the class', function (done) {
                expect(facade.hasMediator('SectionContentUIMediator')).to.be(true);
                done();
            });
        });

        describe('VehicleDetailsMediator', function () {
            it('should have the required mediators of the class', function (done) {
                expect(facade.hasMediator('VehicleDetailsMediator')).to.be(true);
                done();
            });
        });

        describe('registering mediators', function () {
            it('should have registered the summary mediator', function (done) {
                expect(facade.hasMediator('SummaryMediator')).to.be(true);

                done();
            });
        });

        describe('registering mediators', function () {
            it('should have registered the configurable item panel mediator', function (done) {
                expect(facade.hasMediator('ConfigurableItemPanelMediator')).to.be(true);

                done();
            });
        });

        function mockHTMLTemplate() {
            realHTMLTemplate = bmc.support.HTMLTemplate;
            bmc.support.HTMLTemplate = {
                getSynchronously: function () {
                    return '';
                }
            };
        }

        before(function () {
            mockHTMLTemplate();
        });

        beforeEach(function (done) {
            require(['controller/command/startup/SetDefaultVehicleCommand',
                'controller/command/startup/core/PrepViewCommand',
                'support/GlobalConfig'], function () {

                setupMockVerticalScrollerLocker();

                setupGlobalConfig();

                prepViewCommand = new bmc.controller.command.startup.core.PrepViewCommand();
                facade = puremvc.Facade.getInstance(new Date().getTime());
                prepViewCommand.facade = facade;
                prepViewCommand.execute();

                done();
            });
        });

        function setupMockVerticalScrollerLocker() {

            burrows.app = {
                getVerticalScrollLocker: function () {
                    return {
                        initialise: function () {
                        }
                    };
                }
            };
        }

        function setupGlobalConfig() {

            bmc.support.GlobalConfig.getInstance().instance = null;
            bmc.support.GlobalConfig.getInstance().applyLocaleData('en-gb');
        }

        after(function () {
            bmc.support.HTMLTemplate = realHTMLTemplate;
            burrows.app = undefined;
        });

    });
})();
