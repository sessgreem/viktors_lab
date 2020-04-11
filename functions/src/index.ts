import * as functions from "firebase-functions";
// const admin = require('firebase-admin');
import * as admin from "firebase-admin";
// import * as serviceAccount from "../permissions.json";

const serviceAccount = require("../permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://payments-test-c5f93.firebaseio.com",
});

const db = admin.firestore();

exports.completeOrder = functions.https.onCall(async (data, context) => {
  const orderStatus = data.orderStatus;
  const orderId = data.orderId;
  const orderRef = db.collection("orders").doc(orderId);
  if (orderStatus === "Marked as Completed") {
    const assignedStaff = await orderRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("Document does not exist.");
          return;
        } else {
          return doc.get("orderAssigned");
        }
      })
      .catch((err) => console.log(err));

    return orderRef
      .update({
        orderStatus: "Completed",
      })
      .then(() => {
        if (assignedStaff) {
          const promises = [];
          for (const staffId of assignedStaff) {
            const p = db
              .doc(`staff/${staffId}`)
              .update({
                completedOrders: admin.firestore.FieldValue.arrayUnion(orderId),
              })
              .then(() => {
                console.log(`Added ${orderId} to ${staffId} completedOrders`);
              })
              .catch((err) => {
                console.log("Could not update document: " + err);
              });
            promises.push(p);
          }
          return Promise.all(promises);
        } else {
          console.log("No assigned staff " + assignedStaff);
          return;
        }
      });
  } else {
    return `The order is not marked as completed - orderStatus: ${orderStatus}, orderId: ${orderId}`;
  }
});
