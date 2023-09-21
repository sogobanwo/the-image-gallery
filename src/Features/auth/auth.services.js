import { getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { db } from "../../FirebaseConfig";
  import { toast } from "react-toastify";
  import { doc, setDoc, serverTimestamp } from "firebase/firestore";
  
  export const registerUser = async (values) => {
    try {
      const auth = getAuth() 
      const { email, password, fullname } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      const user = userCredential.user;
      console.log(user)
  
      updateProfile(auth.currentUser, {
        displayName: fullname,
      })
     
      return user;
    } catch (error) {
      const toastError = error.message.split("/")[1];
      const errorToShow = toastError.split(")")[0]
      toast.error(errorToShow);
    }
  };
  
  export const LoginUser = async (values) => {
    try {
      const auth = getAuth() 
      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      
      return user;
    } catch (error) {
      const toastError = error.message.split("/")[1];
      const errorToShow = toastError.split(")")[0]
      toast.error(errorToShow);
    }
  };
  
  export const LogoutUser = async() => {
    try{
      const auth = getAuth();
      await auth.signOut()
      localStorage.removeItem("user")
    }catch(error){
      const toastError = error.message.split("/")[1];
      const errorToShow = toastError.split(")")[0]
      toast.error(errorToShow);
    }
  }