(function () {
    'use strict';

    describe('ChangeNotificationUIMediator', function () {

        var facade,
            mediator,
            SHOW = 'show',
            HIDE = 'hide',
            SEND_NOTIFICATION = 'sendNotification',
            globalConfig,
            LOCALE = 'en-gb';

        function createSpyAndCallHandleNotification(spyMethod, notificationName, notificationType) {

            var viewComponent = mediator.getViewComponent(),
                spy = sinon.spy(viewComponent, spyMethod);

            mediator.handleNotification(createMockNotification(notificationName, notificationType));

            viewComponent[spyMethod].restore();

            return spy;
        }

        function createFacade() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
        }

        function createMockNotification(name, type) {
            return {
                getName: function () {
                    return name;
                },
                getBody: function () {
                    return [];
                },
                getType: function () {
                    return type;
                }
            };
        }

        function setupDOM() {
            jQuery(document.body).append('<div class="' +
                bmc.support.HTMLAttributes.CHANGE_ALERT_CONTAINER_CLASS +
                '"></div>');
        }

        function fakeTracking() {
            var tracking = new bmc.support.tracking.TrackingService(
                bmc.support.tracking.SophusTrackingId,
                bmc.support.tracking.SophusTrackingSerializer,
                bmc.support.tracking.SophusTrackingMethod
            );
            tracking.setEnabled(false);

            window.burrows = {
                app: {
                    tracking: tracking
                }
            };
        }

        beforeEach(function (done) {
            require([
                'view/mediators/ChangeNotificationUIMediator',
                'support/tracking/TrackingService',
                'support/tracking/SophusTrackingId',
                'support/tracking/SophusTrackingSerializer',
                'support/tracking/SophusTrackingMethod',
                'support/ConfigurableType',
                'support/HTMLTemplate',
                'support/HTMLAttributes'
            ], function () {
                setupDOM();
                createFacade();
                fakeTracking();

                globalConfig = bmc.support.GlobalConfig.getInstance();
                globalConfig.applyLocaleData(LOCALE);

                mediator = new bmc.view.mediators.ChangeNotificationUIMediator();
                facade.registerMediator(mediator);

                done();
            });
        });

        afterEach(function () {
            jQuery('.' + bmc.support.HTMLAttributes.CHANGE_ALERT_CONTAINER_CLASS).remove();

            bmc.support.GlobalConfig.instance = null;
        });

        describe('initializing ChangeNotificationUIMediator', function () {
            it('should be defined', function () {
                expect(mediator).not.to.be(undefined);
            });

            it('should render the base template to the dom', function () {
                var $elHtml = jQuery('.' + bmc.support.HTMLAttributes.CHANGE_ALERT_CONTAINER_CLASS).html();

                expect($elHtml).to.contain(bmc.support.HTMLAttributes.CHANGE_ALERT_CLASS);
                expect($elHtml).to.contain(bmc.support.HTMLAttributes.CLOSED_CLASS);
            });
        });

        describe('listening for notifications', function () {

            it('should be interested in CONFLICTS_FOUND', function () {

                var conflictFound = bmc.support.NotificationNames.CONFLICTS_FOUND;
                expect(mediator.listNotificationInterests()).to.contain(conflictFound);
            });

            it('should be interested in CONFLICTS_FOUND', function () {

                var conflictFound = bmc.support.NotificationNames.NO_CONFLICTS_FOUND;
                expect(mediator.listNotificationInterests()).to.contain(conflictFound);
            });

            it('should be interested in NAVIGATION_ITEM_SELECTED', function () {

                var conflictFound = bmc.support.NotificationNames.NAVIGATION_ITEM_SELECTED;
                expect(mediator.listNotificationInterests()).to.contain(conflictFound);
            });
        });

        describe('handling notifications', function () {

            describe('finding conflicts', function () {

                it('should calling show on view component', function () {

                    var notificationName = bmc.support.NotificationNames.CONFLICTS_FOUND,
                        spy = createSpyAndCallHandleNotification(SHOW, notificationName),
                        $elHtml;

                    expect(spy.called).to.be(true);

                    $elHtml = jQuery('.' + bmc.support.HTMLAttributes.CHANGE_ALERT_CONTAINER_CLASS).html();

                    expect($elHtml).to.not.contain(bmc.support.HTMLAttributes.HIDDEN_CLASS);

                });

                it('should not call calling show on view component when ' +
                    'the notification type is NOTIFICATION_TYPE_RESTORE', function () {
                    var notificationName = bmc.support.NotificationNames.CONFLICTS_FOUND,
                        notificationType = bmc.support.NotificationNames.NOTIFICATION_TYPE_RESTORE,
                        spy = createSpyAndCallHandleNotification(SHOW, notificationName, notificationType),
                        $elHtml;

                    expect(spy.called).to.be(false);

                    $elHtml = jQuery('.' + bmc.support.HTMLAttributes.CHANGE_ALERT_CONTAINER_CLASS).html();

                    expect($elHtml).to.contain(bmc.support.HTMLAttributes.HIDDEN_CLASS);
                });
            });

            it('should respond to NAVIGATION_ITEM_SELECTED by calling hide on view component', function () {
                var spyMethod = HIDE,
                    notificationName = bmc.support.NotificationNames.NAVIGATION_ITEM_SELECTED,
                    spy = createSpyAndCallHandleNotification(spyMethod, notificationName);

                expect(spy.called).to.be(true);
            });

            it('should respond to CONFIGURABLE_ITEM_SELECTION by calling hide on view component', function () {
                var spyMethod = HIDE,
                    notificationName = bmc.support.NotificationNames.CONFIGURABLE_ITEM_SELECTION,
                    spy = createSpyAndCallHandleNotification(spyMethod, notificationName);

                expect(spy.called).to.be(true);
            });
        });

        describe('handling view component events', function () {
            var clock;

            beforeEach(function () {
                clock = sinon.useFakeTimers();

                mediator.getViewComponent().prepareJQueryView();
            });

            afterEach(function () {
                clock.restore();
                jQuery('.ui-dialog').remove();
            });

            it('should send UNDO_CHANGE notification dispatches when undo is clicked', function () {

                var spy = sinon.spy(mediator, SEND_NOTIFICATION);

                mediator.getViewComponent().onUndoClicked();

                mediator[SEND_NOTIFICATION].restore();

                expect(spy.args[0][0]).to.be(bmc.support.NotificationNames.UNDO_CHANGE);
            });

            it('should open the panel when info is clicked', function () {

                jQuery('.' + bmc.support.HTMLAttributes.INFO_CLASS).trigger('click');
                expect(
                    jQuery('.ui-dialog').html()
                ).to.contain(bmc.support.HTMLAttributes.NOTIFICATION_ALERT_DETAILS_CLASS);
            });

            it('should stop the timer when rolling over the component', function () {
                BTesting.wrap(mediator.getViewComponent(), 'hide');

                jQuery('.' + bmc.support.HTMLAttributes.INFO_CLASS).trigger('mouseover');

                clock.tick(5001);

                expect(mediator.getViewComponent().hide.hasBeenCalled).to.not.be.ok();
            });

            it('should restart the timer when you roll out', function () {
                BTesting.wrap(mediator.getViewComponent(), 'hide');

                jQuery('.' + bmc.support.HTMLAttributes.INFO_CLASS).trigger('mouseover');

                clock.tick(3000);

                jQuery('.' + bmc.support.HTMLAttributes.INFO_CLASS).trigger('mouseout');

                clock.tick(3000);

                expect(mediator.getViewComponent().hide.hasBeenCalled).to.not.be.ok();

                clock.tick(2001);

                expect(mediator.getViewComponent().hide.hasBeenCalled).to.be.ok();
            });
        });
    });
})();
