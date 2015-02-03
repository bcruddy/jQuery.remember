##Forget Me Not Forms

Users won't ever have to fill out a form twice again while maintaining full control of their data until THEY submit it.

FMNFs use HTML5 localStorage to store the values of forms until the form is submitted. On a successful submission, FMNFs automatically clears the users localStorage to prevent confusion in the future.

Released under the MIT License.

##Usage:
Forgetmenot assumes you'll be processing forms with AJAX so you'll need to uncomment this line and include an endpoint.

While fmn.debug is set to true it will print every method name to the console as they fire. I recommend setting this to false in production.

###Dependencies:
jQuery and jQuery.cookie, bootstrap is just for the demo page styling and structure.