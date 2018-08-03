// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    // https://developers.facebook.com
    'facebookAuth': {
        'clientID': 'your-secret-clientID-here', // your App ID
        'clientSecret': 'your-client-secret-here', // your App Secret
        // 'callbackURL' 	: 'https://vanvlymenlist.herokuapp.com/auth/facebook/callback'
        'callbackURL': 'http://localhost:3000/auth/facebook/callback'
    },

    // https://apps.twitter.com/ (Twitter developer)
    'twitterAuth': {
        'consumerKey': 'your-secret-clientID-here',
        'consumerSecret': 'your-client-secret-here',
        // 'callbackURL' 	: 'https://vanvlymenlist.herokuapp.com/auth/facebook/callback'
        'callbackURL': 'http://localhost:3000/auth/twitter/callback'
    },

    // https//console.cloud.google.com/apis 
    'googleAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        // 'callbackURL' 	: 'https://vanvlymenlist.herokuapp.com/auth/facebook/callback'
        'callbackURL': 'http://localhost:3000/auth/google/callback'
    },
    // https://www.instagram.com/developer/ 
    'instagramAuth': {
        'clientID': 'your-secret-clientID-here',
        'clientSecret': 'your-client-secret-here',
        // 'callbackURL' 	: 'https://vanvlymenlist.herokuapp.com/auth/facebook/callback'
        'callbackURL': 'http://localhost:3000/auth/instagram/callback'
    }
};