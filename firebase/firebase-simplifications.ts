import { doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc, setDoc, WithFieldValue } from "firebase/firestore";
import { db } from "./config";

export class FirebaseSimplification {
  static async createDocument<T extends WithFieldValue<DocumentData>>(collection: string, data: T, details?: string) {
    try {
      let ref;

      if (details) {
        ref = doc(db, collection, details)
      } else {
        ref = doc(db, collection)
      }

      await setDoc(ref, data)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  /**
   * 
   * @param documentId 
   * @param collection 
   * @returns A Promise resolved with a DocumentSnapshot containing the current document contents.
   */
  static async fetchDocumentById<T = DocumentData>(documentId: string, collection: string): Promise<DocumentSnapshot<T> | undefined> {
    try {
      const ref = doc(db, collection, documentId) as DocumentReference<T>
      return await getDoc(ref)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
}
