import firebase from "firebase";
import { config } from "../config/config";

firebase.initializeApp(config);

export const auth = firebase.auth();
export const user = firebase.auth().currentUser
export const databaseRef = firebase.database()
// export const CredRef = databaseRef.child("Credentials")
export const provider = new firebase.auth.GithubAuthProvider();
provider.addScope("repo");
provider.setCustomParameters({ prompt: "select_account" });
