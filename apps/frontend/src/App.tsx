import "./index.css";
import { BrowserRouter,Routes,Route } from 'react-router'
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Student } from "./pages/Student";
import { Admin } from "./pages/Admin";
import { Alumni } from "./pages/Alumni";

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/student" element={<Student/>}></Route>
          <Route path="/alumni" element={<Alumni/>}></Route>
          {/* <Route path="/applications" element={<Application/>}></Route>
          <Route path="/Jobs" element={<Job/>}></Route>
          <Route path="/PendingApprovals" element={<PendingApproval/>}></Route>
          <Route path="/Events" element={<Event/>}></Route>
          <Route path="/StudentProfile" element={<StudentProfile/>}></Route>
          <Route path="/AlumniProfile" element={<AlumniProfile/>}></Route>
          <Route path="/chat" element={<Chat/>}></Route>
          <Route path="/allChat" element={<AllChat/>}></Route> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
