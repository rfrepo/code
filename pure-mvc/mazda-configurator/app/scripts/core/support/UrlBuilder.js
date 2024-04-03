define([
    'model/vo/SimpleConfigurationVO',
    'support/ConfigurableType',
    'model/support/DependencyStepper'
], function () {
    'use strict';
    var ConfigurableType = arguments[1],
        DependencyStepper = arguments[2];

    return puremvc.define({
            name: 'bmc.support.UrlBuilder'
        },
        {

        },
        {
            getBaseImageURL: function (activeConfigurationVO) {

                var path = this.getCompletedExteriorImagePath('base/' +
                    this.getBodyStyleId(activeConfigurationVO) + '_' +
                    this.getGradeId(activeConfigurationVO) + '_' +
                    this.getConfigurableItemVOId(ConfigurableType.COLOUR, activeConfigurationVO) + '.jpg');

                return this.replacePlaceHolderVehicleId(path);
            },

            getWheelImageURL: function (activeConfigurationVO) {

                var configurableItemVO =
                        this.getConfigurableItemVO(ConfigurableType.WHEEL, activeConfigurationVO),
                    path = this.getCompletedExteriorImagePath('wheel/' +
                        this.getConfigurableItemVORenderImageURL(configurableItemVO, activeConfigurationVO));

                return this.replacePlaceHolderVehicleId(path);
            },

            getTrimImageURL: function (activeConfigurationVO) {

                var configurableItemVO =
                        this.getConfigurableItemVO(ConfigurableType.TRIM, activeConfigurationVO),
                    path = this.getCompletedInteriorImagePath(
                        this.getConfigurableItemVORenderImageURL(configurableItemVO, activeConfigurationVO));

                return this.replacePlaceHolderVehicleId(path);
            },

            getAccessoryImageURL: function (accessoryVO, activeConfigurationVO) {

                var path = this.getCompletedAccessoriesImagePath('accessories/' +
                    this.getConfigurableItemVORenderImageURL(accessoryVO, activeConfigurationVO) + '.png');

                return this.doesAccessoryHaveARender(accessoryVO.getId(), path) ?
                    this.replacePlaceHolderVehicleId(path) : null;
            },

            getSwatchURL: function (type, path) {
                return this.replacePlaceHolderVehicleId(this.getCompletedSwatchImagePath(type + '/' + path));
            },

            getInitialFrameBaseImageURL: function (activeConfigurationVO) {

                var url = this.getBaseImageURL(activeConfigurationVO);
                return this.insertIntialFrameNumbers(url);
            },

            getInitialFrameWheelImageURL: function (activeConfigurationVO) {

                var url = this.getWheelImageURL(activeConfigurationVO);
                return this.insertIntialFrameNumbers(url);
            },

            getInitialFrameAccessoryImageURL: function (accessoryVO, activeConfigurationVO) {

                var path = this.getCompletedAccessoriesImagePath('accessories/' +
                    this.getConfigurableItemVORenderImageURL(accessoryVO, activeConfigurationVO));
                path = this.replacePlaceHolderVehicleId(path);

                return this.doesAccessoryHaveARender(accessoryVO.getId(), path) ?
                    this.insertIntialFrameNumbers(path) : null;
            },

            replacePlaceHolderVehicleId: function (url) {

                var globalConfig = bmc.support.GlobalConfig.getInstance();
                return url.replace('[[vehicleId]]', globalConfig.getVehicleId().toLowerCase());
            },

            getCompletedExteriorImagePath: function (path) {
                return this.getVehicleImageBasePath() + 'vehicle_presentation/exterior/' + path;
            },

            getCompletedInteriorImagePath: function (path) {
                return this.getVehicleImageBasePath() + 'vehicle_presentation/interior/' + path;
            },

            getCompletedAccessoriesImagePath: function (path) {
                return this.getVehicleImageBasePath() + 'vehicle_presentation/' + path;
            },

            getCompletedSwatchImagePath: function (path) {
                return this.replacePlaceHolderVehicleId(this.getVehicleImageBasePath() + 'ui/swatches/' + path);
            },

            getCompletedModelImagePath: function (path) {
                return this.getVehicleImageBasePath() + 'ui/model_thumnbnail/' + path;
            },

            getVehicleImageBasePath: function () {

                return urlExtractor.getResourcesUrl() +
                    bmc.support.GlobalConfig.getInstance().VEHICLE_SPECIFIC_IMAGE_BASE_PATH;
            },
            getApplicationImageBasePath: function () {

                return urlExtractor.getResourcesUrl() +
                    bmc.support.GlobalConfig.getInstance().APPLICATION_IMAGE_BASE_PATH;
            },

            getBodyStyleId: function (activeConfigurationVO) {
                return  activeConfigurationVO.getBaseVehicleVO().getBodyStyleVO().getId();
            },

            getGradeId: function (activeConfigurationVO) {
                return  activeConfigurationVO.getBaseVehicleVO().getGradeVO().getId();
            },

            getConfigurableItemVOId: function (type, activeConfigurationVO) {
                return  activeConfigurationVO.getConfigurableItemVO(type).getId();
            },

            insertIntialFrameNumbers: function (url) {
                return url.split('.jpg').join('_00000.jpg').split('.png').join('_00000.png');
            },

            getConfigurableItemVORenderImageURL: function (configurableItemVO, activeConfigurationVO) {

                var path = '',
                    dependencyStepper = DependencyStepper,
                    criteriaVO = this.getCriteriaVO(activeConfigurationVO),
                    renderPrecondition = configurableItemVO.getDependencies().getRenderPrecondition();

                if (dependencyStepper.isAvailable(criteriaVO, renderPrecondition)) {
                    path = dependencyStepper.getFoundPreconditionVO().value;
                }
                else {
                    path = this.checkForDefaultImagePath(renderPrecondition);
                }

                return path;
            },

            getCriteriaVO: function (activeConfigurationVO) {

                return activeConfigurationVO.getTypeIdValuePairObjectFromCurrentItemVOs();
            },

            getConfigurableItemVO: function (type, activeConfigurationVO) {
                return activeConfigurationVO.getConfigurableItemVO(type);
            },

            doesAccessoryHaveARender: function (accessoryId, path) {
                return Boolean(path.indexOf(accessoryId) !== -1);
            },

            checkForDefaultImagePath: function (renderPrecondition) {

                var path = '';

                _.each(renderPrecondition, function (preconditionVO) {

                    if (preconditionVO.type === 'default') {
                        path = preconditionVO.value;
                    }
                });

                return path;
            },

            FILE_EXTENSION_JPG: '.jpg',
            FILE_EXTENSION_PNG: '.png'
        }
    );
});
