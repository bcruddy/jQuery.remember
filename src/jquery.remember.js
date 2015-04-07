/**
 * Created: <brian at briancruddy dot com> 2/2015
 * Source: https://github.com/packofbadgers/jquery.remember
 */

'use strict';

;(function ($) {

    $.fn.remember = function (options) {

        var opts = $.extend({}, $.fn.remember.defaults, options),
            _this = this;
        opts.identifier = this.selector;

        this.init = function () {
            this.checkLocalStorage();

            $(opts.identifier + ' input').on('input', function () {
                var key = $(this).attr('id'),
                    val = $(this).val();
                _this.setLocalStorage(key, val);
            });

            $(opts.identifier + ' textarea').on('input', function () {
                var key = $(this).attr('id'),
                    val = $(this).val();
                _this.setLocalStorage(key, val);
            });

            if (opts.clear) {
                this.clearForm();
            }

            if (opts.forget) {
                this.clearLocalStorage();
            }
        };

        this.log = function (msg) {
            if (opts.debug) {
                console.log(msg);
            }
        };

        this.checkLocalStorage = function () {
            this.log('$remember _checkLocalStorage()');

            if (localStorage.length > 0) { this.getLocalStorage(); }
        };

        this.setLocalStorage = function (key, value) {
            this.log('$remember _setLocalStorage()');

            if (typeof(Storage) == 'undefined' || localStorage.getItem(key) == value) return;

            if (value.length > 0) {
                localStorage.setItem(key, value);
            } else {
                localStorage.removeItem(key);
            }
        };

        this.getLocalStorage = function () {
            this.log('$remember _getLocalStorage()');

            for (var key in localStorage) {
                $(opts.identifier).find('#' + key).val(localStorage.getItem(key));
            }
            $(opts.identifier + ' #forget').show();
        };

        this.clearLocalStorage = function () {
            this.log('$remember _clearLocalStorage()');

            for (var key in localStorage) {
                localStorage.removeItem(key);
            }
            this.clearForm()
        };

        this.clearForm = function() {
            this.log('$remember _clearForm()');

            $(opts.identifier + ' input').val('');
            $(opts.identifier + ' textarea').val('');
        };

        this.init();

        return this;
    };

    $.fn.remember.defaults = {
        debug: false,
        clear: false,
        forget: false
    };

})(jQuery);