/*jshint node:true*/

module.exports = {
  "framework": "mocha+chai",
  "test_page": "tests/index.html?hidepassed",
  "launch_in_ci": [
    "PhantomJS"
  ],
  "launch_in_dev": [
    "PhantomJS",
    "Chrome"
  ]
};
