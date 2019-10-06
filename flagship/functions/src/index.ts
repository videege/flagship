import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const processCampaignInvite = functions.firestore.document('invites/{inviteToken}')
    .onUpdate((change, context) => {
        console.log('Starting comparison.');
        return new Promise((resolve, reject) => {
            if (change && change.after && change.after.data &&
                change.before && change.before.data) {
                console.log('Preliminary data comparisons pass.')
                const newData = change.after.data();
                const oldData = change.before.data();
                console.log('Preliminary data obtained.')
                if (newData && newData.acceptedUsers &&
                    oldData && oldData.acceptedUsers && oldData.campaignId &&
                    newData.acceptedUsers.length !== oldData.acceptedUsers.length) {
                    //Find the new ID
                    let newUser = null;
                    let oldUserUids = oldData.acceptedUsers.map((x: any) => x.uid);

                    for (let i = 0; i < newData.acceptedUsers.length; i++) {
                        let user = newData.acceptedUsers[i];
                        if (oldUserUids.indexOf(user.uid) === -1) {
                            newUser = user;
                            break;
                        }
                    }
                    if (!newUser) {
                        console.error("Couldn't determine new user to add to campaign.");
                        reject("Couldn't find new user to add to campaign.");
                        return;
                    }
                    //The invite is accepted
                    const campaignId = oldData.campaignId;
                    console.log('New data: inserting ' + newUser.uid + ' to campaign ' + campaignId);
                    db.doc(`campaigns/${campaignId}`).update({
                        campaignPlayers: admin.firestore.FieldValue.arrayUnion(newUser),
                        playerUids: admin.firestore.FieldValue.arrayUnion(newUser.uid)
                    }).then((result) => {
                        resolve();
                    }, (err) => {
                        console.error(err);
                        reject(err);
                    });
                }
            }
            resolve();
        });

    });
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// export const processCampaignInvitation = functions.https.onRequest((request, response) => {
//     let campaignId = request.body.campaignId;
//     let inviteToken = request.body.inviteToken;
//     let doc = admin.firestore().doc(`campaigns/${campaignId}`).get().then((campaign) => {
//         if (!campaign.exists) {
//             response.write()
//         }
//     });
// })