import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

export const processCampaignInvite = functions.firestore.document('invites/{inviteToken}')
    .onUpdate((change, context) => {
        if (change && change.after && change.after.data &&
            change.before && change.before.data &&
            context && context.auth && context.auth.uid) {
            const newData = change.after.data();
            const oldData = change.before.data();

            if (newData && newData.acceptedUserUids &&
                oldData && oldData.acceptedUserUids && oldData.campaignId &&
                newData.acceptedUserUids.length !== oldData.acceptedUserUids.length) {
                //The invite is accepted
                const campaignId = oldData.campaignId;
                return db.doc(`campaigns/${campaignId}`).update({
                    playerUids: admin.firestore.FieldValue.arrayUnion(context.auth.uid)
                });
            }
        }
        return null;
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