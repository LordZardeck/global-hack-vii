import firebase from '../../firebase';

class User
{
    static createUser(uid) {
        return firebase.firestore().collection("users").doc(uid).set({
            // at this point, no other info is known
        });
    }

    static populateUser(uid, data) {
        return firebase.firestore().collection("users").doc(uid).update(data); //@todo: validation on data
    }
}

export default User;
