import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { switchMap, map, first } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {}

  getUserOrders() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection("orders", ref => ref.where("orderUid", "==", user.uid))
          .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data: Object = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }

  async setOrder(object) {
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
      orderPassword: ""
    };
    return orderRef.set(data, { merge: true });
  }
  async setOrderV2(object) {
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
      orderPassword: ""
    };
    return orderRef.set(data, { merge: true });
  }

  getOrderUid(orderId) {
    const orderRef: AngularFirestoreDocument<any> = this.afs
      .collection("orders")
      .doc(orderId);

    let orderObs = orderRef.valueChanges().pipe(
      map(order => {
        // console.log(
        //   "in getOrderUid - " + order + "returns - " + order.orderUid
        // );
        return order;
      })
    );
    return orderObs.pipe(first()).toPromise();
  }

  async updatePassword(orderId, password) {
    const { uid } = await this.auth.getUser();
    const { orderUid } = await this.getOrderUid(orderId);
    // const { orderPassword } = await this.getOrderUid(orderId);
    // console.log(
    //   "in updatePassword " +
    //     orderUid +
    //     " uid  -" +
    //     uid +
    //     " orderPassword " +
    //     orderPassword
    // );
    const data = {
      orderPassword: password
    };

    const orderRef: AngularFirestoreDocument<any> = this.afs
      .collection("orders")
      .doc(orderId);

    if (uid === orderUid) {
      return orderRef
        .update(data)
        .then(res => console.log("Password Update Successful"));
    } else {
      console.log("Did not update password - " + orderUid);
    }
  }
}
