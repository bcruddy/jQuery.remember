/**
 * Forget Me Not Forms
 * Created: <brian at briancruddy dot com> 2/2015
 * Source: https://github.com/packofbadgers/ForgetMeNot
 */

'use strict';

;(function ($) {

    $.fn.remember = function (options) {

        var opts = $.extend({}, $.fn.remember.defaults, options),
            self = this;
        opts.identifier = this.selector;

        this._init = function () {
            this._log(this);
            this._checkLocalStorage();

            $(opts.identifier + ' input').blur(function () {
                var key = $(this).attr('id'),
                    val = $(this).val();
                self._setLocalStorage(key, val);
            });

            $(opts.identifier + ' textarea').blur(function () {
                var key = $(this).attr('id'),
                    val = $(this).val();
                self._setLocalStorage(key, val);
            });

            if (opts.clear)
                self._clearForm();

            if (opts.forget)
                self._clearLocalStorage();
        };

        this._log = function (msg) {
            if (opts.debug)
                console.log(msg);
        };

        this._checkLocalStorage = function () {
            if (localStorage.length > 0)
                self._getLocalStorage();
        };

        this._setLocalStorage = function (key, value) {
            if (typeof(Storage) == 'undefined' || localStorage.getItem(key) == value) return false;
            if (value.length > 0)
                localStorage.setItem(key, value);
            else
                localStorage.removeItem(key);
        };

        this._getLocalStorage = function () {
            for (var key in localStorage)
                $(opts.identifier).find('#' + key).val(localStorage.getItem(key));
            $(opts.identifier + ' #forget').show();
        };

        this._clearLocalStorage = function () {
            for (var key in localStorage)
                localStorage.removeItem(key);
            self._clearForm()
        };

        this._clearForm = function() {
            $(opts.identifier + ' input').val('');
            $(opts.identifier + ' textarea').val('');
        };

        this._init();
    };

    $.fn.remember.defaults = {
        debug: false,
        clear: false,
        forget: false
    };

})(jQuery);