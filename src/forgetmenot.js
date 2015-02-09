/**
 * Forget Me Not Forms
 * Created: <brian at briancruddy dot com> 2/2015
 * Source: https://github.com/packofbadgers/ForgetMeNot
 */

'use strict';

(function ($) {

    $.fn.remember = function (options) {

        var opts = $.extend({}, $.fn.remember.defaults, options),
            $self = $(this);
        opts.identifier = $self.selector;

        function log(msg) {
            if (opts.debug)
                console.log(msg);
        }

        function init() {
            checkLocalStorage();

            $(opts.identifier + ' input').blur(function () {
                var key = $(this).attr('id'),
                    val = $(this).val();
                setLocalStorage(key, val);
            });

            $(opts.identifier + ' textarea').blur(function () {
                var key = $(this).attr('id'),
                    val = $(this).val();
                setLocalStorage(key, val);
            });

            $(opts.identifier + ' #forget').click(function () {
                clearLocalStorage();
            });

            if (opts.clear)
                clearLocalStorage();

        }

        function checkLocalStorage() {
            log('checkLocalStorage()');
            if (localStorage.length > 0)
                getLocalStorage();
        }

        function setLocalStorage(key, value) {
            log('setLocalStorage');
            if (typeof(Storage) == 'undefined' || localStorage.getItem(key) == value) return false;
            if (value.length > 0)
                localStorage.setItem(key, value);
            else
                localStorage.removeItem(key);
        }

        function getLocalStorage() {
            log('getLocalStorage()');
            for (var key in localStorage)
                $(opts.identifier).find('#' + key).val(localStorage.getItem(key));
            $(opts.identifier + ' #forget').show();
        }

        function clearLocalStorage() {
            log('clearLocalStorage()');
            for (var key in localStorage)
                localStorage.removeItem(key);
            clearForm()
        }

        function clearForm() {
            log('clearForm()');
            $(opts.identifier + ' input').val('');
            $(opts.identifier + ' textarea').val('');
        }

        init();
    };

    $.fn.remember.defaults = {
        debug: false,
        clear: false
    };

})(jQuery);