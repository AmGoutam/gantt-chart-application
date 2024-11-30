import { useContext, createContext, useState, useEffect } from "react";
import app from "../firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";


const MyContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app)








const AppProvider = ({ children }) => {
    const [signupUser, setSignupUser] = useState({ email: "", password: "" })
    const [loginUser, setLoginUser] = useState({ email: "", password: "" })
    const [user, setUser] = useState(null)
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const isLoggedIn = user ? true : false;

    // **********************Error Handling**********************

    const handleError = (error, defaultMessage) => {
        // console.error(error);
        alert(error.message || defaultMessage);
    };


    // **********************Singup With Email Here**********************
    const signup = (e) => {
        e.preventDefault()
        const { email, password } = signupUser
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password).then((res) => {
            alert("Signup successfully!");
            setSignupUser({ email: "", password: "" });
        }).catch((error) => {
            alert(error, "Signup failed. Please try again.");
        })
    }
    const handleSignup = (e) => {
        const { name, value } = e.target;
        setSignupUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // **********************Login With Email Here**********************
    const login = (e) => {
        e.preventDefault()
        const { email, password } = loginUser
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            alert("Login successful!");
            setLoginUser({ email: "", password: "" });
        }).catch((error) => {
            handleError(error, "Login failed. Please try again.");
        })
    }
    const handleLogin = (e) => {
        const { name, value } = e.target;
        setLoginUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // **********************Singup With Google Here**********************

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then((res) => {
                alert("Google authentication successful!");
            })
            .catch((error) => {
                handleError(error, "Google authentication failed. Please try again.");
            });
    };
    // **********************Check User Login Or Not**********************
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // **********************Logout funtion**********************

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            handleError(error, "Logout failed. Please try again.");
        }
    };
    // **********************Create New Task**********************


    const createNewTask = async (taskName, status, startDate, endDate, priority, assignees, color, progress, description) => {
        try {

            const newTask = {
                taskName,
                status,
                startDate,
                endDate,
                priority,
                assignees,
                color,
                progress,
                description,
            };

            const res = await addDoc(collection(firestore, "task"), newTask)
            // Add the new task to the tasks state
            setTasks((prevTasks) => [
                ...prevTasks,
                { id: res.id, ...newTask }, // Include the Firestore ID
            ]);
            console.log("Task created successfully:", res);
            alert("Task created successfully!");

        } catch (error) {
            handleError(error, "Failed to create task. Please try again.");
        }
    }


    // **********************Get All Task**********************

    const getAllTask = () => {
        return getDocs(collection(firestore, "task"))
    }




    // **********************fetch All Tasks**********************
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await getAllTask();
            if (res?.docs) {
                setTasks(res.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };



    // **********************Delete Tasks**********************
    const deleteTask = async (id) => {
        if (confirm("Are You sure you want to delete this data")) {
            try {
                const taskRef = doc(firestore, "task", id); // Reference the document
                await deleteDoc(taskRef); // Delete the document
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Update local state
                alert("Task deleted successfully!");
            } catch (error) {
                handleError(error, "Failed to delete task. Please try again.");
            }
        }
    };
    // **********************Edit Tasks**********************


    const editTask = async (taskId, updatedTask) => {
        try {
            const taskRef = doc(firestore, "task", taskId);
            await updateDoc(taskRef, updatedTask); // Update in Firestore
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updatedTask } : task
                )
            );
            fetchTasks()
            alert("Task updated successfully!");
        } catch (error) {
            handleError(error, "Failed to update task. Please try again.");
        }
    };

    return <MyContext.Provider value={{ signupUser, signup, handleSignup, loginUser, login, handleLogin, signInWithGoogle, isLoggedIn, user, logOut, createNewTask, getAllTask, fetchTasks, tasks, loading, editTask, deleteTask }}>{children}</MyContext.Provider>
}


export const useGlobalContext = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("MyContext is not wrapped around the main component.");
    return context;
}


export default AppProvider