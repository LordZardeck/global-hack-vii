import firebase from '../../firebase';

class User
{
    static createUser(uid) {
        return firebase.firestore().collection("users").doc(uid).set({
            // at this point, no other info is known
        });
    }

    static populateUser(uid, name, type) {
        firebase.firestore().collection("users").doc(uid);

        // Set the "capital" field of the city 'DC'
        return washingtonRef.update({
            name: name,
            type: type
        });
    }
}

export default User;
