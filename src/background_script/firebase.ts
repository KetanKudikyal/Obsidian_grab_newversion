import firebase from "firebase";
import { config } from "../config/config";
// import "firebase/auth";

firebase.initializeApp(config);

export const auth = firebase.auth();
export const provider = new firebase.auth.GithubAuthProvider();
provider.addScope("repo");
provider.setCustomParameters({ prompt: "select_account" });