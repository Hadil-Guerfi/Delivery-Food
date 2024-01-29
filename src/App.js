import { Route, Routes } from "react-router-dom";
import CreateItem from "./componenets/createItem/CreateItem";
import Header from "./componenets/Header/Header";
import Home from "./componenets/Home/Home";
import { AuthProvider } from "./context/AuthContext";
import PaymentCard from "./componenets/PaymentCard/PaymentCard";

function App() {

  return (
    <div className="App">
      <AuthProvider>
          <PaymentCard/>
          <Header/>        
          <Routes>
            <Route  path="/" element={<Home/>}   />
            <Route  path="createItem" element={<CreateItem/>}   />
          </Routes>

      </AuthProvider>
    </div>
  );
}

export default App;
