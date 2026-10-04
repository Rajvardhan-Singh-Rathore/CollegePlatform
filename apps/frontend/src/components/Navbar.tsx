import { Link,useLocation } from "react-router"
import { Button } from "./ui/button";

export const Navbar = function(){
    const location:any = useLocation();
    const logOut = function(){
        localStorage.setItem('token','');
    }
    return (
        <div className = "border border-zinc-700 px-4 py-4 w-full text-zinc-100 rounded-md flex gap-4 items-center justify-around font-(--font-sora) text-xl">
            <Link to='/student'><div className={`${location.pathname==="/dashboard"?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Home</div></Link>
            <Link to='/allChat'><div className={`${location.pathname==="/signup"?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Discussions</div></Link>
            <Link to='/jobs'><div className={`${location.pathname==="/signin"?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Jobs</div></Link>
            <Link to='/connections'><div className={`${location.pathname==="/create"?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Connections</div></Link>
            <Link to='/events'><div className={`${location.pathname.startsWith('/update')?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>Events</div></Link>
            <Link to='/myApplications'><div className={`${location.pathname.startsWith('/task')?'bg-blue-300 rounded-lg transition-all duration-400 text-zinc-900':''} p-2 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 hover:rounded-lg transition-all duration-400`}>myApplications</div></Link>
            <Button variant="outline" className="text-zinc-900" onClick={logOut}>Logout</Button>
        </div>
    )
}