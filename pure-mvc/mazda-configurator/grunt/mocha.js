'use strict';

module.exports = {
    all: {
        options: {
            run: true,
            urls: ['http://localhost:<%= connect.options.port %>/test/index.html'],
            reporter: 'Nyan'
        }
    }
};
