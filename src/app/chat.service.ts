import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, switchMap } from "rxjs/operators";
import { firestore } from "firebase";
import { Observable, combineLatest, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {}

  // Returns the documents: the chatid - all the data inside as object
  get(chatId) {
    return this.afs
      .collection<any>("chats")
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...(doc.payload.data() as {}) };
        })
      );
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
    const { uid } = await this.auth.getUser();
    const chatDocRef = await this.afs.collection("chats").doc(id);
    if (chatDocRef) {
      return chatDocRef;
    } else {
      const data = {
        uid,
        createdAt: Date.now(),
        count: 0,
        messages: []
      };
      return chatDocRef.set(data, { merge: true });
    }
  }
  // aits the authenticated users uid / check if it exists and calls update method of the document to the message property and adds the message
  async sendMessage(chatId, content) {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };

    if (uid) {
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
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));
        console.log(uids);

        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });
        return chat;
      })
    );
  }
}
