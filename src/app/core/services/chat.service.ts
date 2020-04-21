import { OrderService } from "./order.service";
import { AngularFirestoreDocument } from "@angular/fire/firestore/public_api";
import { StaffauthService } from "./staffauth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, switchMap, first } from "rxjs/operators";
import { firestore } from "firebase";
import { Observable, combineLatest, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private staffauth: StaffauthService,
    private orderService: OrderService
  ) {}

  get(chatId) {
    return this.afs
      .collection<any>("chats")
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return {
            id: doc.payload.id,
            ...(doc.payload.data() as {}),
          };
        })
      );
  }

  getChatDoc(chatId) {
    return this.afs.collection<any>("chats").doc(chatId).valueChanges();
  }

  getChat(chatId) {
    return this.getChatDoc(chatId).pipe(first()).toPromise();
  }

  // Returns the current authenticated users chat - its id and data inside as object
  getUserChats() {
    return this.auth.user$.pipe(
      switchMap((user) => {
        return this.afs
          .collection("chats", (ref) => ref.where("uid", "==", user.uid))
          .snapshotChanges()
          .pipe(
            map((actions) => {
              return actions.map((a) => {
                const data: any = a.payload.doc.data(); // create interface
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }
  async create(docId) {
    const chatDocRef: AngularFirestoreDocument<any> = this.afs.doc(
      `chats/${docId}`
    );
    const chat = await this.getChat(docId)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log("Unsuccessfuly got chat " + err));
    if (chat) {
      return chatDocRef;
    } else {
      const { orderUid } = await this.orderService.getOrder(docId);
      if (orderUid) {
        const data = {
          uid: orderUid,
          createdAt: Date.now(),
          count: 0, // ?
          messages: [],
        };
        return chatDocRef
          .set(data, { merge: true })
          .then(() => console.log("Successfuly set chat"));
      } else {
        console.log(`Could not get orderUid ${orderUid}`);
      }
    }
  }
  async sendMessage(chatId, content) {
    const uid = await this.auth.getUser().then((res) => {
      if (res) return res.uid;
      else return res;
    });
    let staffId;
    if (!uid) {
      staffId = await this.staffauth.getStaff().then((res) => {
        if (res) return res.staffId;
        else return res;
      });
    }
    let data = {};
    if (uid) {
      data = {
        uid,
        content,
        createdAt: Date.now(),
      };
    } else {
      data = {
        staffId,
        content,
        createdAt: Date.now(),
      };
    }
    if (uid || staffId) {
      const ref = this.afs.collection("chats").doc(chatId);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data),
      });
    }
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};

    return chat$.pipe(
      switchMap((c) => {
        chat = c;
        const uids = Array.from(
          new Set(
            c.messages.filter((v) => v.uid !== undefined).map((v) => v.uid)
          )
        );
        const staffIds = Array.from(
          new Set(
            c.messages
              .filter((v) => v.staffId !== undefined)
              .map((v) => v.staffId)
          )
        );
        // console.log(uids + " StaffID: " + staffIds);
        const userDocs = uids.map((uid) =>
          this.afs.doc(`users/${uid}`).valueChanges()
        );
        const staffDocs = staffIds.map((staffId) =>
          this.afs.doc(`staff/${staffId}`).valueChanges()
        );
        const allDocs = userDocs.concat(staffDocs);
        // console.log("ALL DOCS: " + allDocs);
        return allDocs.length ? combineLatest(allDocs) : of([]);
      }),
      map((arr) => {
        console.log(arr);
        arr.forEach((v) => {
          if ((<any>v).uid) joinKeys[(<any>v).uid] = v;
          else if ((<any>v).staffId) joinKeys[(<any>v).staffId] = v;
        });
        console.log(joinKeys);
        chat.messages = chat.messages.map((v) => {
          return { ...v, user: joinKeys[v.uid], staff: joinKeys[v.staffId] };
        });
        return chat;
      })
    );
  }
}
