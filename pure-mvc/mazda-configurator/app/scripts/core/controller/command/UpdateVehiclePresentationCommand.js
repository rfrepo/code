define(['model/proxy/ActiveConfigurationProxy',
    'support/NotificationNames',
    'support/UrlBuilder',
    'view/vo/VehiclePresentationVO',
    'model/proxy/NavigationProxy',
    'model/proxy/VehiclePresentationProxy'],
    function () {
        'use strict';
        var ActiveConfigurationProxy = arguments[0],
            NotificationNames = arguments[1],
            UrlBuilder = arguments[2],
            VehiclePresentationVO = arguments[3],
            NavigationProxy = arguments[4],
            VehiclePresentationProxy = arguments[5];

        return puremvc.define({
                name: 'bmc.controller.command.UpdateVehiclePresentationCommand',
                parent: puremvc.SimpleCommand
            },
            {
                execute: function (note) {

                    var activeConfigurationVO = this.getActiveConfigurationVO();

                    this.itemsChanged = [];
                    this.isStartup = note.getName() === NotificationNames.MODEL_DATA_LOADED;

                    this.determineVisualChangesOnActiveConfiguration(activeConfigurationVO);

                    if (this.isStartup || this.itemsChanged.length) {
                        this.sendNotification(
                            NotificationNames.VEHICLE_PRESENTATION_UPDATE, this.itemsChanged);
                    }
                },

                determineVisualChangesOnActiveConfiguration: function (activeConfigurationVO) {

                    this.determineBaseVehicleChanges(activeConfigurationVO);
                    this.determineWheelChanges(activeConfigurationVO);
                    this.determineAccessoryChanges(activeConfigurationVO);
                    this.determineTrimChanges(activeConfigurationVO);
                },

                determineBaseVehicleChanges: function (activeConfigurationVO) {

                    var currentBaseVehicleImageURL = UrlBuilder.getBaseImageURL(activeConfigurationVO);
                    this.saveConfigurableItemURL('base', currentBaseVehicleImageURL);
                },

                determineWheelChanges: function (activeConfigurationVO) {

                    var currentWheelImageURL = UrlBuilder.getWheelImageURL(activeConfigurationVO);
                    this.saveConfigurableItemURL('wheel', currentWheelImageURL);
                },

                determineTrimChanges: function (activeConfigurationVO) {

                    var currentTrimImageURL = UrlBuilder.getTrimImageURL(activeConfigurationVO);
                    this.saveConfigurableItemURL('trim', currentTrimImageURL);
                },

                determineAccessoryChanges: function (activeConfigurationVO) {

                    this.removeAccessories(activeConfigurationVO);
                    this.addAccessories(activeConfigurationVO);
                },

                addAccessories: function (activeConfigurationVO) {

                    var self = this,
                        storeConfiguration,
                        currentAccessoryImageURL,
                        accessoryVOs = activeConfigurationVO.getAccessoryVOs();

                    _.each(accessoryVOs, function (accessoryVO) {

                        currentAccessoryImageURL =
                            UrlBuilder.getAccessoryImageURL(accessoryVO, activeConfigurationVO);

                        if (currentAccessoryImageURL !== null) {

                            storeConfiguration = {
                                storageKey: 'accessory_' + accessoryVO.getId(),
                                layerDataId: accessoryVO.getId()
                            };

                            self.saveConfigurableItemURL('accessories',
                                currentAccessoryImageURL,
                                storeConfiguration);
                        }
                    });
                },

                removeAccessories: function (activeConfigurationVO) {

                    var self = this,
                        vehiclePresentationVO,
                        currentAccessoryVOs = activeConfigurationVO.getAccessoryVOs(),
                        previousAccessoryVOs = activeConfigurationVO.getPreviousConfigurationVO().getAccessoryVOs(),
                        accessoryVOsNotInPreviousConfiguration =
                            _.difference(previousAccessoryVOs, currentAccessoryVOs);

                    _.each(accessoryVOsNotInPreviousConfiguration, function (accessoryVO) {

                        if (self.accessoryHadRenderOnVehiclePresentation(accessoryVO)) {

                            vehiclePresentationVO = new VehiclePresentationVO();

                            vehiclePresentationVO.layer = 'accessories_' + accessoryVO.getId();
                            vehiclePresentationVO.layerDataId = accessoryVO.getId();
                            vehiclePresentationVO.remove = true;

                            self.itemsChanged.push(vehiclePresentationVO);
                            self.storeImageURLinProxy('accessory_' + accessoryVO.getId());
                        }
                    });
                },


                accessoryHadRenderOnVehiclePresentation: function (accessoryVO) {

                    var accessoryURL = this.getPreviousImageURL('accessory_' + accessoryVO.getId());

                    return Boolean(accessoryURL !== '' && accessoryURL !== undefined);
                },

                saveConfigurableItemURL: function (itemType, newImageURL, configuration) {

                    var storageKey = configuration ? configuration.storageKey : itemType,
                        previousImageURL = this.getPreviousImageURL(storageKey);
                    if (newImageURL !== previousImageURL || this.isStartup) {

                        this.storeImageURLinProxy(storageKey, newImageURL);
                        this.storeImageURLinChangedItems(itemType, newImageURL, configuration);
                    }
                },

                storeImageURLinChangedItems: function (itemType, newImageURL, configuration) {

                    var vehiclePresentationVO = new VehiclePresentationVO();

                    vehiclePresentationVO.layer = itemType;
                    vehiclePresentationVO.imageURL = newImageURL;
                    vehiclePresentationVO.layerDataId = configuration ? configuration.layerDataId : itemType;
                    vehiclePresentationVO.section = this.getCurrentSection();

                    this.itemsChanged.push(vehiclePresentationVO);
                },

                getActiveConfigurationVO: function () {
                    return this.facade.retrieveProxy(ActiveConfigurationProxy.NAME).getSimplified();
                },

                getVehiclePresentationProxy: function () {
                    return this.facade.retrieveProxy(VehiclePresentationProxy.NAME);
                },

                getCurrentSection: function () {

                    var navigationProxy = this.facade.retrieveProxy(NavigationProxy.NAME);
                    return (navigationProxy.getActiveSectionVO()) ?
                        navigationProxy.getActiveSectionVO().getType() : 'grade';
                },

                getPreviousImageURL: function (id) {
                    return this.getVehiclePresentationProxy().getImagePathById(id);
                },

                storeImageURLinProxy: function (id, url) {
                    this.getVehiclePresentationProxy().storeImagePaths(id, url);
                }
            }
        );
    })
;