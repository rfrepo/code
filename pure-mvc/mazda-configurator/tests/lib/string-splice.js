String.prototype.splice = function( idx, rem, s ) {
    'use strict';

    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};