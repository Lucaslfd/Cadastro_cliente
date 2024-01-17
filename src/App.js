import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import Header from "./Components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer autoClose={3000}/>
      <Header/>
      <RoutesApp/>
    </BrowserRouter>
  );
}

export default App;
