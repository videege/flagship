This project interacts with Firebase and requires significant setup in order to use. These instructions got me to the flow I was trying to test, and may not be complete or a minimum set required.

 1. In this folder, run `npm install`.
 2. Create a Firebase account and project, as described [here](https://firebase.google.com/docs/web/setup).
 3. During the creation process, 
	 4. you will create a Firebase configuration, copy it into `environment.ts`.
	 5. you will receive a `projectId`, I copied it into `.firebaserc` in place of `flagship-armada` in order to use your Firebase account as the default.
 4. In Firebase, 
	 5. start using a Cloud Firestore Database.
	 6. go to Authentication and enable:
		 7. Email/password
		 8. Google (update the project support email)
		 9. Facebook (I did not do this, as the setup is beyond the scope of this document) 5. 
 6. Run `firebase login`. Finish the login process.
 7. Run `firebase use default`, to use your project.
 8. Run `firebase deploy --only firestore` to deploy the Firestore rules and functions to your Firebase project.
	 7. You will repeat this command whenever you change the Firestore rules or functions to  have them updated on the server.
