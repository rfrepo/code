define([], function () {
    'use strict';

    return puremvc.define({
            name: 'bmc.model.vo.UserJourneyVO',
            constructor: function () {
                this.userJourney = this.initialiseUserJourney();
            }
        },
        {
            initialiseUserJourney: function () {
                var types = bmc.support.ConfigurableType.getTypes(),
                    type,
                    userJourney = [],
                    object,
                    value;

                for (type in types) {
                    if (type) {
                        object = {};
                        value = String(types[type]);
                        object[value] = undefined;
                        userJourney.push(object);
                    }
                }

                return userJourney;
            }
        });
});