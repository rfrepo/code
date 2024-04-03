define(['controller/support/PrepareSectionContent/SectionDataBuilderStrategyFactory'],
    function () {
        'use strict';
        var SectionDataBuilderStrategyFactory = arguments[0];

        return puremvc.define({
                name: 'bmc.controller.command.PrepareSectionContentCommand',
                parent: puremvc.SimpleCommand
            },
            {
                execute: function (note) {

                    this.sendNotification(bmc.support.NotificationNames.PREPARING_SECTION_CONTENT);

                    var currentSection = note.getBody().type,
                        strategyFactory = this.createStrategyFactory();

                    strategyFactory.createStrategy(currentSection, this).generateContent(this);
                },

                createStrategyFactory: function () {
                    return new SectionDataBuilderStrategyFactory();
                }
            }
        );
    });