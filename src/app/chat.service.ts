import { StaffauthService } from "./core/services/staffauth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, switchMap, first } from "rxjs/operators";
import { firestore } from "firebase";
import { Observable, combineLatest, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private staffauth: StaffauthService
  ) {}

  // Returns the documents: the chatid - all the data inside as object
  get(chatId) {
    return this.afs
      .collection<any>("chats")
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return {
            id: doc.payload.id,
            ...(doc.payload.data() as {})
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
        map(doc => {
          return doc;
        })
      );
  }
  getChat(chatId) {
    return this.getChatDoc(chatId)
      .pipe(first())
      .toPromise();
  }
  // Returns the current authenticated users chat - its id and data inside as object
  getUserChats() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection("chats", ref => ref.where("uid", "==", user.uid))
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
  // Awaits the authenticated users uid and adds new data doc /- navigates to the that new chats/docId | used in create new chat button
  async create() {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection("chats").add(data);

    return this.router.navigate(["chats", docRef.id]);
  }

  async createV2(id) {
    const uid = await this.auth.getUser().then(res => {
      if (res) return res.uid;
      else return res;
    }); // can i implement this better? try await().uid
    const staffuid = await this.staffauth.getStaff().then(res => {
      if (res) return res.uid;
      else return res;
    });
    const chatDocRef = this.afs.collection("chats").doc(id);
    // let chat = await this.getChat(id).then(res => {
    //   if (res) {
    //     console.log(res);
    //     return res;
    //   } else {
    //     console.log(res);
    //     return res;
    //   }
    // });
    const chat = await this.getChat(id);
    if (chat) {
      console.log("in chatrefdoc if ");
      return chatDocRef;
    } else {
      console.log("ENTERED ELSE CHATDOCREF");
      if (uid) {
        const data = {
          uid,
          createdAt: Date.now(),
          count: 0,
          messages: []
        };
        return chatDocRef
          .set(data, { merge: true })
          .then(res => console.log("set chat successfully UID " + uid));
      } else {
        const data = {
          uid: staffuid,
          createdAt: Date.now(),
          count: 0,
          messages: []
        };
        return chatDocRef
          .set(data, { merge: true })
          .then(res =>
            console.log("set chat successfully staffUID " + staffuid)
          );
      }
    }
  }
  // aits the authenticated users uid / check if it exists and calls update method of the document to the message property and adds the message
  async sendMessage(chatId, content) {
    const uid = await this.auth.getUser().then(res => {
      if (res) return res.uid;
      else return res;
    });
    const staffuid = await this.staffauth.getStaff().then(res => {
      if (res) return res.uid;
      else return res;
    });
    let data = {};
    if (uid) {
      data = {
        uid,
        content,
        createdAt: Date.now()
      };
    } else {
      data = {
        uid: staffuid,
        content,
        createdAt: Date.now()
      };
    }

    if (uid || staffuid) {
      const ref = this.afs.collection("chats").doc(chatId);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};

    return chat$.pipe(
      switchMap(c => {
        chat = c;
        const uids = Array.from(
          new Set(c.messages.map((v: { uid: any }) => v.uid))
        );
        console.log(uids);

        const userDocs = uids.map(
          u => this.afs.doc(`users/${u}`).valueChanges()
          // vrushta undefined ako suzdatelqt e staff
        );
        const staffDocs = uids.map(u =>
          this.afs.doc(`staff/${u}`).valueChanges()
        );
        return userDocs.length ? combineLatest(staffDocs, userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v)); // ne moje da nameri uid shtot e undefined
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });
        return chat;
      })
    );
  }
}
