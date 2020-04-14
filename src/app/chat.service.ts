import { OrderService } from "./order.service";
import { AngularFirestoreDocument } from "@angular/fire/firestore/public_api";
import { StaffauthService } from "./core/services/staffauth.service";
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

  // Returns the documents: the chatid - all the data inside as object
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
    return this.afs
      .collection<any>("chats")
      .doc(chatId)
      .valueChanges()
      .pipe(
        map((doc) => {
          return doc;
        })
      );
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
                const data: Object = a.payload.doc.data(); // create interface
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }
  // Awaits the authenticated users uid and adds new data doc /- navigates to the that new chats/docId | used in create new chat button
  // async create() {
  //   const { uid } = await this.auth.getUser();

  //   const data = {
  //     uid,
  //     createdAt: Date.now(),
  //     count: 0,
  //     messages: []
  //   };

  //   const docRef = await this.afs.collection("chats").add(data);

  //   return this.router.navigate(["chats", docRef.id]);
  // }

  // async create(id) {
  //   const uid = await this.auth.getUser().then((res) => {
  //     if (res) return res.uid;
  //     else return res;
  //   }); // can i implement this better?
  //   let staffuid;
  //   if (!uid) {
  //     staffuid = await this.staffauth.getStaff().then((res) => {
  //       if (res) return res.uid;
  //       else return res;
  //     });
  //   }
  //   const chatDocRef = this.afs.collection("chats").doc(id);
  //   const chat = await this.getChat(id)
  //     .then((res) => {
  //       console.log("Successfuly got chat ");
  //       return res;
  //     })
  //     .catch((err) => console.log("Unsuccessfuly got chat " + err));
  //   if (chat) {
  //     return chatDocRef;
  //   } else {
  //     if (uid) {
  //       const data = {
  //         uid,
  //         createdAt: Date.now(),
  //         count: 0,
  //         messages: [],
  //       };
  //       return chatDocRef
  //         .set(data, { merge: true })
  //         .then(() => console.log("set chat successfully UID " + uid))
  //         .catch((err) => console.log(err));
  //     } else {
  //       const data = {
  //         uid: staffuid,
  //         createdAt: Date.now(),
  //         count: 0,
  //         messages: [],
  //       };
  //       return chatDocRef
  //         .set(data, { merge: true })
  //         .then(() =>
  //           console.log("set chat successfully staffUID " + staffuid)
  //         );
  //     }
  //   }
  // }
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
        console.log(`Couldnt get orderUid ${orderUid}`);
      }
    }
  }
  async sendMessage(chatId, content) {
    const uid = await this.auth.getUser().then((res) => {
      if (res) return res.uid;
      else return res;
    });
    let staffuid;
    if (!uid) {
      staffuid = await this.staffauth.getStaff().then((res) => {
        if (res) return res.uid;
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
        uid: staffuid,
        content,
        createdAt: Date.now(),
      };
    }
    if (uid || staffuid) {
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
          new Set(c.messages.map((v: { uid: any }) => v.uid))
        );
        console.log(uids);

        const userDocs = uids.map(
          (u) => this.afs.doc(`users/${u}`).valueChanges()
          // vrushta undefined ako suzdatelqt e staff
        );
        const staffDocs = uids.map((u) =>
          this.afs.doc(`staff/${u}`).valueChanges()
        );
        return userDocs.length ? combineLatest(staffDocs, userDocs) : of([]); // ne moga da polzvam posle async pipe-ove
      }),
      map((arr) => {
        arr.forEach((v) => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map((v) => {
          return { ...v, user: joinKeys[v.uid] };
        });
        return chat;
      })
    );
  }
}
