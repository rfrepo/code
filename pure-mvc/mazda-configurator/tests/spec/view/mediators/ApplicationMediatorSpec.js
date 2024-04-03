(function () {
    'use strict';
    describe('ApplicationMediator', function () {

        var mediator,
            SEND_NOTIFICATION = 'sendNotification',
            facade,
            jQuery = window.jQuery;

        function getDependencies() {
            return [
                'support/HTMLAttributes',
                'view/mediators/ApplicationMediator',
                'view/components/VerticalScrollLocker',
                'Application'
            ];
        }

        function createApplicationInstance() {
            burrows.app = new bmc.Application();
        }

        function createFacadeAndApplicationMediator() {
            facade = puremvc.Facade.getInstance(new Date().getTime());
            mediator = new bmc.view.mediators.ApplicationMediator();
            mediator.getPDF = function () {};
            facade.registerMediator(mediator);
        }

        function setupDOM() {
            var HTMLAttributes = bmc.support.HTMLAttributes;

            jQuery(document.body).append('<div class="' +
                HTMLAttributes.NAVIGATION_TABS_CLASS + '"></div><div class="' +
                HTMLAttributes.SECTION_CONTENT_CLASS + '"></div>');
        }

        beforeEach(function (done) {

            require(getDependencies(), function () {

                setupDOM();
                createApplicationInstance();
                createFacadeAndApplicationMediator();
                done();
            });
        });

        afterEach(function () {
            var HTMLAttributes = bmc.support.HTMLAttributes;

            jQuery('.' + HTMLAttributes.NAVIGATION_TABS_CLASS).remove();
            jQuery('.' + HTMLAttributes.SECTION_CONTENT_CLASS).remove();
        });

        describe('class should exist ', function () {
            it('should be instanced', function () {
                expect(mediator).not.to.be(undefined);
            });
        });

        describe('handling component events', function () {

            it('should send lock notification', function () {

                var spy = sinon.spy(mediator, SEND_NOTIFICATION),
                    eventData = bmc.view.components.VerticalScrollLocker.VIEW_UNLOCKED,
                    event = bmc.view.components.VerticalScrollLocker.VIEW_SCROLL_STATE_CHANGED;

                jQuery(mediator.getViewComponent().getVerticalScrollLocker()).trigger(event, eventData);

                mediator[SEND_NOTIFICATION].restore();

                expect(spy.called).to.be(true);

                spy.restore();
            });
        });

        describe('handling notifications', function () {


            it('should be listening for when summary is to be shown', function () {
                var NotificationNames = bmc.support.NotificationNames,
                    notifications = mediator.listNotificationInterests();

                expect(notifications).to.contain(NotificationNames.SHOW_SUMMARY_PAGE);
                expect(notifications).to.contain(NotificationNames.HIDE_SUMMARY_PAGE);
                expect(notifications).to.contain(NotificationNames.ACTIVE_SECTION_UPDATED);
            });

            it('should have no summary when registered', function () {
                var HTMLAttributes = bmc.support.HTMLAttributes;

                expect(
                    jQuery('.' + HTMLAttributes.NAVIGATION_TABS_CLASS).hasClass(HTMLAttributes.SUMMARY_CLASS)
                ).to.not.be.ok();

                expect(
                    jQuery('.' + HTMLAttributes.SECTION_CONTENT_CLASS).hasClass(HTMLAttributes.SUMMARY_CLASS)
                ).to.not.be.ok();
            });

            it('should have a summary when show summary is called', function () {
                var HTMLAttributes = bmc.support.HTMLAttributes;

                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.SHOW_SUMMARY_PAGE
                ));

                expect(
                    jQuery('.' + HTMLAttributes.NAVIGATION_TABS_CLASS).hasClass(HTMLAttributes.SUMMARY_CLASS)
                ).to.be.ok();

                expect(
                    jQuery('.' + HTMLAttributes.SECTION_CONTENT_CLASS).hasClass(HTMLAttributes.SUMMARY_CLASS)
                ).to.be.ok();
            });

            it('should remove summary classes when edit configuration fired', function () {
                var HTMLAttributes = bmc.support.HTMLAttributes;

                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.SHOW_SUMMARY_PAGE
                ));

                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.HIDE_SUMMARY_PAGE
                ));

                expect(
                    jQuery('.' + HTMLAttributes.NAVIGATION_TABS_CLASS).hasClass(HTMLAttributes.SUMMARY_CLASS)
                ).to.not.be.ok();

                expect(
                    jQuery('.' + HTMLAttributes.SECTION_CONTENT_CLASS).hasClass(HTMLAttributes.SUMMARY_CLASS)
                ).to.not.be.ok();
            });

            it('should reset the page scroll position via the vertical scroller on section change', function () {
                BTesting.wrap(mediator.getViewComponent(), 'handleActiveSectionUpdated');

                mediator.handleNotification(new puremvc.Notification(
                    bmc.support.NotificationNames.ACTIVE_SECTION_UPDATED
                ));

                expect(mediator.getViewComponent().handleActiveSectionUpdated.hasBeenCalled).to.be.ok();

                mediator.getViewComponent().handleActiveSectionUpdated.restore();
            });
        });


    });
})();
