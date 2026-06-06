import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

const firebaseConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), "firebase-applet-config.json"), "utf8"));

async function testAdmin() {
  console.log("--- Testing Admin SDK Only ---");
  try {
    const adminApp = admin.initializeApp({
      projectId: firebaseConfig.projectId,
    });
    console.log("Admin SDK initialized with project ID:", firebaseConfig.projectId);

    // Get Firestore with database ID
    const db = getFirestore(adminApp, firebaseConfig.firestoreDatabaseId);
    console.log("Database ID:", firebaseConfig.firestoreDatabaseId);

    const docRef = db.collection("projects").doc("test_admin_doc");
    await docRef.set({ title: "Admin Diagnostic", order: 999 });
    console.log("Admin write succeeded!");

    const docSnap = await docRef.get();
    console.log("Admin read succeeded! Data:", docSnap.data());

    await docRef.delete();
    console.log("Admin delete succeeded!");

    process.exit(0);
  } catch (error: any) {
    console.error("Admin SDK failure:", error);
    process.exit(1);
  }
}

testAdmin();
