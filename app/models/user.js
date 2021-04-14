import { getUser } from 'helpers/user-helper';
import { fDb } from 'config/renderer/firebase';

const userCollection = fDb.collection('users');
export const currentUserDoc = userCollection.doc(getUser());
export default userCollection;
