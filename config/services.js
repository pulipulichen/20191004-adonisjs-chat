'use strict'

/*
|--------------------------------------------------------------------------
| Services Configuration
|--------------------------------------------------------------------------
|
| This is general purpose file to define configuration for multiple services.
| The below config is for the ally provider. Make sure to save it inside
| config/services.js file.
|
| Happy Coding :)
|
*/

const Env = use('Env')

module.exports = {
  ally: {
    /*
    |--------------------------------------------------------------------------
    | Facebook Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the facebook developers
    | console. https://developers.facebook.com/apps
    |
    */
    facebook: {
      clientId: Env.get('FB_CLIENT_ID'),
      clientSecret: Env.get('FB_CLIENT_SECRET'),
      redirectUri: `${Env.get('APP_URL')}/authenticated/facebook`
    },

    /*
    |--------------------------------------------------------------------------
    | Google Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the google developers
    | console. https://console.developers.google.com
    | > Credentials
    | > Create credentials > OAuth Client ID
    | > Web application
    */
    google: {
      clientId: Env.get('GOOGLE_CLIENT_ID'),
      clientSecret: Env.get('GOOGLE_CLIENT_SECRET'),
      redirectUri: `${Env.get('APP_URL')}/oauth/google/authenticated`
    },

    /*
    |--------------------------------------------------------------------------
    | Github Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the github developers
    | console. https://github.com/settings/developers
    | New application: https://github.com/settings/applications/new
    */
    github: {
      clientId: Env.get('GITHUB_CLIENT_ID'),
      clientSecret: Env.get('GITHUB_CLIENT_SECRET'),
      redirectUri: `${Env.get('APP_URL')}/oauth/github/authenticated`
    },

    /*
     |--------------------------------------------------------------------------
     | Instagram Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the instagram developers
     | console. https://www.instagram.com/developer/
     | 1. Register Your Application
     | 2. 
     */
    instagram: {
      clientId: Env.get('INSTAGRAM_CLIENT_ID'),
      clientSecret: Env.get('INSTAGRAM_CLIENT_SECRET'),
      redirectUri: `${Env.get('APP_URL')}/oauth/instagram/authenticated`
    },

    /*
     |--------------------------------------------------------------------------
     | Foursquare Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the Foursquare developers
     | console. https://developer.foursquare.com/
     |
     */
    foursquare: {
      clientId: Env.get('FOURSQUARE_ID'),
      clientSecret: Env.get('FOURSQUARE_SECRET'),
      redirectUri: `${Env.get('APP_URL')}/oauth/foursquare/authenticated`
    },
    
    /*
     |--------------------------------------------------------------------------
     | LinkedIn Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the LinkedIn developers
     | console. https://developer.linkedin.com/
     | 1. Create APP
     | 2. 
     */
    linkedin: {
      clientId: Env.get('LINKEDIN_ID'),
      clientSecret: Env.get('LINKEDIN_SECRET'),
      redirectUri: `${Env.get('APP_URL')}/oauth/linkedin/authenticated`
    },
  }
}
