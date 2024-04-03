define([
    'easing',
    'support/HTMLAttributes',
    'support/HTMLTemplateURL',
    'view/components/support/Carousel',
    'view/components/HTMLComponentUI',
    'support/StringUtils',
    'support/ConfigurableType'
], function () {
    'use strict';
    var HTMLAttributes = arguments[1],
        HTMLTemplateURL = arguments[2],
        Carousel = arguments[3],
        HTMLComponentUI = arguments[4],
        ConfigurableType = arguments[6];

    return puremvc.define({
            name: 'bmc.view.components.ConfigurableItemCarousel',
            parent: HTMLComponentUI,
            constructor: function (parentSelector) {

                HTMLComponentUI.call(this,
                    parentSelector,
                    parentSelector,
                    HTMLTemplateURL.CONFIGURABLE_ITEM_UI
                );

                this.configurableItemVOs = [];
                this.setupConfigurableItemListeners();
                this.createCarousel();
            }
        },
        {
            setupConfigurableItemListeners: function () {
                var self = this,
                    handleClick = function (event) {
                        self.dispatchItemSelected(event);
                    };
                jQuery(this.getParentSelector()).delegate('[data-vo-index]', 'click', handleClick);
            },

            createCarousel: function () {

                var self = this;
                this.carousel = new Carousel(
                    '.' + HTMLAttributes.CAROUSEL_WRAPPER_CLASS, this.constructor.CAROUSEL_VIEW_ITEMS);

                function handleCarouselUpdate(event, data) {
                    self.dispatchCarouselUpdate(event, data);
                }

                jQuery(this.carousel).on(this.carousel.constructor.UPDATED, handleCarouselUpdate);
            },

            setData: function (data) {

                if (data.length && this.hasTypesOfInterest(data[0].getType())) {

                    var self = this;

                    self.carousel.initialise();

                    this.clearContentCarousel();
                    this.configurableItemVOs = data;
                    this.prepareDataAndRender();
                    this.configureCarouselForCurrentSection(data[0].getType());

                    setTimeout(function () {
                        self.carousel.initialise();
                    }, 40);
                }
            },

            hasTypesOfInterest: function (type) {
                return !(type === ConfigurableType.ACCESSORIES || type === ConfigurableType.OPTIONPACK);
            },

            updateUI: function (configurableItemUIVOs) {
                var self = this;

                jQuery(this.getParentSelector()).find('li div').each(function () {

                    var listItem = this,
                        dataId = listItem.getAttribute('data-id');

                    _.map(configurableItemUIVOs, function (configurableItemUIVO) {

                        if (configurableItemUIVO.getId() === dataId) {
                            self.updateItemProperties(listItem, configurableItemUIVO);
                        }
                    });
                });
            },

            updateItemProperties: function (listItem, updatedConfigurableItemUIVO) {

                listItem = jQuery(listItem);

                if (updatedConfigurableItemUIVO.getSelected()) {
                    listItem.find('div').addClass(HTMLAttributes.SELECTED_CAROUSEL_ITEM_CLASS);
                } else {
                    listItem.find('div').removeClass(HTMLAttributes.SELECTED_CAROUSEL_ITEM_CLASS);
                }

                listItem.find('a').html(updatedConfigurableItemUIVO.getCallToActionText());
                listItem.find('.availableOnGrade').html(updatedConfigurableItemUIVO.getAvailabelOnGradeText());
            },

            getPreparedData: function (data, index) {
                var swatchType = this.findSwatchType(data.getType()),
                    engineData,
                    preparedData = {
                        dataVOIndex: 'data-vo-index=' + index,
                        isEngine: data.configurableItemVO.getTransmission,
                        dataId: 'data-id=' + data.getId(),
                        imageURL: data.getThumbnailURL(),
                        type: data.getType(),
                        price: data.getFormattedPriceText(),
                        callToAction: data.getCallToActionText(),
                        availabelOnGradeText: data.getAvailabelOnGradeText(),
                        name: data.getName(),
                        selectedClass: data.getSelected() ? HTMLAttributes.SELECTED_CAROUSEL_ITEM_CLASS :
                            '',
                        isDefaultSwatch: (swatchType ===
                            bmc.support.GlobalConfig.getInstance().globalConstants.DEFAULT_SWATCH)
                    };

                if (data.configurableItemVO.getTransmission) {


                    engineData = data.configurableItemVO;
                    preparedData.engineName = engineData.getEngineSize() +
                        ' (' + engineData.getEnginePower() +
                        bmc.support.GlobalConfig.getInstance().LANGUAGE.ENGINE.POWER_SUFFIX + ') ' +
                        engineData.getFuelType();
                    preparedData.engineTransmission = engineData.getTransmission();

                }

                return preparedData;
            },

            prepareDataAndRender: function () {

                var self = this,
                    preparedData;

                this.configurableItemVOs = _.sortBy(this.configurableItemVOs, function (data) {
                    if (bmc.support.GlobalConfig.getInstance().LANGUAGE.CHANGE_GRADE === data.getCallToActionText()) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                _.each(this.configurableItemVOs, function (configurableItemVO, index) {
                    preparedData = self.getPreparedData(configurableItemVO, index);
                    self.render(preparedData);
                });

            },

            show: function () {
                jQuery(this.getParentSelector()).show();
            },

            hide: function () {
                jQuery(this.getParentSelector()).hide();
            },

            configureCarouselForCurrentSection: function (section) {

                var carousel = jQuery('.' + bmc.support.HTMLAttributes.CAROUSEL_WRAPPER_CLASS),
                    isOffset = Boolean(section === bmc.support.ConfigurableType.GRADE) ||
                        Boolean(section === bmc.support.ConfigurableType.ENGINE);

                this.carousel.itemsInView = isOffset ? 3 : 4;
                carousel.css({left: isOffset ? 237 : 0 });
            },

            findSwatchType: function (type) {
                var swatchType = bmc.support.GlobalConfig.getInstance().globalConstants.SWATCH_TYPE[type];
                if (swatchType) {
                    return swatchType;
                }
                return bmc.support.GlobalConfig.getInstance().globalConstants.DEFAULT_SWATCH;
            },

            clearContentCarousel: function () {
                jQuery(this.getParentSelector()).empty();
            },

            dispatchItemSelected: function (event) {
                var dataIndex = event.currentTarget.getAttribute('data-vo-index');
                if (this.onItemSelected) {
                    this.onItemSelected(event, this.configurableItemVOs[dataIndex].configurableItemVO);
                }
            },

            dispatchCarouselUpdate: function (event, data) {
                if (this.onCarouselUpdate) {
                    event.type = this.constructor.CAROUSEL_UPDATED;
                    this.onCarouselUpdate(event, data);
                }
            }

        },
        {
            ITEM_SELECTED: 'carousel-item-selected',
            CAROUSEL_VIEW_ITEMS: 4,
            CAROUSEL_UPDATED: 'carousel-position-updated'
        });
});
