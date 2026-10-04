import { Blog } from "../components/Blog";
import { NavbarAdmin } from '../components/NavbarAdmin'

export function Admin(){
    return (
        <div className="p-5 w-full h-screen bg-zinc-900 text-zinc-100">
            <NavbarAdmin></NavbarAdmin>
            <div className="p-2 w-full h-[88%] rounded-lg text-zinc-100 dark mt-3">
                <div className=" p-5 w-full h-[90%] overflow-y-auto scrollbar-thumb-amber-900">
                    <Blog></Blog>
                    <Blog></Blog>
                    <Blog></Blog>
                    <Blog></Blog>
                    <Blog></Blog>
                    <Blog></Blog>
                    <Blog></Blog>
                </div>
            </div>
        </div>
    )
}