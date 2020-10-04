import { switchMap, first } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AngularFirestoreDocument } from "@angular/fire/firestore/public_api";

// interface Staff {
//   staffId: string;
//   email: string;
//   completedOrders: Array<string>;
//   displayName: string;
//   position: string;
//   photoURL: string;
// }

@Injectable({
  providedIn: "root",
})
export class StaffauthService {
  staff$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.staff$ = this.afAuth.authState.pipe(
      switchMap((user) => {
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
      .then((credential) => {
        return this.setStaffDoc(credential.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setStaffDoc(user) {
    const staffRef: AngularFirestoreDocument<any> = this.afs.doc(
      `staff/${user.uid}`
    );

    const data = {
      staffId: user.uid,
      email: user.email,
      displayName: "Staff",
      completedOrders: [],
      position: "unassigned",
      photoURL: "",
    };

    return staffRef.set(data, { merge: true });
  }

  // // auth service does the same
  // emailSignIn(email: string, password: string) {
  //   return this.afAuth
  //     .signInWithEmailAndPassword(email, password)
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // private updateUser(user: Staff, data: any) {
  //   return this.afs.doc(`staff/${user.staffId}`).update(data);
  // }

  async updateDisplayName(displayName: string) {
    const { staffId } = await this.getStaff();
    if (staffId) {
      const docRef: AngularFirestoreDocument = this.afs.doc(`staff/${staffId}`);
      const data = {
        displayName,
      };
      return docRef.update(data);
    } else {
      console.log("Could not update displayName - did not get staff id");
      return;
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(["/"]);
  }
}
