import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router) {}

    getUserOrders() {
      return this.auth.user$.pipe(
        switchMap(user => {
          return this.afs
            .collection('orders', ref => ref.where('orderUid', '==', user.uid))
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
     const orderRef: AngularFirestoreDocument<any> = this.afs.collection('orders').doc(id);
    const { uid } = await this.auth.getUser();
    const status = "Waiting for booster";
    const boostedRank = object.currentRank;
    const data = {
      orderUid : uid,
      orderStatus : status,
      orderServiceType :object.serviceType,
      orderCurrentRank : object.currentRank,
      orderCurrentDivision: object.currentDivision,
      orderDesiredRank : object.desiredRank,
      orderBoostedRank : boostedRank,
      orderServer : object.server,
      orderPriority : object.priority,
      orderPrice : object.price,
      orderUsername : '',
      orderPassword : ''
      }
      return orderRef.set(data, {merge: true});
    }
  async setOrderV2(object) {
      const id = this.afs.createId();
      const orderRef: AngularFirestoreDocument<any> = this.afs.collection('orders').doc(id);
     const { uid } = await this.auth.getUser();
     const status = "Waiting for booster";
     const boostedRank = object.currentRank;
     const data = {
       orderUid : uid,
       orderStatus : status,
       orderServiceType :object.serviceType,
       orderCurrentRank : object.currentRank,
       orderCurrentDivision: object.currentDivision,
       orderDesiredRank : object.desiredRank,
       orderBoostedRank : boostedRank,
       orderServer : object.server,
       orderPriority : object.priority,
       orderPrice : object.price,
       orderUsername : '',
       orderPassword : ''
       }
       return orderRef.set(data, {merge: true});
     }
  async updatePassword(orderId, password) {
      const { uid } = await this.auth.getUser();

      const data = {
        orderPassword: password
      }
      // i have to check if orderUid === this.uid
      // how to get orderUid? how to get specific field from document - maybe do like getuser did
      const orderRef: AngularFirestoreDocument<any> = this.afs.collection('orders').doc(orderId);
      // cant seem to do be able to do anything with this reference ^
      // let orderUidv2 = orderRef.valueChanges();
      // console.log('orderUid is - ' + orderUidv2);
      
      if (uid) {
      return orderRef.update(data).then(res => console.log('Password Update successful'));
      }

    }
}

// orderId,
// orderUid,
// orderStatus,
// orderServiceType,
// orderCurrentRank,
// orderDesiredRank,
// orderBoostedRank,
// orderServer,
// orderPriority,
// orderPrice