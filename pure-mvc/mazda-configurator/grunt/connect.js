'use strict';

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = {
    options: {
        port: 9000,
        hostname: 'localhost'
    },
    watch: {
        options: {
            keepalive: true,
            middleware: function (connect) {
                return [
                    mountFolder(connect, '.tmp'),
                    mountFolder(connect, '.')
                ];
            }
        }
    },
    test: {
        options: {
            middleware: function (connect) {
                return [
                    mountFolder(connect, '.tmp'),
                    mountFolder(connect, '.')
                ];
            }
        }
    },
    dist: {
        options: {
            middleware: function (connect) {
                return [
                    mountFolder(connect, 'dist')
                ];
            }
        }
    }
};