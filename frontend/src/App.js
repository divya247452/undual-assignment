import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
   <div>
    <Navbar/>
    <main className="my-4">
    <Outlet/>
    </main>
      
   </div>
  );
}

export default App;
// Note: The following features are currently not functional in this project:

// 1. Cart Button
//    - The cart button does not perform any actions at this time. 
//    - Future implementation will involve adding items to the cart, 
//      viewing the cart contents, and managing the checkout process.

// 2. Sign-In Button
//    - The sign-in button is currently non-operational. 
//    - We plan to integrate authentication functionality using JWT or similar 
//      methods in future updates to enable user sign-in and session management.