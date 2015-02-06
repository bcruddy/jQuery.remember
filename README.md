##ForgetMeNot Forms

ForgetMeNot (FMN) is pretty simple, the only dependency is has it jQuery which your website probably already uses unless you prefer to do everything the long way. FMN leverages HTML5's local storage to store data entered into forms before they're submitted in case of an interruption of failed submission attempt.

###Usage
Simply add the class `.remember` to any form you wish the users browser to remember for them. There's also an option to "forget" previously entered user data by adding a button within the `.remember` form with the id `#forget`.  FMN will set the display to block (using jQuery's `.show()` method) when the page loads and FMN detects form data saved in local storage. FMN also uses it's own logging function for debugging. To turn this off set `debug: false` on line 11.

Configuring how the `clearLocalStorage` method should be called on a successful form submission is the only set up required to begin using ForgetMeNot.

###Example
Clone the repository and run `bower install` to hook up the example's dependencies and you can use a simple python server to check it out (`python -m SimpleHTTPServer`). Note that the actual AJAX call on the form submission has been commented out and there is no endpoint for the example to reach. Which is good because the python simple server doesn't actually support post requests.

###License
[MIT License](http://opensource.org/licenses/MIT)