define([
    'model/support/constants/DependencyTypes',
    'model/vo/data/PreconditionVO',
    'model/vo/data/DependenciesVO'
], function () {
    'use strict';
    var DependencyTypes = arguments[0],
        PreconditionVO = arguments[1],
        DependenciesVO = arguments[2];

    return puremvc.define({
            name: 'bmc.model.support.DependencyDataParser'
        },
        {
            dependencyTypes: DependencyTypes.DEPENDENCY_TYPES,

            extractDependencies: function (dependencyData) {

                if (!dependencyData) {
                    return;
                }

                var i,
                    dependencyType,
                    dependencyVO = new DependenciesVO(),
                    numOfdependencyTypes = this.dependencyTypes.length;

                for (i = 0; i < numOfdependencyTypes; i++) {
                    dependencyType = this.dependencyTypes[i];

                    this.getPreconditionsForDependencyType(dependencyType, dependencyData[dependencyType],
                        dependencyVO);
                }

                return dependencyVO;
            },

            getPreconditionsForDependencyType: function (dependencyType, preconditions, dependencyVO) {

                var i,
                    preconditionSaveCallBack = this.getPreConditionSaveMethod(dependencyType, dependencyVO),
                    numOfPreconditions = preconditions ? preconditions.length : 0;

                for (i = 0; i < numOfPreconditions; i++) {
                    this.extractPrecondition(preconditions[i], preconditionSaveCallBack, dependencyVO);
                }

            },

            extractPrecondition: function (precondition, saveCallBack, saveCallBackScope) {

                var preconditionVO = this.createPreconditionVO();

                preconditionVO.setType(precondition.type);
                preconditionVO.setId(precondition.id);
                preconditionVO.setValue(precondition.value);

                if (precondition.preconditions && precondition.preconditions.length) {
                    this.extractNestedPrecondition(precondition.preconditions, preconditionVO.addPreconditions,
                        preconditionVO);
                }

                if (saveCallBack) {
                    saveCallBack.call(saveCallBackScope, preconditionVO);
                }
            },

            extractNestedPrecondition: function (preconditions, saveCallBack, saveCallBackScope) {
                var i,
                    numOfPreconditions = preconditions.length;

                for (i = 0; i < numOfPreconditions; i++) {
                    this.extractPrecondition(preconditions[i], saveCallBack, saveCallBackScope);
                }
            },

            createPreconditionVO: function () {
                return new PreconditionVO();
            },

            getPreConditionSaveMethod: function (dependencyType, dependencyVO) {
                var callBack;

                switch (dependencyType) {
                case DependencyTypes.AVAILABILITY :
                    callBack = dependencyVO.addAvailabilityPrecondition;
                    break;
                case DependencyTypes.PRICE :
                    callBack = dependencyVO.addPricePrecondition;
                    break;
                case DependencyTypes.SELECTION :
                    callBack = dependencyVO.addSelectionPrecondition;
                    break;
                case DependencyTypes.RENDER :
                    callBack = dependencyVO.addRenderPrecondition;
                    break;
                }

                return callBack;
            }
        }
    );
});