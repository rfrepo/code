define([
    'controller/vo/ConfigurableItemUIVO',
    'model/proxy/NavigationProxy',
    'model/support/DependencyStepper',
    'model/proxy/data/ConfigurableItemProxy',
    'support/StringUtils',
    'support/UrlBuilder',
    'support/ConfigurableType'
], function () {

    'use strict';

    var ConfigurableItemUIVO = arguments[0],
        NavigationProxy = arguments[1],
        DependencyStepper = arguments[2],
        StringUtils = arguments[4],
        UrlBuilder = arguments[5],
        ConfigurableType = arguments[6];

    return puremvc.define({
            name: 'bmc.controller.support.PrepareSectionConfigurableItemUIVOs.' +
                'AbstractCreateConfigurableItemUIVOsStrategy',
            constructor: function (host, data) {
                this.host = host;
                this.data = data;
            }
        },
        {
            createAndDispatchConfigurableItemUIVOs: function () {

                this.configurableItemVOs = this.getSectionConfigurableItemVOs();
                this.sendNotification();
                this.configurableItemVOs = null;
            },

            getSectionConfigurableItemVOs: function () {

                var configurableType = this.getCurrentSection(),
                    configurableItemProxy = this.host.facade.retrieveProxy(configurableType),
                    configurableItemVOs = this.configureConfigurableItemVOs(
                        this.getConfigurableItemsVOsCompatibleWithCurrentConfiguration(
                            configurableItemProxy.getData()));

                return configurableItemVOs;
            },

            sendNotification: function () {
                this.host.sendNotification(this.getNotificationName(this.data.getName()),
                    this.createAndConfigureConfigurableItemUIVOs(this.configurableItemVOs));
            },

            getCurrentSection: function () {

                var navigationProxy = this.host.facade.retrieveProxy(NavigationProxy.NAME),
                    currentSection = navigationProxy.getActiveSectionVO() ?
                        navigationProxy.getActiveSectionVO().getType() : ConfigurableType.GRADE;

                return currentSection;
            },

            getNotificationName: function (notificationName) {

                var NotificationNames = bmc.support.NotificationNames;

                notificationName = (notificationName !== NotificationNames.ACTIVE_SECTION_UPDATED) ?
                    NotificationNames.CAROUSEL_UPDATE_DATA_AVAILABLE :
                    NotificationNames.CAROUSEL_REDRAW_DATA_AVAILABLE;

                return notificationName;
            },

            configureConfigurableItemVOs: function (configurableItemVOs) {

                configurableItemVOs = this.positionActiveItemToBeFirst(configurableItemVOs);

                this.host.sendNotification(
                    bmc.support.NotificationNames.SET_PRICE_ON_CONFIGURABLE_ITEMS, configurableItemVOs);

                return configurableItemVOs;
            },

            positionActiveItemToBeFirst: function (configurableItemVOs) {

                var itemVOOnActiveConfiguration = this.getActiveConfigurationVO().getConfigurableItemVO(
                    this.getCurrentSection());

                if (!itemVOOnActiveConfiguration) {
                    return configurableItemVOs;
                }

                configurableItemVOs = _(configurableItemVOs).sortBy(function (itemVO) {
                    return itemVO.getPrice();
                });

                configurableItemVOs = _.without(configurableItemVOs, _.findWhere(configurableItemVOs,
                    {id: itemVOOnActiveConfiguration.getId()}));

                configurableItemVOs.unshift(itemVOOnActiveConfiguration);

                return configurableItemVOs;
            },

            createAndConfigureConfigurableItemUIVOs: function (configurableItemsVOs) {

                var self = this,
                    configurableItemUIVO,
                    configurableItemUIVOs = [];
                _.each(configurableItemsVOs, function (configurableItemsVO) {

                    configurableItemUIVO = new ConfigurableItemUIVO(configurableItemsVO);

                    self.configureConfigurableItemUIVO(configurableItemUIVO, configurableItemsVO);

                    configurableItemUIVOs.push(configurableItemUIVO);
                });

                return configurableItemUIVOs;
            },

            configureConfigurableItemUIVO: function (configurableItemUIVO, configurableItemVO) {

                this.setFormattedPriceText(configurableItemUIVO, configurableItemVO);
                this.setThumbnailURL(configurableItemUIVO, configurableItemVO);
                this.setSelected(configurableItemUIVO, configurableItemVO);

                if (this.hasDynamicProperties(configurableItemVO)) {
                    this.setDependencyProperties(configurableItemUIVO, configurableItemVO);
                } else {
                    configurableItemUIVO.setCallToActionText(
                        bmc.support.GlobalConfig.getInstance().LANGUAGE.CHANGE_GRADE);
                }
            },

            setFormattedPriceText: function (configurableItemUIVO, configurableItemVO) {

                var price = configurableItemVO.getPrice();

                price = (Number(price) === 0) ? bmc.support.GlobalConfig.getInstance().LANGUAGE.NO_COST_OPTION
                    : this.setPrefixToPrice(configurableItemVO.getType(),
                    StringUtils.formatPrice(price));

                configurableItemUIVO.setFormattedPriceText(price);
            },

            setPrefixToPrice: function (type, price) {
                if (type === ConfigurableType.ENGINE || type === ConfigurableType.GRADE) {
                    price = bmc.support.GlobalConfig.getInstance().LANGUAGE.FROM + ' ' + price;
                }

                return price;
            },

            setThumbnailURL: function (configurableItemUIVO, configurableItemVO) {

                var thumbnailURL = configurableItemVO.getImageFileName();

                if (thumbnailURL !== '') {

                    thumbnailURL = UrlBuilder.getSwatchURL(
                        configurableItemVO.getType(), thumbnailURL);

                    configurableItemUIVO.setThumbnailURL(thumbnailURL);
                }
            },

            setDependencyProperties: function (configurableItemUIVO, configurableItemVO) {

                var activeConfigurationVO = this.host.facade.retrieveProxy(
                        bmc.model.proxy.ActiveConfigurationProxy.NAME).getSimplified(),

                    configurableItemVOAvailabilityPreconditions =
                        configurableItemVO.getDependencies().getAvailabilityPrecondition(),

                    isAvailableOnConfiguration =
                        DependencyStepper.isAvailable(
                            activeConfigurationVO.getTypeIdValuePairObjectFromCurrentItemVOs(),
                            configurableItemVOAvailabilityPreconditions),

                    callToActionText = isAvailableOnConfiguration ?
                        bmc.support.GlobalConfig.getInstance().LANGUAGE.SELECT :
                        bmc.support.GlobalConfig.getInstance().LANGUAGE.CHANGE_GRADE;

                if (isAvailableOnConfiguration || configurableItemUIVO.getSelected()) {
                    configurableItemUIVO.setAvailableOnGradeText('&nbsp');
                } else {
                    this.setAvailableOnGradeText(configurableItemUIVO, configurableItemVO);
                }

                configurableItemUIVO.setCallToActionText(callToActionText);
            },

            setAvailableOnGradeText: function (configurableItemUIVO, configurableItemVO) {

                var currentBodyStyleId =
                        this.getActiveConfigurationVOAsValuePairObject()[ConfigurableType.BODYSTYLE],

                    preconditionVO = this.preconditionsForCurrentBodyStyle(currentBodyStyleId, configurableItemVO),

                    dependencies = DependencyStepper.getDependenciesOnType(
                        ConfigurableType.GRADE, preconditionVO),

                    gradeId = dependencies[0].getId();

                configurableItemUIVO.setAvailableOnGradeText(this.getGradeName(gradeId));
            },

            preconditionsForCurrentBodyStyle: function (currentBodyStyleId, configurableItemVO) {

                var i = 0,
                    preconditionVO = configurableItemVO.getDependencies().getAvailabilityPrecondition(),
                    totalPreconditions = preconditionVO.length;

                for (i; i < totalPreconditions; i++) {

                    if (preconditionVO[i].getId() === currentBodyStyleId) {
                        return preconditionVO[i].preconditions;
                    }
                }
            },

            getGradeName: function (gradeId) {

                var gradeProxy = this.host.facade.retrieveProxy(ConfigurableType.GRADE),
                    gradeVO = gradeProxy.getById(gradeId);

                return gradeVO.getName();
            },

            hasDynamicProperties: function (configurableItemVO) {
                return Boolean(configurableItemVO.getType() === ConfigurableType.ENGINE);
            },

            setSelected: function (configurableItemUIVO, configurableItemVO) {

                var configurableItemType = configurableItemVO.getType(),

                    activeConfigurationVO = this.host.facade.retrieveProxy(
                        bmc.model.proxy.ActiveConfigurationProxy.NAME).getSimplified(),

                    currentTypeVO = activeConfigurationVO.getConfigurableItemVO(configurableItemType);

                if (currentTypeVO) {
                    configurableItemUIVO.setSelected(Boolean(currentTypeVO.getId() === configurableItemVO.getId()));
                }
            },

            getConfigurableItemsVOsCompatibleWithCurrentConfiguration: function (configurableItemVOs) {

                var i = 0,
                    configurableItemVO,
                    filteredConfigurableItemVOs = [],
                    availabilityPreconditions,
                    dependencyStepper = DependencyStepper,
                    numberOfConfigurableItems = configurableItemVOs.length,
                    criteria = this.getCriteria();

                for (i; i < numberOfConfigurableItems; i += 1) {

                    configurableItemVO = configurableItemVOs[i];
                    availabilityPreconditions = configurableItemVO.getDependencies().getAvailabilityPrecondition();

                    if (dependencyStepper.isAvailable(criteria, availabilityPreconditions)) {
                        filteredConfigurableItemVOs.push(configurableItemVO);
                    }
                }

                return filteredConfigurableItemVOs;
            },

            getCriteria: function () {
                var criteria = [];

                criteria[ConfigurableType.BODYSTYLE] =  this.getActiveConfigurationVO().getConfigurableItemVO(
                    ConfigurableType.BODYSTYLE).getId();

                if (this.configurableItemVOsShouldBeFiltered()) {
                    criteria = this.getActiveConfigurationVOAsValuePairObject();
                }

                return criteria;
            },

            getActiveConfigurationVO: function () {
                return this.host.facade.retrieveProxy(bmc.model.proxy.ActiveConfigurationProxy.NAME).getSimplified();
            },

            getActiveConfigurationVOAsValuePairObject: function () {
                return this.getActiveConfigurationVO().getTypeIdValuePairObjectFromCurrentItemVOs();
            },

            configurableItemVOsShouldBeFiltered: function () {

                var configurableType = this.getCurrentSection();
                return Boolean(configurableType === ConfigurableType.COLOUR) ||
                    Boolean(configurableType === ConfigurableType.WHEEL) ||
                    Boolean(configurableType === ConfigurableType.ACCESSORIES) ||
                    Boolean(configurableType === ConfigurableType.OPTIONPACK);
            }
        }
    );
})
;