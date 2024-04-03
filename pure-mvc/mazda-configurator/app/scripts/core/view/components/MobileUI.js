define([
    'jquery',
    'support/HTMLAttributes',
    'support/HTMLTemplate',
    'support/HTMLTemplateURL',
    'support/ConfigurableType',
    'support/CarouselUtils',
    'support/UrlBuilder',
    'support/StringUtils',
    'view/components/HTMLComponentUI',
    'carousel',
    'staticCarousel'
], function () {
    'use strict';
    var HTMLAttributes = arguments[1],
        HTMLTemplate = arguments[2],
        HTMLTemplateURL = arguments[3],
        ConfigurableType = arguments[4],
        CarouselUtils = arguments[5],
        UrlBuilder = arguments[6],
        StringUtils = arguments[7],
        HTMLComponentUI = arguments[8];


    return puremvc.define({
            name: 'bmc.view.components.MobileUI',
            parent: HTMLComponentUI,
            constructor: function () {
                HTMLComponentUI.call(this, document.body, document.body);

                this.carouselItemsMap = {};
                this.carouselAdapter = {};
                this.carouselSection = ConfigurableType.GRADE;

                this.setNonDynamicText();
                this.setupEvents();
                this.initJQuery();
            }
        },
        {
            getConfiguration: function () {
                return this.configuration;
            },

            setConfiguration: function (simpleConfiguration) {
                this.configuration = simpleConfiguration;
                this.renderConfigurationValuesInActiveTrayItems();
                this.renderVehicleImages(this.configuration);
                this.renderSummary(this.configuration);
                this.renderWhichItemIsSelected();
            },

            renderWhichItemIsSelected: function () {
                if (this.carouselItemsMap[this.carouselSection]) {
                    this.setActiveConfigurableItem(
                        this.getSelectedCarouselItem(
                            this.carouselItemsMap[this.carouselSection]
                        )
                    );
                }
            },

            dispatchSectionClick: function (configurableType) {
                if (this.onSectionClick) {
                    this.onSectionClick(configurableType);
                }

                if (configurableType === bmc.support.GlobalConfig.getInstance().SUMMARY) {
                    this.setNewHeightOfPanel(configurableType);
                }
            },

            setCurrent: function (configurableType) {
                this.dispatchSectionClick(configurableType);
                this.toggleActive(this.getLiByConfigurableType(configurableType));
            },

            getLiByConfigurableType: function (configurableType) {
                var $anchor = jQuery('.' + HTMLAttributes.TRAY_CLASS +
                    ' a.' + HTMLAttributes.ANCHOR_CLASS_CLASS +
                    '.' + configurableType);

                return $anchor.parent();
            },

            setNonDynamicText: function () {
                this.setTrayText();
                this.setPageText();
            },

            setTrayText: function () {
                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    types = ConfigurableType.getTypes(),
                    numberOfTypes = types.length,
                    type,
                    summary = globalConfig.SUMMARY;

                while (numberOfTypes--) {
                    type = types[numberOfTypes];

                    jQuery(this.getTrayTitleSelector(type)).html(globalConfig.LANGUAGE[type]);
                }

                jQuery(this.getTrayTitleSelector(summary)).html(globalConfig.LANGUAGE[summary]);
            },

            getTrayTitleSelector: function (configurableType) {
                return '.' + configurableType + ' .title';
            },

            setPageText: function () {
                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    types = ConfigurableType.getTypes(),
                    numberOfTypes = types.length,
                    type,
                    summary = globalConfig.SUMMARY;

                while (numberOfTypes--) {
                    type = types[numberOfTypes];

                    jQuery(this.getPageTitleSelector(type)).html(globalConfig.LANGUAGE[type]);
                }

                jQuery(this.getPageTitleSelector(summary)).html(globalConfig.LANGUAGE[summary]);
                jQuery('.' + HTMLAttributes.SUMMARY_DEALER_BODY_CLASS).html(globalConfig.LANGUAGE.DEALER_LOCATOR_TITLE);
                jQuery('.' + HTMLAttributes.SUMMARY_DEALER_CLASS).append(
                    '<a href="' + globalConfig.DEALER_LOCATOR_LINK + '">' + globalConfig.LANGUAGE.GO + '</a>');

            },

            getPageTitleSelector: function (configurableType) {
                return '.' + configurableType + ' h2 span';
            },

            setupEvents: function () {
                this.setupClickEvents();
                this.setupResizeEvent();
            },

            setupClickEvents: function () {
                jQuery('.' + HTMLAttributes.MAZDA_BADGE_CLASS).click(function () {
                    window.location = bmc.support.GlobalConfig.getInstance().MARKET_HOME_PAGE;
                });
                this.setupTrayEvent();
                this.setupCarouselClickEvent();
            },

            setupTrayEvent: function () {
                var self = this;

                jQuery('.' + HTMLAttributes.SHOW_TRAY_CLASS).click(function () {
                    self.toggleTray();
                    return false;
                });
            },

            setupCarouselClickEvent: function () {
                var carouselUl = jQuery('.' + HTMLAttributes.CAROUSEL_ITEMS_CLASS + ' ul');

                carouselUl.on('click', '.thumbnail', this, this.setNewConfigurableItem);
                carouselUl.on('click', '.tick', this, this.setNewConfigurableItem);
                carouselUl.on('click', '.dropdown', function (event) {
                    var el = jQuery(event.currentTarget.parentNode).find('.engine-data')[0],
                        carouselWrapper = jQuery('.' + HTMLAttributes.CAROUSEL_WRAPPER_CLASS);
                    jQuery(event.currentTarget).toggleClass('dropdown-up');
                    carouselWrapper.css('height', jQuery(el).height() + carouselWrapper.css('height').split(0, -2));
                    jQuery(el).slideToggle(1000);
                });
            },

            setupResizeEvent: function () {
                var self = this;

                jQuery(window).resize(function () {
                    var carouselItems = jQuery('.' + HTMLAttributes.CAROUSEL_ITEMS_CLASS + ' .' +
                            HTMLAttributes.OPTION_CLASS),
                        newWidth = carouselItems.width();

                    carouselItems.each(function (index) {
                        jQuery(this).css('left', index * newWidth + 'px');
                    });

                    self.carouselAdapter.cache.optionW = newWidth;
                });
            },

            setNewConfigurableItem: function (event) {
                var id = event.currentTarget.parentNode.id,
                    self = event.data,
                    configurableItem;

                if (id) {
                    configurableItem =
                        self.getConfigurableItemVOByElementId(id);
                }

                if (self.onConfigurableItemSelected && configurableItem) {
                    self.onConfigurableItemSelected(configurableItem);
                }
            },

            setActiveConfigurableItem: function (configurableItemUIVO) {
                var id,
                    $li;

                if (configurableItemUIVO) {
                    id = configurableItemUIVO.getId();
                    $li = jQuery('#' + id).addClass(HTMLAttributes.SELECTED_CLASS);

                    $li.siblings().removeClass(HTMLAttributes.SELECTED_CLASS);
                }
            },

            getConfigurableItemVOByElementId: function (id) {
                var items = this.carouselItemsMap[this.carouselSection],
                    item,
                    numberOfItems = items ? items.length : 0;

                while (numberOfItems--) {
                    item = items[numberOfItems];

                    if (item.getId() === id) {
                        return item;
                    }
                }

                return null;
            },

            toggleTray: function () {
                jQuery('.' + HTMLAttributes.TRAY_CLASS).toggleClass(HTMLAttributes.TRAY_OPEN_CLASS);
                jQuery('.' + HTMLAttributes.PAGE_CLASS).toggleClass(HTMLAttributes.TRAY_OPEN_PAGE_CLASS);
            },

            renderVehicleName: function () {
                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    vehicleTitleSelector = '.' + HTMLAttributes.VEHICLE_TITLE_CLASS + ' .';

                jQuery(vehicleTitleSelector + HTMLAttributes.NAME_CLASS).html(
                    globalConfig.LANGUAGE[globalConfig.getVehicleId()]
                );
            },

            renderGlobalBodyStyleName: function () {
                var globalConfig = bmc.support.GlobalConfig.getInstance(),
                    vehicleName = globalConfig.LANGUAGE[globalConfig.getVehicleId()].toLowerCase(),
                    bodyStyleName = globalConfig.getBodyStyleVO().getName(),
                    vehicleTitleSelector = '.' + HTMLAttributes.VEHICLE_TITLE_CLASS + ' .';

                if (vehicleName !== bodyStyleName.toLowerCase()) {
                    jQuery(vehicleTitleSelector + HTMLAttributes.BODY_STYLE_CLASS).html(bodyStyleName);
                }
            },

            initJQuery: function () {
                var $carOptions = jQuery('.' + HTMLAttributes.CAR_OPTIONS_MOBILE_CLASS);

                $carOptions.removeClass(HTMLAttributes.HIDDEN_CLASS);
                $carOptions.contentcarousel(null, this.carouselAdapter);

                this.setupTrayClickHandlers();
                this.setupCarouselClickHandlers();
            },

            sliderInit: function () {
                jQuery('.' + HTMLAttributes.STATIC_CAR_VIEWS_CLASS).slidesjs({
                    width: 400,
                    height: 185,
                    pagination: {
                        active: true,
                        effect: 'slide'
                    },
                    navigation: {
                        active: false,
                        effect: 'slide'
                    }
                });
            },

            setupTrayClickHandlers: function () {
                var self = this,
                    $trayAnchors = jQuery('.' + HTMLAttributes.TRAY_CLASS + ' a.' +
                        HTMLAttributes.ANCHOR_CLASS_CLASS);

                $trayAnchors.click(function (el) {
                    var $activeLi = jQuery(el.target.parentElement.parentElement),
                        type = self.getConfigurableTypeFromAnchor(el.target.parentElement);

                    if (self.isValidType(type)) {
                        self.dispatchSectionClick(type);
                        self.animateToCarousel(jQuery('.' + HTMLAttributes.CURRENT_CLASS).index(),
                            $activeLi.index());
                        self.toggleActive($activeLi);
                        self.toggleTray();
                    }
                });
            },

            isValidType: function (type) {

                return type &&
                    type !== HTMLAttributes.ACTIVE_CLASS + ' ' + HTMLAttributes.CURRENT_CLASS;
            },

            animateToCarousel: function (currentIndex, newIndex) {
                var scrollFactor = newIndex - currentIndex,
                    dir = scrollFactor < 0 ? -1 : 1;

                this.carouselAdapter.settings.scroll = scrollFactor < 0 ? scrollFactor * -1 : scrollFactor;

                this.carouselAdapter.aux.navigate(dir, this.carouselAdapter.element, this.carouselAdapter.wrapper,
                    this.carouselAdapter.settings,
                    this.carouselAdapter.cache);

                this.carouselAdapter.settings.scroll = 1;
            },

            toggleActive: function ($activeLi) {

                jQuery(
                    '.' + HTMLAttributes.TRAY_CLASS + ' li.' + HTMLAttributes.CURRENT_CLASS
                ).removeClass(HTMLAttributes.CURRENT_CLASS);

                $activeLi.addClass(HTMLAttributes.ACTIVE_CLASS + ' ' + HTMLAttributes.CURRENT_CLASS);

                this.setActiveUpToSelected($activeLi);
                this.renderConfigurationValuesInActiveTrayItems();
            },

            setActiveUpToSelected: function ($activeLi) {

                jQuery('.' + HTMLAttributes.TRAY_CLASS + ' li').each(function (index, el) {
                    if ($activeLi[0] === el) {
                        return false;
                    }

                    jQuery(el).addClass(HTMLAttributes.ACTIVE_CLASS);

                    return true;
                });
            },

            setupCarouselClickHandlers: function () {
                var self = this;

                jQuery('.' + HTMLAttributes.CA_NAV_CLASS).click(function (event) {
                    if (event.target.className.indexOf(HTMLAttributes.CA_NAV_NEXT_CLASS) > -1) {
                        self.goToNextTrayLi();
                    } else {
                        self.goToPreviousTrayLi();
                    }
                });
            },

            goToNextTrayLi: function () {
                var $currentLi = this.getCurrentLi(),
                    nextEl = this.getNextTrayLi($currentLi);

                if (nextEl) {
                    this.setCurrent(this.getConfigurableTypeFromAnchor(nextEl.children[0]));
                }
            },

            getCurrentLi: function () {

                return jQuery('.' + HTMLAttributes.TRAY_CLASS + ' li.' + HTMLAttributes.CURRENT_CLASS);
            },

            getConfigurableTypeFromAnchor: function (anchor) {
                return anchor.className.replace('anchor-class ', '');
            },

            goToPreviousTrayLi: function () {
                var $currentLi = this.getCurrentLi(),
                    prevEl = this.getPreviousTrayLi($currentLi);

                this.setCurrent(this.getConfigurableTypeFromAnchor(prevEl.children[0]));
            },

            getNextTrayLi: function ($currentLi) {
                var el = $currentLi.next()[0];

                if (el) {
                    return el;
                } else {
                    return jQuery('.' + HTMLAttributes.TRAY_CLASS + ' li')[0];
                }
            },

            getPreviousTrayLi: function ($currentLi) {
                var el = $currentLi.prev()[0],
                    $Li;

                if (el) {
                    return el;
                } else {
                    $Li = jQuery('.' + HTMLAttributes.TRAY_CLASS + ' li');

                    return $Li[$Li.length - 1];
                }
            },

            updateSection: function (configurableItemUIVOs) {
                this.updateCarouselItemsMap(this.carouselSection, configurableItemUIVOs);
            },

            renderSection: function (configurableItemUIVOs) {
                var type = configurableItemUIVOs[0].getType(),
                    templateStr = HTMLTemplate.getSynchronously(
                        this.getCarouselTemplateUrl(type)
                    ),
                    $ul = jQuery('li.' + type + ' ul').empty();

                $ul.html(_.template(templateStr, {
                    activeItemIndex: this.getSelectedCarouselItem(configurableItemUIVOs),
                    items: configurableItemUIVOs
                }));

                this.carouselSection = type;
                this.setNewHeightOfPanel(type);
                this.updateCarouselItemsMap(type, configurableItemUIVOs);
                this.renderWhichItemIsSelected();
            },

            getSelectedCarouselItem: function (configurableItemUIVOs) {
                var activeItem = null;

                _.each(configurableItemUIVOs, function (item) {
                    if (item.getSelected()) {
                        activeItem = item;
                        return activeItem;
                    }

                    return true;
                });

                return activeItem;
            },

            setNewHeightOfPanel: function (type) {
                var newHeight;

                newHeight = jQuery('.' + type + ' ul').height();

                jQuery('.' + HTMLAttributes.CAROUSEL_WRAPPER_CLASS).css('height', newHeight + 150);
            },

            updateCarouselItemsMap: function (type, configurableItemVOs) {
                this.carouselItemsMap[type] = configurableItemVOs;
            },

            getCarouselTemplateUrl: function (type) {
                var swatchType = CarouselUtils.getSwatchType(type);

                if (swatchType === bmc.support.GlobalConstants.DEFAULT_SWATCH) {
                    return HTMLTemplateURL.MOBILE_TEXT_CAROUSEL_UI;
                } else {
                    return HTMLTemplateURL.MOBILE_IMAGE_CAROUSEL_UI;
                }
            },

            renderConfigurationValuesInActiveTrayItems: function () {
                var self = this;

                if (self.getConfiguration()) {
                    jQuery('.' + HTMLAttributes.TRAY_CLASS + ' li.active').children('a').each(function (index, el) {
                        var type = self.getConfigurableTypeFromAnchor(el);

                        if (type !== bmc.support.GlobalConfig.getInstance().SUMMARY) {
                            jQuery(el).children('.' + HTMLAttributes.OPTION_CLASS).html(
                                self.getConfiguration().getConfigurableItemVO(type).getName()
                            );
                        }
                    });
                }
            },

            renderVehicleImages: function (simpleConfigurationVO) {
                var self = this,
                    baseImgs = [],
                    wheelImgs = [],
                    loadCount = 0,
                    $carLoader = jQuery('.' + HTMLAttributes.CAR_LOADER_CLASS);

                function onImageLoaded() {
                    loadCount += 1;

                    if (loadCount === 8) {
                        self.writeVehicleImagesToDom(baseImgs, wheelImgs);
                        $carLoader.hide();

                        if (self.onVehicleLoaded) {
                            self.onVehicleLoaded();
                        }
                    }
                }

                $carLoader.show();

                this.createAllImages({
                    baseImgs: baseImgs,
                    wheelImgs: wheelImgs
                }, onImageLoaded, simpleConfigurationVO);
            },

            createAllImages: function (imageSettings, onImageLoaded, simpleConfigurationVO) {
                var total = 4,
                    index = total,
                    baseImg,
                    wheelImg;

                while (index--) {
                    imageSettings.baseImgs.push(new Image());
                    imageSettings.wheelImgs.push(new Image());

                    baseImg = imageSettings.baseImgs[imageSettings.baseImgs.length - 1];
                    wheelImg = imageSettings.wheelImgs[imageSettings.wheelImgs.length - 1];

                    baseImg.onload = onImageLoaded;
                    wheelImg.onload = onImageLoaded;

                    this.loadVehicleImages({
                        baseImg: baseImg,
                        wheelImg: wheelImg,
                        frameNumber: this.getSpinFrameNumber(index, total)
                    }, simpleConfigurationVO);
                }
            },

            getSpinFrameNumber: function (index, total) {
                if (index === total - 1) {
                    return 11;
                } else if (index === 0) {
                    return 2;
                } else {
                    return index * 3;
                }
            },

            loadVehicleImages: function (imageSettings, simpleConfigurationVO) {

                imageSettings.baseImg.src = this.addFrameNumber(
                    UrlBuilder.getBaseImageURL(simpleConfigurationVO),
                    imageSettings.frameNumber
                );
                imageSettings.wheelImg.src = this.addFrameNumber(
                    UrlBuilder.getWheelImageURL(simpleConfigurationVO),
                    imageSettings.frameNumber
                );
            },

            addFrameNumber: function (url, num) {
                num = String(num).length === 1 ? '0' + num : num;

                return url.splice(url.length - 4, 0, '_000' + num);
            },

            writeVehicleImagesToDom: function (baseImgs, wheelImgs) {
                var self = this,
                    carFrame = jQuery('.' + HTMLAttributes.CAR_SHOW_CLASS + ' .' + HTMLAttributes.CAR_FRAME_CLASS);

                carFrame.append('<div></div>');

                jQuery(carFrame.get().reverse()).each(function (index, el) {
                    jQuery(el).find('div img').remove();

                    self.prepareImageObject(baseImgs[index], HTMLAttributes.CAR_CLASS);
                    self.prepareImageObject(wheelImgs[index], HTMLAttributes.WHEELS_CLASS);

                    jQuery(el).children('div').append(baseImgs[index]);
                    jQuery(el).children('div').append(wheelImgs[index]);
                });

                this.sliderInit();
            },

            prepareImageObject: function (imageObj, type) {
                imageObj.className = HTMLAttributes.CAR_IMAGE_CLASS + ' ' + type;
            },

            renderSummary: function (simpleConfigurationVO) {

                this.renderSummaryMSC(
                    simpleConfigurationVO.getConfigurableItemVO(ConfigurableType.GRADE),
                    simpleConfigurationVO.getConfigurableItemVO(ConfigurableType.ENGINE)
                );

                this.renderSummaryNONMSC(simpleConfigurationVO.getConfigurableItemVO(ConfigurableType.COLOUR));
                this.renderSummaryNONMSC(simpleConfigurationVO.getConfigurableItemVO(ConfigurableType.WHEEL));
                this.renderSummaryNONMSC(simpleConfigurationVO.getConfigurableItemVO(ConfigurableType.TRIM));
            },

            renderSummaryMSC: function (gradeVO, engineVO) {

                jQuery('.' + ConfigurableType.GRADE + '-value').html(gradeVO.getName());
                jQuery('.' + ConfigurableType.ENGINE + '-value').html(engineVO.getName());
            },

            renderSummaryNONMSC: function (typeVO) {
                var type = typeVO.getType();

                jQuery('.' + type + '-value').html(typeVO.getName());
                jQuery('.' + type + '-price').html(this.getSummaryDisplayPrice(typeVO.getPrice()));
                this.renderSummaryImage(typeVO);
            },

            renderSummaryImage: function (typeVO) {
                var type = typeVO.getType(),
                    imageClass = type + '-image',
                    imageElement = jQuery('.' + imageClass),
                    imageUrl = bmc.support.UrlBuilder.getCompletedSwatchImagePath(typeVO.getType() + '/' +
                        typeVO.getThumbnail());

                if (imageElement.length > 0) {
                    imageElement.attr('src', imageUrl);
                } else {
                    jQuery('.' + type + '-price')
                        .after('<img class="' + imageClass + '" src="' + imageUrl + '" />');
                }
            },

            getSummaryDisplayPrice: function (price) {
                if (!price) {
                    return bmc.support.GlobalConfig.getInstance().LANGUAGE.NO_COST_OPTION;
                } else {
                    return StringUtils.formatPrice(price);
                }
            },

            renderPrice: function (price) {
                jQuery('.' + HTMLAttributes.VEHICLE_PRICE_CLASS + ' .' + HTMLAttributes.PRICE_VALUE_CLASS).html(
                    StringUtils.formatPrice(price));
            }
        },
        {});
});