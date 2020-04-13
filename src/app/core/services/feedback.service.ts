import { OrderService } from "./../../order.service";
import { AngularFirestoreDocument } from "@angular/fire/firestore/public_api";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/auth.service";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class FeedbackService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private orderService: OrderService
  ) {}

  getLatestFeedback() {
    return this.afs
      .collection("feedback", (ref) => ref.where("rating", "==", 5).limit(5))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data: Object = a.payload.doc.data();
            const id: string = a.payload.doc.id;
            return { ...data, id };
          });
        })
      );
  }
  async createFeedback(orderId, rating: number, text) {
    const { uid } = await this.auth.getUser();
    const feedbackRef: AngularFirestoreDocument<any> = this.afs.doc(
      `feedback/${orderId}`
    );
    const data = {
      rating: rating,
      text: text,
      time: Date.now(),
      uid: uid,
    };
    return feedbackRef
      .set(data, { merge: true })
      .then(() => this.orderService.setFeedback(orderId));
  }
}
