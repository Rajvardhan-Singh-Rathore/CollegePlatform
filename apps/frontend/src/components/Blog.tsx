import { Heart,MessageCircle } from 'lucide-react';
import { Input } from './ui/input';

export function Blog(){
    return (
        <div className = "w-full h-full border border-zinc-800 rounded-md overflow-hidden mb-3">
            <div className='w-full h-20 border border-zinc-800 flex'>
                <div className="first w-[5%] p-1  flex items-center justify-center">
                    <div className="w-14 h-14 border boder-zinc-700 rounded-full"></div>
                </div>
                <div className="second px-3 w-[95%]  flex items-center justify-between">
                    <div className="inner1 font-medium text-lg">Rajvardhan</div>
                    <div className="inner2  text-lg text-thin">7:00 PM</div>
                </div>
            </div>
            <div className="w-full h-[70%] bg-zinc-800"></div>
            <div className="w-full h-20 border flex">
                <div className='flex w-[5%] items-center justify-center gap-2'>
                    <span className="mb-4 cursor-pointer"><Heart></Heart></span>
                    <span className="mb-4 cursor-pointer"><MessageCircle></MessageCircle></span>
                </div>
                <div className='w-[95%] bg-zinc-700'>
                </div>
            </div>
        </div>
    )
}