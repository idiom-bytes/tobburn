import * as firebase from "firebase";
import {secrets} from "./Secrets";

export const firebaseConfig = {
    apiKey: secrets.API_KEY,
    authDomain: secrets.AUTH_DOMAIN,
    databaseURL: secrets.DATABASE_URL,
    projectId: secrets.PROJECT_ID,
    storageBucket: secrets.STORAGE_BUCKET,
    messagingSenderId: secrets.MESSAGE_SENDER_ID,
    appId: secrets.APP_ID,
    measurementId: secrets.MEASUREMENT_ID,
};