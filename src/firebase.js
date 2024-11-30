import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAM27ZYoEc7S-7HM2fph2KAF9lgLYx4HnU",
    authDomain: "gantt-chart-application.firebaseapp.com",
    projectId: "gantt-chart-application",
    storageBucket: "gantt-chart-application.firebasestorage.app",
    messagingSenderId: "363452610058",
    appId: "1:363452610058:web:179be8dc72a769868111f3",
    // databasebaURL: "https//gantt-chart-application-default-rtdb.firebaseio.com"
};
const app = initializeApp(firebaseConfig);
export default app;