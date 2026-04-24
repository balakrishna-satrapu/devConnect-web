import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Provider>
  )
}

export default App;
