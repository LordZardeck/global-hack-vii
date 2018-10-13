import firebase from '../../firebase';

class User
{
    static createUser(uid) {
        return firebase.firestore().collection("users").doc(uid).set({
            // at this point, no other info is known
        });
    }

    static populateUser(uid, name, type) {
        return firebase.firestore().collection("users").doc(uid).update({
            name: name,
            type: type
        });
    }
}

export default User;
