import { leaguePoints, queues } from "./../../shared/variables";
import { StaffauthService } from "./staffauth.service";
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
    private staffAuth: StaffauthService,
    private fns: AngularFireFunctions
  ) {}

  private getReference(orderId): AngularFirestoreDocument<any> {
    return this.afs.doc(`orders/${orderId}`);
  }

  getCurrentOrder(orderId) {
    return this.getReference(orderId).valueChanges();
  }

  getAvailableOrders() {
    return this.afs
      .collection("orders", (ref) =>
        ref
          .where("orderAssigned", "==", "unassigned")
          .where("orderCompleted", "==", false)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: any = a.payload.doc.data();
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
    return this.staffAuth.staff$.pipe(
      switchMap((staff) => {
        return this.afs
          .collection("orders", (ref) =>
            ref
              .where("orderAssigned", "array-contains", staff.staffId)
              .where("orderCompleted", "==", false)
          )
          .snapshotChanges()
          .pipe(
            map((actions) => {
              return actions.map((a) => {
                const data: any = a.payload.doc.data();
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
                const data: any = a.payload.doc.data();
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
  // this should be cloud function
  async setOrder(orderDetails) {
    // ? make this idempotent
    const id = this.afs.createId();
    const orderRef = this.getReference(id);
    const { uid } = await this.auth.getUser();
    const status = "Waiting For Booster";
    // const boostedRank = orderDetails.currentRank;
    const currentRank = orderDetails.startRank;
    const currentDivision = orderDetails.startDivision;
    const data = {
      orderStartRank: orderDetails.startRank,
      orderStartDivision: orderDetails.startDivision,
      orderDesiredRank: orderDetails.desiredRank,
      orderDesiredDivision: orderDetails.desiredDivision,
      orderLP: orderDetails.leaguePoints,
      orderServer: orderDetails.server,
      orderQueue: orderDetails.queues,
      orderServiceType: orderDetails.serviceType,
      orderCurrentRank: currentRank,
      orderCurrentDivision: currentDivision,
      // orderBoostedRank: boostedRank,
      orderStatus: status,
      orderPriority: orderDetails.priority,
      orderPrice: orderDetails.price,
      orderUsername: "",
      orderPassword: "",
      orderAssigned: "unassigned", // avoid magic strings
      orderFeedback: false,
      orderCompleted: false,
      orderUid: uid,
    };

    return orderRef.set(data);
  }

  getOrder(orderId) {
    const orderRef = this.getReference(orderId);
    const orderObs = orderRef.valueChanges();
    return orderObs.pipe(first()).toPromise();
  }

  async updatePassword(orderId, password) {
    const { uid } = await this.auth.getUser();
    const { orderUid } = await this.getOrder(orderId);

    const data = {
      orderPassword: password,
    };

    const orderRef = this.getReference(orderId);

    if (uid === orderUid) {
      return orderRef
        .update(data)
        .then(() => console.log("Password Update Successful"));
    } else {
      console.log("Did not update password - " + orderUid);
      return; // ?
    }
  }

  async assignStaff(orderId) {
    const { staffId } = await this.staffAuth.getStaff();
    const orderRef = this.getReference(orderId);
    return orderRef
      .update({
        orderAssigned: firestore.FieldValue.arrayUnion(staffId),
      })
      .then(() => {
        return orderRef.update({
          orderStatus: "Active",
        });
      });
  }

  async toggleOrderPause(orderId, status) {
    const orderRef = this.getReference(orderId);
    if (status === "Paused") {
      return orderRef.update({
        orderStatus: "Active",
      });
    } else if (status === "Active") {
      return orderRef.update({
        orderStatus: "Paused",
      });
    } else {
      console.log("Did not pause/unpause");
      return;
    }
  }

  private updateStatusToComplete(orderId) {
    const orderRef = this.getReference(orderId);
    return orderRef.update({
      orderStatus: "Completed",
    });
  }

  confirmCompletion(orderid, status, iscompleted) {
    if (status === "Marked as Completed" && iscompleted) {
      this.updateStatusToComplete(orderid);
      const callable = this.fns.httpsCallable("completeOrder");
      callable({
        orderId: orderid,
        orderStatus: status,
      })
        .pipe(take(1))
        .subscribe(() => console.log("Completion finished."));
    }
  }

  markAsCompleted(orderId) {
    const orderRef = this.getReference(orderId);
    orderRef.update({
      orderStatus: "Marked as Completed",
      orderCompleted: true,
    });
  }

  setFeedback(orderId) {
    const orderRef = this.getReference(orderId);
    return orderRef.update({
      orderFeedback: true,
    });
  }
}
