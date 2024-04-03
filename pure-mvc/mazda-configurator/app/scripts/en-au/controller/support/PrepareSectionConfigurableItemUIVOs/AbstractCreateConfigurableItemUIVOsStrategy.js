define([
    '../../../../core/controller/support/PrepareSectionConfigurableItemUIVOs/AbstractCreateConfigurableItemUIVOsStrategy',
    'support/StringUtils',
    'support/ConfigurableType'
], function () {

    'use strict';

    var AbstractCreateConfigurableItemUIVOsStrategy = arguments[0],
        StringUtils = arguments[1],
        ConfigurableType = arguments[2];

    return puremvc.define({
            name: 'bmc.controller.support.PrepareSectionConfigurableItemUIVOs.' +
                'AbstractCreateConfigurableItemUIVOsStrategy',
            parent: AbstractCreateConfigurableItemUIVOsStrategy

        },
        {
            setFormattedPriceText: function (configurableItemUIVO, configurableItemVO) {

                var price = configurableItemVO.getType() === ConfigurableType.COLOUR ?
                    configurableItemVO.getDisplayPrice() : configurableItemVO.getPrice();

                price = (Number(price) === 0) ? bmc.support.GlobalConfig.getInstance().LANGUAGE.NO_COST_OPTION
                    : this.setPrefixToPrice(configurableItemVO.getType(),
                    StringUtils.formatPrice(price));

                configurableItemUIVO.setFormattedPriceText(price);
            },

            configurableItemVOsShouldBeFiltered: function () {

                var configurableType = this.getCurrentSection();
                return Boolean(configurableType === ConfigurableType.COLOUR) ||
                    Boolean(configurableType === ConfigurableType.WHEEL) ||
                    Boolean(configurableType === ConfigurableType.TRIM) ||
                    Boolean(configurableType === ConfigurableType.ACCESSORIES) ||
                    Boolean(configurableType === ConfigurableType.OPTIONPACK);
            }
        }
    );
});