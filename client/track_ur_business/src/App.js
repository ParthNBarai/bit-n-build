
import { BrowserRouter, Switch, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { useNavigate } from "react-router-dom";

function App() {

  

  return (
    <div className="App">
      <BrowserRouter>
        <h1> Commit</h1>
        <Routes>
          {/* <Route path='/app' element={<><Home /></>}></Route> */}
          <Route path='/signup' element={<><SignUp /></>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;