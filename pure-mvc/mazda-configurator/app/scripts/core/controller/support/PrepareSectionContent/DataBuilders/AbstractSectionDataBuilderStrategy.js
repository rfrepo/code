define(['model/vo/SectionDataVO'],
    function () {
        'use strict';
        var SectionDataVO = arguments[0];

        return puremvc.define({
                name: 'bmc.controller.support.PrepareSectionContent.DataBuilders.' +
                    'AbstractSectionDataBuilderStrategy',
                constructor: function (host, currentSection) {

                    this.host = host;
                    this.currentSection = currentSection;
                    this.sectionDataVO = new SectionDataVO();

                    var dataBuilderPackage = bmc.controller.support.PrepareSectionContent.DataBuilders;
                    this.superClass = dataBuilderPackage.AbstractSectionDataBuilderStrategy.prototype;
                }
            },
            {
                generateContent: function () {

                    this.sectionDataVO.setDisclaimer(this.getDisclaimer());
                    this.sectionDataVO.setSectionName(this.currentSection);
                },

                getProxy: function (proxyName) {
                    return this.host.facade.retrieveProxy(proxyName);
                },

                getDisclaimer: function () {
                    return this.getProxy(this.currentSection).getDisclaimer();
                }
            }
        );
    }
);