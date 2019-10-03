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
                if (newData && newData.acceptedUserUids &&
                    oldData && oldData.acceptedUserUids && oldData.campaignId &&
                    newData.acceptedUserUids.length !== oldData.acceptedUserUids.length) {
                    //Find the new ID
                    let newUid = null;
                    for (let i = 0; i < newData.acceptedUserUids.length; i++) {
                        let uid = newData.acceptedUserUids[i];
                        if (oldData.acceptedUserUids.indexOf(uid) === -1) {
                            newUid = uid;
                            break;
                        }
                    }
                    if (!newUid) {
                        console.error("Couldn't determine new UID to add to campaign.");
                        reject("Couldn't find new UID to add to campaign.");
                        return;
                    }
                    //The invite is accepted
                    const campaignId = oldData.campaignId;
                    console.log('New data: inserting ' + newUid + ' to campaign ' + campaignId);
                    db.doc(`campaigns/${campaignId}`).update({
                        playerUids: admin.firestore.FieldValue.arrayUnion(newUid)
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