import { switchMap, first } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AngularFirestoreDocument } from "@angular/fire/firestore/public_api";

interface Staff {
  uid: string;
  email: string;
  completedOrders: Array<string>;
  displayName: string;
  position: Array<string>;
}

@Injectable({
  providedIn: "root"
})
export class StaffauthService {
  staff$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.staff$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`staff/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  getStaff() {
    return this.staff$.pipe(first()).toPromise();
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        return this.setStaffDoc(credential.user);
      })
      .catch(error => {
        console.log(error);
      });
  }
  setStaffDoc(user) {
    const staffRef: AngularFirestoreDocument<any> = this.afs.doc(
      `staff/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: "Staff",
      completedOrders: [],
      position: "unassigned"
    };

    return staffRef.set(data, { merge: true });
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      });
  }

  private updateUser(user: Staff, data: any) {
    return this.afs.doc(`staff/${user.uid}`).update(data);
  }

  async updateDisplayName(name: string) {
    let { uid } = await this.getStaff();
    // let  uid  = this.staff$.subscribe(data => {
    //   return data;
    // }); // maybe .then can work but no point
    if (uid) {
      let docRef: AngularFirestoreDocument = this.afs.doc(`staff/${uid}`);
      const data = {
        displayName: name
      };
      return docRef.update(data);
    } else {
      return console.log("couldnt updateDisplayName " + name);
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(["/"]);
  }
}
