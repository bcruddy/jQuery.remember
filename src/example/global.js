'use strict';
var debug, bcr;
debug = window.debug || {};
bcr = window.bcr || {};

debug = {
    active: true,

    log: function (msg) {
        if (this.active)
            console.log(msg);
    },

    json: function (obj) {
        this.log(JSON.stringify(obj));
    }
};

bcr = {
    init: function () {
        debug.log('bcr.init()');

        $('.demo-form').submit(function (e) {
            e.preventDefault();
            bcr.submitForm($(this));
        });

    },

    submitForm: function ($form) {
        debug.log('bcr.submitForm()');

        var options = {
            data: {
                firstName: $form.find('#FirstName').val(),
                lastName: $form.find('#LastName').val(),
                emailAddress: $form.find('#EmailAddress').val(),
                message: $form.find('#Message').val()
            },
            success: function (resp) {
                if (resp != null && resp.length > 0) {
                    $('#response').addClass('success').html('<h3>Success!</h3>');
                    fmn.clearLocalStorage();
                } else {
                    this.error();
                }
            },
            error: function (resp) {
                debug.log(resp);
                throw new Error('There was an error processing your request');
            }
        };
        debug.json(options.data);
        //var endpoint = 'your/endpoints/here';
        //bcr.helpers.call(endpoint, options);
    },

    helpers: {
        call: function (endpoint, options) {
            $.ajax({
                url: endpoint,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(options.data)
            })
                .done(options.success)
                .fail(options.error);
        }
    }
};
bcr.init();