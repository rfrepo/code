define([
    'view/mediators/ConfigurableItemSpecificationsUIMediator',
    'view/components/SectionContentUI',
    'support/NotificationNames',
    'support/HTMLAttributes',
    'support/ConfigurableType'
], function () {
    'use strict';
    var SectionContentUI = arguments[1],
        NotificationNames = arguments[2],
        HTMLAttributes = arguments[3],
        ConfigurableType = arguments[4];

    return puremvc.define({
            name: 'bmc.view.mediators.SectionContentUIMediator',
            parent: puremvc.Mediator,
            constructor: function () {

                var mediatorName = this.constructor.NAME,
                    viewComponent = this.buildViewComponent();

                puremvc.Mediator.call(this, mediatorName, viewComponent);
            }
        },
        {
            listNotificationInterests: function () {
                return [NotificationNames.SECTION_DATA_AVAILABLE,
                    NotificationNames.PREPARING_SECTION_CONTENT];
            },

            handleNotification: function (note) {

                var notificationName = note.getName(),
                    notificationBody = note.getBody(),
                    viewComponent = this.getViewComponent();

                if (notificationName === NotificationNames.SECTION_DATA_AVAILABLE) {

                    viewComponent.displayContent(notificationBody);
                    this.registerSectionStrategyMediator(notificationBody.getSectionName());
                }
                else {
                    this.removePreviousStrategyMediator(viewComponent.getCurrentStrategyName());
                    viewComponent.removePreviousContent();
                }
            },

            buildViewComponent: function () {

                var parentDomId = '#' + HTMLAttributes.SECTION_CONTENT_ID;
                return new SectionContentUI(parentDomId);
            },

            registerSectionStrategyMediator: function (sectionName) {

                var mediators = bmc.view.mediators,
                    strategy = this.getViewComponent().contentDisplayStrategy;

                if ((sectionName === ConfigurableType.GRADE || sectionName === ConfigurableType.ENGINE) &&
                    !(this.facade.hasMediator(mediators.ConfigurableItemSpecificationsUIMediator.NAME))) {

                    this.facade.registerMediator(
                        new mediators.ConfigurableItemSpecificationsUIMediator(strategy));
                }
            },

            removePreviousStrategyMediator: function (sectionName) {

                var mediators = bmc.view.mediators;

                if ((sectionName === ConfigurableType.GRADE || sectionName === ConfigurableType.ENGINE) &&
                    this.facade.hasMediator(mediators.ConfigurableItemSpecificationsUIMediator.NAME)) {

                    this.facade.removeMediator(mediators.ConfigurableItemSpecificationsUIMediator.NAME);
                }
            }
        },
        {
            NAME: 'SectionContentUIMediator'
        });
});