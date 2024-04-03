define([
    'model/vo/data/DisclaimerVO',
    'support/ConfigurableType',
    'support/GlobalConstants'
], function () {
    'use strict';

    var ConfigurableType = arguments[1];

    return puremvc.define({
            name: 'bmc.model.proxy.data.DisclaimerProxy',
            parent: puremvc.Proxy,
            constructor: function () {
                puremvc.Proxy.call(this, bmc.model.proxy.data.DisclaimerProxy.NAME, []);
                this.setData({});
            }
        },
        {
            parseData: function (data) {
                var self = this;

                this.forEachDisclaimerTitle(function (disclaimerTitle) {
                    self.setDataVOs(data[disclaimerTitle], disclaimerTitle);
                });

                this.disclaimerDictionary = data.disclaimerDictionary;
            },

            setDataVOs: function (sectionData, section) {
                var index, dataVO, dataVOs = [],
                    data = this.getData();

                for (index = 0; index < sectionData.availability.length; index++) {
                    dataVO = this.buildDataVO(sectionData.availability[index]);
                    dataVOs.push(dataVO);
                }

                data[section] = dataVOs;
                this.setData(data);

            },

            buildDataVO: function (data) {
                var index, dataVO;

                dataVO = new bmc.model.vo.data.DisclaimerVO(data);

                if (data.preconditions) {
                    for (index = 0; index < data.preconditions.length; index++) {
                        dataVO.addPreconditionVO(this.buildDataVO(data.preconditions[index]));
                    }
                }

                return dataVO;
            },

            getDisclaimersByActiveConfiguration: function (activeConfiguration) {
                var data = this.getData(),
                    self = this,
                    criteria = this.getDisclaimerCriteria(activeConfiguration),
                    disclaimerValue, disclaimers = this.getEmptyDisclaimerObject(),
                    index, dataSection;

                this.forEachDisclaimerTitle(function (disclaimerSectionTitle) {
                    dataSection = data[disclaimerSectionTitle];

                    for (index = 0; index < dataSection.length; index++) {
                        disclaimerValue = self.getDisclaimerValue(dataSection[index], criteria);

                        if (disclaimerValue !== null) {
                            disclaimers[disclaimerSectionTitle].push(disclaimerValue);
                        }
                    }
                });

                return this.getSanitisedDisclaimerObject(disclaimers);
            },

            getSanitisedDisclaimerObject: function (disclaimerObject) {
                if (disclaimerObject[this.constructor.DISCLAIMER_TITLES[3]].length > 0) {
                    disclaimerObject[this.constructor.DISCLAIMER_TITLES[0]] =
                        disclaimerObject[this.constructor.DISCLAIMER_TITLES[3]];
                }

                delete disclaimerObject[this.constructor.DISCLAIMER_TITLES[3]];

                return disclaimerObject;
            },

            getDisclaimerValue: function (disclaimerVO, criteria) {
                var preconditions;

                preconditions = disclaimerVO.getPreconditions();

                if (criteria[disclaimerVO.getType()] === disclaimerVO.getId()) {
                    if (preconditions.length > 0) {
                        return this.getDisclaimerValue(preconditions[0], criteria);
                    } else {
                        return this.disclaimerDictionary[disclaimerVO.getValue()];
                    }
                }

                return null;
            },

            getEmptyDisclaimerObject: function () {
                var disclaimers = {};

                this.forEachDisclaimerTitle(function (disclaimerSectionTitle) {
                    disclaimers[disclaimerSectionTitle] = [];
                });

                return disclaimers;
            },

            getDisclaimerCriteria: function (activeConfiguration) {
                var criteria = {};

                criteria.msc = activeConfiguration.getBaseVehicleVO().getId();
                criteria[ConfigurableType.COLOUR] = activeConfiguration.getConfigurableItemVO(ConfigurableType.COLOUR)
                    .getId();

                return criteria;
            },

            forEachDisclaimerTitle: function (itemFunction) {
                var index,
                    disclaimerTitlesLength = this.constructor.DISCLAIMER_TITLES.length;

                for (index = 0; index < disclaimerTitlesLength; index++) {
                    itemFunction(this.constructor.DISCLAIMER_TITLES[index]);
                }
            }

        },
        {
            NAME: 'DisclaimerProxy',
            DISCLAIMER_TITLES: [
                bmc.support.GlobalConstants.DISCLAIMER_TITLES.disclaimerHeader,
                bmc.support.GlobalConstants.DISCLAIMER_TITLES.initialDisclaimer,
                bmc.support.GlobalConstants.DISCLAIMER_TITLES.rdpDisclaimer,
                bmc.support.GlobalConstants.DISCLAIMER_TITLES.promoDisclaimer,
                bmc.support.GlobalConstants.DISCLAIMER_TITLES.colourDisclaimer
            ]
        });
});