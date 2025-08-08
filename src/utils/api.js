import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs,doc,getDoc,query,where } from "firebase/firestore";
import{getAuth} from 'firebase/auth'
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app)
const vansRef = collection(db,"vans")

export async function getAllVans(){
    const snapshot = await getDocs(vansRef)
    const vans = snapshot.docs.map(doc => (
        {...doc.data(),
        id: doc.id
        }
    ))
    return vans
}

export async function  getVan(id) {
const ref = doc(db,"vans",id)
const snapshot = await getDoc(ref)
if(!snapshot.exists()){
    throw new Error("Van not found")
}

return {
    ...snapshot.data(),
    id: snapshot.id
}
}


async function getHostId() {
    const email = auth.currentUser.email
    const userRef = collection(db,"users")
    const q = query(userRef,where("email","==",email))
    try{
        const snapshot = await getDocs(q)
       if (snapshot.empty) {
            throw new Error("No user found with this email")
        }
        
        // Get the first document that matches the query
        const userDoc = snapshot.docs[0]
        return userDoc.id
    }
    catch(e){
        throw(e.message) 
    }
    
}
export async function  getHostVan() {
    const id = await getHostId()
    console.log(id)
 const q = query(vansRef,where("hostId","==",id))
    try{
         const snapshot = await getDocs(q)
        const vans = snapshot.docs.map(doc =>{
    return {
        ...doc.data(),
        id: doc.id

    }
})
return vans
    }catch(e){
        throw(e.message)
    }


}

export async function login(creds) {
                try{
                    const userCred = await signInWithEmailAndPassword(auth,creds.email,creds.password)
                
                console.log("logged in " ,userCred.user)
                return userCred.user
                }
                catch(e){
                    console.error("Login Failed",e.message)
                    throw e
                }
}

export async function register(creds) {
    try{
        const userCred = await createUserWithEmailAndPassword(auth,creds.email,creds.password)
        return userCred.user
    }
    catch(e){
        throw e
    }
}