'use strict';
var debug, bcr;
debug = window.debug || {};
bcr = window.bcr || {};

debug = {
    active: false,

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

        $('.demo-form').submit(function (e) {
            e.preventDefault();
            try {
                bcr.submitForm($(this));
            } catch (ex) {
                debug.log(ex);
                $('#response').html('<h4>' + ex.message + '</h4>');
            }
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
                    $('#response').html('<h4>Success!</h4>');
                    $('.demo-form').remember({ clear: true });
                } else this.error(resp);
            },
            error: function (resp) {
                if (resp != null) debug.log(resp);
                throw new Error('An error occurred while processing your request, please try again later.');
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