import {
    useState,
    useContext,
    createContext, useEffect
} from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '../config/firebase'

const authContext = createContext({ user: {} })
const { Provider } = authContext;

export function AuthProvider({ children }) {
    const auth = useAuthProvider();
    return <Provider value={auth}>{children}</Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

export const useRequireAuth = () => {
    const auth = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (auth.user === false || auth.user === null) {
            router.push("/login")
        }
    }, [auth, router])
    return auth
}
// provider hook that creates an auth object and handles it's state
const useAuthProvider = () => {
    const [user, setUser] = useState(null);
    const getUserAdditionalData = (user = firebase.User) => {
        return db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((userData) => {
                if (userData.data()) {
                    setUser(userData.data())
                }
            })
    }
    const createUser = (user) => {
        return db
            .collection('users')
            .doc(user.uid)
            .set(user)
            .then(() => {
                setUser(user)
                return user;
            })
            .catch((error) => {
                return { error }
            })
    }
    const addUserFavourite = (movie) => {
        return db
            .collection('users')
            .doc(user.uid)
            .collection('favourite')
            .add(movie)
    }
    const signUp = ({ name, email, password }) => {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                auth.currentUser.sendEmailVerification();
                return createUser({ uid: response.user.uid, email, name })
            })
            .catch((error) => {
                return { error }
            })
    };
    const signIn = ({ email, password }) => {
        return auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user)
                getUserAdditionalData(user)
                return response.user
            })
            .catch((error) => {
                return { error }
            })
    }
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

        return () => unsub();
    }, []);
    useEffect(() => {
        if (user?.uid) {
            // Subscribe to user document on mount
            const unsubscribe = db
                .collection('users')
                .doc(user.uid)
                .onSnapshot((doc) => setUser(doc.data()));
            return () => unsubscribe();
        }
    }, []);
    const handleAuthStateChanged = (user = firebase.User) => {
        setUser(user)
        if (user) {
            getUserAdditionalData(user)
        }
    }

    const signOut = () => {
        return auth.signOut().then(() => setUser(false));
    };

    const sendPasswordResetEmail = (email) => {
        return auth.sendPasswordResetEmail(email).then((response) => {
            console.log(response)
            return response
        })
    }

    return {
        user,
        signUp,
        signIn,
        signOut,
        sendPasswordResetEmail,
        addUserFavourite
    }
}