import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SplashScreen from "./pages/SplashScreen.jsx";
import { useState } from "react";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {isLoaded ? (
        <div>
          <ToastContainer />
          <Navigation />
          <main className="py-3">
            <Outlet/>
          </main>
        </div>
      ) : (
          <SplashScreen onLoaded={() => setIsLoaded(true)} />
      )}
    </>
  )
}

export default App
