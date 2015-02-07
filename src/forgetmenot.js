/**
 * Forget Me Not Forms
 * Created: <brian at briancruddy dot com> 2/2015
 * Source: https://github.com/packofbadgers/ForgetMeNot
 */

'use strict';
var fmn;
fmn = window.fmn || {};
fmn = {
    debug: true,

    log: function (msg) {
        if (this.debug)
            console.log(msg);
    },

    init: function () {

        if (localStorage.length > 0)
            this.getLocalStorage();

        $('.remember input, .remember textarea, .remember select').blur(function () {
            var key = $(this).attr('id'),
                val = $(this).val();
            fmn.setLocalStorage(key, val);
        });

        $('.remember #forget').click(function () {
            fmn.clearLocalStorage();
        });

    },

    setLocalStorage: function (key, value) {
        fmn.log('fmn.setLocalStorage()');
        if (typeof(Storage) == 'undefined' || localStorage.getItem(key) == value) return false;
        if (value.length > 0)
            localStorage.setItem(key, value);
        else
            localStorage.removeItem(key);
    },

    getLocalStorage: function () {
        fmn.log('fmn.getLocalStorage()');
        for (var key in localStorage)
            $('.remember').find('#' + key).val(localStorage.getItem(key));
        $('.remember #forget').show();
    },

    clearLocalStorage: function () {
        fmn.log('fmn.clearLocalStorage()');
        for (var key in localStorage)
            localStorage.removeItem(key);
        this.clearForm();
    },

    clearForm: function () {
        fmn.log('fmn.clearForm()');
        $('.remember input, .remember textarea').val('');
    }

};

if ($.find('.remember').length > 0)
    fmn.init();
