define([], function () {
    'use strict';
    return puremvc.define({ name: 'bmc.support.Cookie' },
        {},
        {
            getItem: function (key) {
                var regExp = new RegExp('(?:(?:^|.*;)\\s*' +
                    escape(key).replace(/[\-\.\+\*]/g, '\\$&') +
                    '\\s*\\=\\s*([^;]*).*$)|^.*$');

                return unescape(document.cookie.replace(regExp, '$1')) || null;
            },

            setItem: function (key, value, options) {
                var self = this,
                    expires;

                options = options || {};

                if (self.isNotValidKey(key)) {
                    return;
                }

                expires = self.getExpires(options);

                document.cookie = escape(key) + '=' + escape(value) +
                    expires + (options.domain ? '; domain=' + options.domain : '') +
                    (options.path ? '; options.path=' + options.path : '') +
                    (options.secure ? '; options.secure' : '');
            },

            isNotValidKey: function (key) {
                return !key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key);
            },

            getExpires: function (options) {
                var expires = '';

                if (options.end) {
                    switch (options.end.constructor) {
                    case Number:
                        expires =
                            options.end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' +
                                options.end;
                        break;
                    case String:
                        expires = '; expires=' + options.end;
                        break;
                    case Date:
                        expires = '; expires=' + options.end.toGMTString();
                        break;
                    }
                }

                return expires;
            },

            removeItem: function (key, path) {
                if (!key || !this.hasItem(key)) {
                    return;
                }

                document.cookie = escape(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
                    (path ? '; path=' + path : '');
            },

            removeAll: function () {
                var self = this,
                    keys = self.getKeys(),
                    numberOfKeys = keys.length;

                while (numberOfKeys--) {
                    self.removeItem(keys[numberOfKeys]);
                }
            },

            hasItem: function (key) {
                return (new RegExp('(?:^|;\\s*)' + escape(key).replace(/[\-\.\+\*]/g, '\\$&') +
                    '\\s*\\=')).test(document.cookie);
            },

            getKeys: function () {
                var aKeys = document.cookie.replace(
                        /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/),
                    nIdx,
                    length = aKeys.length;

                for (nIdx = 0; nIdx < length; nIdx++) {
                    aKeys[nIdx] = unescape(aKeys[nIdx]);
                }

                return aKeys;
            }
        }
    );
});
