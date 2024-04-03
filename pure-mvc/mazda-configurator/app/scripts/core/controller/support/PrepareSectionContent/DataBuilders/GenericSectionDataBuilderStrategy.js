define(['support/NotificationNames',
    'controller/support/PrepareSectionContent/DataBuilders/AbstractSectionDataBuilderStrategy'
], function () {
    'use strict';
    var NotificationNames = arguments[0],
        AbstractSectionDataBuilderStrategy = arguments[1];

    return puremvc.define({
            name: 'bmc.controller.support.PrepareSectionContent.GenericSectionDataBuilderStrategy',
            parent: AbstractSectionDataBuilderStrategy,
            constructor: function (host, currentSection) {
                this.host = host;
                AbstractSectionDataBuilderStrategy.call(this, host, currentSection);
            }
        },
        {
            generateContent: function () {

                this.sectionDataVO.setDisclaimer(this.getDisclaimer());
                this.host.sendNotification(NotificationNames.SECTION_DATA_AVAILABLE, this.sectionDataVO);
            }
        }
    );
});