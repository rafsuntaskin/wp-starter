# Ionic WordPress Starter App

An easy way to get started developing an Ionic mobile app with WordPress.

This app pulls in posts from a WordPress site running the WP-API v2 plugin.

## How to get started

1. Install and activate the WP-API v2 plugin on your WordPress site
2. Clone this repo to your computer: $ git clone https://github.com/scottopolis/wp-starter.git
3. Open js/controllers.js and change $rootScope.url to your website. Make sure to leave the /wp-json/wp/v2/ part. Example: http://mysite.com/wp-json/wp/v2/
4. Open index.html in Safari or Chrome to view the app.

You can edit this app and compile into a native app using Phonegap if desired.

### Resources

- [Ionic documentation](http://ionicframework.com/docs/)
- [Phonegap docs](http://docs.phonegap.com/)