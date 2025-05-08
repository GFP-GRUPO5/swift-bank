import { auth, db } from "@/firebase/config";
import { ICreditCard } from "@/redux/features/card/cardSlice";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore";

const CARD_COLLECTION = "cards";

export class CardService {
  private static getUserId() {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("Usuário não autenticado");
    return userId;
  }

  static async createNewCard(newCard: Omit<ICreditCard, 'id'>): Promise<ICreditCard> {
    try {
      const userId = this.getUserId();
      const cardRef = doc(collection(db, CARD_COLLECTION));

      const cardData: ICreditCard = {
        id: cardRef.id,
        ...newCard,
        isActive: true
      };

      await setDoc(cardRef, cardData);
      return cardData;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  static async fetchCards(): Promise<ICreditCard[]> {
    try {
      const userId = this.getUserId();
      const querySnapshot = await getDocs(collection(db, CARD_COLLECTION));

      const cards: ICreditCard[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        cards.push({
          id: doc.id,
          number: data.number,
          name: data.name,
          expiry: data.expiry,
          cvv: data.cvv,
          isActive: data.isActive || false
        });
      });

      return cards;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  static async fetchCardById(cardId: string): Promise<ICreditCard> {
    try {
      const cardRef = doc(db, CARD_COLLECTION, cardId);
      const snap = await getDoc(cardRef);

      if (!snap.exists()) {
        throw new Error("Cartão não encontrado");
      }

      const data = snap.data();
      return {
        id: snap.id,
        number: data.number,
        name: data.name,
        expiry: data.expiry,
        cvv: data.cvv,
        isActive: data.isActive || false
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  static async deleteCard(cardId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, CARD_COLLECTION, cardId));
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  static async setActiveCard(cardId: string): Promise<void> {
    try {
      const userId = this.getUserId();
      const querySnapshot = await getDocs(collection(db, CARD_COLLECTION));
      const batchUpdates = querySnapshot.docs.map(doc =>
        updateDoc(doc.ref, { isActive: false })
      );
      await Promise.all(batchUpdates);
      await updateDoc(doc(db, CARD_COLLECTION, cardId), { isActive: true });
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}
