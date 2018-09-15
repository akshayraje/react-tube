# React Tube

Simple video tube React web-app powered by Firebase. Live demo at [https://react-tube-69997.firebaseapp.com/](https://react-tube-69997.firebaseapp.com/)

Features:

* Chronologically ordered videos in home page and tag pages
* Client side routing for tag pages and video page
* Sidebar with related videos based on tags of in the video page

## Setup steps

### Git clone or download code
This is not an NPM package. This is designed to be boilerplate to be forked or cloned, modified and used as per your requirements.

### Quick test
npm start will do a quick test of the checkedout code.
```bash
npm start
```

### Create a Cloud Firestore project and set-up Firestore
1. Open the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. In the Database section, click the Get Started button for Cloud Firestore.
3. Select 'Test mode' as the starting mode for your Cloud Firestore Security Rules.
4. Update your security rules to allow reads but not writes like in [firestore.rules](firestore.rules)

### Add your video data to Firestore
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. In the Database section, click the Data tab.
3. Add a collection with id 'videos'
4. Add documents with Auto-ID. The video document structure is like this:
```json
{
  "date": "Firebase Timestamp. Required.",
  "description": "String. Video description. Optional.",
  "embed": "String. Video embed URL. Required.",
  "tags": [
    "Tag as string without spaces. Optional.",
    "Tag as string without spaces. Optional."
  ],
  "thumbnail": "String. Video thumbnail URL. Required.",
  "title": "String. Video Title. Required."
}
```

### Update config/Firebase.js 
Add Firebase config to your app. You can get the config details for your Firebase instance from [add Firebase to your app documentation](https://firebase.google.com/docs/web/setup)

### Update config/Settings.js 
Modify title, description and other settings that are used app wide.

### Build for production
To build for production, use:
```bash
npm run build
```

### Deploy to hosting
npm run build creates a build directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served index.html, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file. [Deployment documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment) of create-react-app is a good place to start with if you are not sure about this. 

If you are planning to deploy to Firebase, this repo already has all the required config for Firestore rules `firestore.rules`, indexes `firestore.indexes.json` and hosting `firebase.json` already. Here are the steps to deploy it Firebase:

1. Install the Firebase CLI if you do not have it
```bash
npm install -g firebase-tools
```
2. Once you've installed the Firebase CLI, sign in using your Google account:
```bash
firebase login
```
3. Modify the project name in `.firebaserc` to the one in your Firebase config.
4. Deploy it by running firebase deploy:
```bash
firebase deploy
```

*[More information about using Firebase CLI and deployment](https://firebase.google.com/docs/cli/)