'use strict';

module.exports = {
    build: {
        options: {
            locale: 'en-gb',
            'en-au': {
                requirejs: {
                    options: {
                        stubModules: ['jquery', 'core/mazda.utils']
                    }
                }
            }
        }
    },
    environment: {
        options: {
            environment: 'preview'
        }
    }
};

