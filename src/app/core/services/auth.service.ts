import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { switchMap, first, map } from "rxjs/operators";

interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<any>;
  // private signedIn: boolean;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
  // Converts the observable into promise so that we can use await in any service
  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        return this.setUserDoc(credential.user);
      });
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }
  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName, photoURL }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  private updateUser(user: User, data: any) {
    return this.afs.doc(`users/${user.uid}`).update(data);
  }

  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    console.log(user);
    const displayName = user.email.split("@")[0];
    const data = {
      uid: user.uid,
      email: user.email,
      // tslint:disable-next-line: object-literal-shorthand
      displayName: displayName,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(["/lol-boost"]);
  }
}
