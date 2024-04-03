'use strict';

module.exports = {
    build: {
        options: {
            questions: [
                {
                    config: 'burrows-require_build.build.options.locale',
                    type: 'list',
                    message: 'Which locale would you like to deploy?',
                    choices: ['core (EU)', 'en-au']
                },
                {
                    config: 'burrows-require_build.environment.options.environment',
                    type: 'list',
                    message: 'Which environment are you deploying to?',
                    choices: ['preview', 'syzygy_old(EU)', 'syzygy_new(AUS)']
                }
            ]
        }
    }
};

