VBS Dashboard Firebase Autosave Setup

WHERE TO PUT THESE FILES
1. Unzip this folder.
2. Copy everything inside the folder into:
   /Users/jake/Documents/GitHub/vbsdashboard
3. Replace existing files when asked.
4. The src files go inside:
   /Users/jake/Documents/GitHub/vbsdashboard/src

FILES INCLUDED
- index.html, put in the main project folder.
- package.json, put in the main project folder.
- vite.config.js, put in the main project folder.
- .env, put in the main project folder.
- src/main.jsx, put inside src.
- src/App.jsx, put inside src.
- src/styles.css, put inside src.
- src/firebase.js, put inside src.
- src/useDashboardAutosave.js, put inside src.

LOCAL TEST COMMANDS
cd /Users/jake/Documents/GitHub/vbsdashboard
npm install
npm run dev

GITHUB / NETLIFY DEPLOY COMMANDS
git add .
git commit -m "Add Firebase autosave dashboard"
git push

NETLIFY ENVIRONMENT VARIABLES
Go to:
Netlify > vbsdashboard > Site configuration > Environment variables

Add these:
VITE_FIREBASE_SYNC_ENABLED=true
VITE_FIREBASE_API_KEY=AIzaSyDzhnCPSAA0nVWNC0SWb6_vCIa5hYm9Kgk
VITE_FIREBASE_AUTH_DOMAIN=vbsdash-43f18.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vbsdash-43f18
VITE_FIREBASE_STORAGE_BUCKET=vbsdash-43f18.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=718569780585
VITE_FIREBASE_APP_ID=1:718569780585:web:1939058bd7cd7e2751f9f8

FIRESTORE TEST RULES
In Firebase, go to Firestore Database > Rules, paste this, then Publish:

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /dashboards/{dashboardId} {
      allow read, write: if true;
    }
  }
}

This rule is for testing. After autosave works, lock it down with login/auth.
