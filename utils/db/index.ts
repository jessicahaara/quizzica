import admin from "firebase-admin"
import serviceAccountKey from "./serviceAccountKey.json"

const serviceAccount = serviceAccountKey as admin.ServiceAccount

if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL:
          "firebase-adminsdk-oqdaj@quiz-test-98288.iam.gserviceaccount.com",
      })
    } catch (error) {
      console.log("Firebase admin initialization error", (error as Error).stack)
    }
  }
  export default admin.firestore()
  