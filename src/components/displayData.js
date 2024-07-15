import { db } from './Firebase'; // Assurez-vous d'importer correctement db depuis votre fichier firebase.js
import { collection, getDocs } from 'firebase/firestore';

async function displayData() {
    const boardsRef = collection(db, 'board');
    const boardsSnapshot = await getDocs(boardsRef);

    boardsSnapshot.forEach((boardDoc) => {
        console.log(`Collection boards`);
        console.log(`id: ${boardDoc.id}`);

        // Vérifiez si le document contient les champs 'liste1' et 'liste2'
        if (boardDoc.data().Liste1 && Array.isArray(boardDoc.data().Liste1)) {
            console.log(`Field lists: Tableau de chaînes d'ID des listes dans ce tableau`);
            boardDoc.data().Liste1.forEach((listId, index) => {
                console.log(`Field id = ${listId}`);
            });
        }

        if (boardDoc.data().Liste2 && Array.isArray(boardDoc.data().Liste2)) {
            console.log(`Field lists: Tableau de chaînes d'ID des listes dans ce tableau`);
            boardDoc.data().Liste2.forEach((listId, index) => {
                console.log(`Field id = ${listId}`);
            });
        }

        console.log(); // Ajouter une ligne vide entre chaque board pour la clarté
    });
}

displayData().catch((error) => {
    console.error('Error fetching data:', error);
});
