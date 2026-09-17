import AppRoutes from "./routes/AppRoutes";

import { ToastContainer } from "react-toastify";

import Chatbot from "./components/Chatbot";

function App() {

    return (

        <>

            <AppRoutes />

            <Chatbot />

            <ToastContainer

                position="top-right"

                autoClose={3000}

                newestOnTop

                closeOnClick

                pauseOnHover

                theme="colored"

            />

        </>

    );

}

export default App;