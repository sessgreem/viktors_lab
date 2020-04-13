import { StaffauthService } from "./core/services/staffauth.service";
// import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { switchMap, map, first, take } from "rxjs/operators";
import { firestore } from "firebase"; // ? check why is that here
import { AngularFireFunctions } from "@angular/fire/functions";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private staffauth: StaffauthService,
    private fns: AngularFireFunctions
  ) {}

  getCurrentOrder(orderid) {
    return this.afs.collection("orders").doc(orderid).valueChanges();
  }
  getAvailableOrders() {
    return this.afs
      .collection("orders", (ref) =>
        ref.where("orderAssigned", "==", "unassigned")
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: Object = a.payload.doc.data(); // create interface for the data - dont use Object
            const id = a.payload.doc.id;
            return {
              id,
              ...data,
            };
          });
        })
      );
  }

  getAssignedOrders() {
    return this.staffauth.staff$.pipe(
      switchMap((user) => {
        return this.afs
          .collection(
            "orders",
            (ref) => ref.where("orderAssigned", "array-contains", user.uid) // add another query if the order isnt completed
          )
          .snapshotChanges()
          .pipe(
            map((actions) => {
              return actions.map((a) => {
                const data: Object = a.payload.doc.data(); // create interface for the data
                const id = a.payload.doc.id;
                return {
                  id,
                  ...data,
                };
              });
            })
          );
      })
    );
  }
  getUserOrders() {
    return this.auth.user$.pipe(
      switchMap((user) => {
        return this.afs
          .collection("orders", (ref) => ref.where("orderUid", "==", user.uid))
          .snapshotChanges()
          .pipe(
            map((actions) => {
              return actions.map((a) => {
                const data: Object = a.payload.doc.data(); // create interface
                const id = a.payload.doc.id;
                return {
                  id,
                  ...data,
                };
              });
            })
          );
      })
    );
  }

  async setOrder(object) {
    // make this idempotent
    const id = this.afs.createId();
    const orderRef: AngularFirestoreDocument<any> = this.afs
      .collection("orders")
      .doc(id);
    const { uid } = await this.auth.getUser();
    const status = "Waiting for booster";
    const boostedRank = object.currentRank;
    const data = {
      orderUid: uid,
      orderStatus: status,
      orderServiceType: object.serviceType,
      orderCurrentRank: object.currentRank,
      orderCurrentDivision: object.currentDivision,
      orderDesiredRank: object.desiredRank,
      orderBoostedRank: boostedRank,
      orderServer: object.server,
      orderPriority: object.priority,
      orderPrice: object.price,
      orderUsername: "",
      orderPassword: "",
      orderAssigned: "unassigned",
      orderFeedback: false,
    };

    return orderRef.set(data, {
      merge: true,
    });
  }

  getOrder(orderId) {
    const orderRef: AngularFirestoreDocument<any> = this.afs
      .collection("orders")
      .doc(orderId);

    const orderObs = orderRef.valueChanges().pipe(
      map((order) => {
        return order;
      })
    );
    return orderObs.pipe(first()).toPromise();
  }

  async updatePassword(orderId, password) {
    const { uid } = await this.auth.getUser();
    const { orderUid } = await this.getOrder(orderId);

    const data = {
      orderPassword: password,
    };

    const orderRef: AngularFirestoreDocument<any> = this.afs
      .collection("orders")
      .doc(orderId);

    if (uid === orderUid) {
      return orderRef
        .update(data)
        .then(() => console.log("Password Update Successful"));
    } else {
      console.log("Did not update password - " + orderUid);
    }
  }
  async assignStaff(orderId) {
    const { uid } = await this.staffauth.getStaff();
    // console.log(uid + " test");
    const orderRef: AngularFirestoreDocument<any> = this.afs
      .collection("orders")
      .doc(orderId);
    return orderRef
      .update({
        orderAssigned: firestore.FieldValue.arrayUnion(uid),
      })
      .then(() => {
        return orderRef.update({
          orderStatus: "Booster assigned",
        });
      });
  }
  async toggleOrderPauseStatus(orderId, status) {
    const orderRef: AngularFirestoreDocument = this.afs
      .collection("orders")
      .doc(orderId);
    // const { orderStatus } = await this.getOrder(orderId).catch((err) =>
    //   console.log(err)
    // );
    if (status === "Paused") {
      return orderRef.update({
        orderStatus: "Active",
      });
    } else if (status === "Active") {
      return orderRef.update({
        orderStatus: "Paused",
      });
    } else {
      return "orderStatus is unchanged. Status: " + status;
    }
  }
  confirmCompletion(orderId, status) {
    // const orderRef: AngularFirestoreDocument = this.afs
    //   .collection("orders")
    //   .doc(orderId);
    if (status === "Marked as Completed") {
      const callable = this.fns.httpsCallable("completeOrder");
      callable({ orderStatus: status, orderId: orderId })
        .pipe(take(1))
        .subscribe((res) => console.log("from subscribe " + res));
    }
  }
  markAsCompleted(orderId) {
    const orderRef: AngularFirestoreDocument = this.afs
      .collection("orders")
      .doc(orderId);
    // ? if progress == 100
    orderRef.update({
      orderStatus: "Marked as Completed",
    });
  }
  setFeedback(orderId) {
    const orderRef = this.afs.doc(`orders/${orderId}`);
    return orderRef.update({
      orderFeedback: true,
    });
  }
}
