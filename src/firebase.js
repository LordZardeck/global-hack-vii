import firebase from 'firebase';

const app = firebase.initializeApp(
    {
        apiKey: 'AIzaSyBLMBDYSKaUxlFY_Ozp9emENHTXGG4vVpI',
        projectId: 'global-hack-vii'
    }
);

export default app;

export const firestore = app.firestore();

firestore.settings({timestampsInSnapshots: true});
