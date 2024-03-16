import { Route, Router, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"

function App() {

  return (
    <>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
          </Route>
        </Routes>

    </>
  )
}

export default App

