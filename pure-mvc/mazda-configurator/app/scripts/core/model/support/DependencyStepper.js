define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.model.support.DependencyStepper' },
        {},
        {
            isAvailable: function (criteriaVO, preconditions) {

                this.preconditionVO = undefined;
                this.recursions = 0;
                this.criteriaVO = criteriaVO;
                return this.traversePreconditions.call(this, preconditions);
            },

            getDependenciesOnType: function (type, preconditions) {

                var typesFound = [];
                this.sortType = type;
                this.searchPreconditionForType(preconditions, typesFound);

                return typesFound;
            },

            searchPreconditionForType: function (preconditions, typesFound) {

                var i,
                    preconditionVO,
                    numOfPreconditions = preconditions.length;

                for (i = 0; i < numOfPreconditions; i++) {

                    preconditionVO = preconditions[i];

                    if (preconditionVO.getType() === this.sortType) {
                        typesFound.push(preconditionVO);
                    } else if (preconditionVO.preconditions.length) {
                        this.searchPreconditionForType(preconditionVO.preconditions, typesFound);
                    }
                }
            },

            traversePreconditions: function (preconditions) {

                var i,
                    numOfPreconditions = preconditions.length,
                    isAvailable = false;

                this.recursions++;

                for (i = 0; i < numOfPreconditions; i++) {

                    if (this.preconditionVO) {
                        return true;
                    }

                    isAvailable = this.comparePreconditionAgainstKeyValues(preconditions[i]);

                    if (isAvailable && !preconditions[i].getPreconditions().length) {

                        this.setFoundPreconditionVO(preconditions[i]);
                        break;
                    }
                }
                return isAvailable;
            },

            comparePreconditionAgainstKeyValues: function (precondition) {

                var preconditionType = precondition.getType(),
                    isAvailable,
                    preconditions = precondition.getPreconditions();

                if (!this.criteriaVO[preconditionType]) {
                    return (this.recursions > 1);
                }

                isAvailable = this.criteriaVO[preconditionType] === precondition.getId();

                if (isAvailable && preconditions.length) {
                    isAvailable = this.traversePreconditions(preconditions);
                }

                return isAvailable;
            },

            setFoundPreconditionVO: function (preconditionVO) {
                this.preconditionVO = preconditionVO;
            },

            getFoundPreconditionVO: function () {
                return this.preconditionVO;
            }
        }
    );
})
;