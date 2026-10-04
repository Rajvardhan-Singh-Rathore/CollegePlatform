import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import {
    NativeSelect,
    NativeSelectOption,
  } from "@/components/ui/native-select"
import { useState } from "react"
import { useNavigate } from "react-router"

export function Signup() {
const Navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full h-screen bg-[#0A0A0A] flex items-center justify-center">
    <Card className="w-full max-w-sm dark">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
        <Button variant="outline" className="w-full" onClick={()=>Navigate('/login')}>
          Login
        </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="w-full h-full flex relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="***************" required />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                    </span>
                </Button>
              </div>

            </div>
            <div className="flex justify-around">
            <NativeSelect className="bg-zinc-900 rounded-lg overflow-hidden">
                <NativeSelectOption value="" className="bg-zinc-900 text-zinc-100 font-bold">Role</NativeSelectOption>
                <NativeSelectOption value="todo" className="bg-zinc-900 text-zinc-300 font-medium" >ALUMNI</NativeSelectOption>
                <NativeSelectOption value="in-progress" className="bg-zinc-900 text-zinc-300 font-medium">STUDENT</NativeSelectOption>
            </NativeSelect>
            <NativeSelect className="bg-zinc-900 rounded-lg overflow-hidden">
                <NativeSelectOption className="bg-zinc-900 text-zinc-100 font-bold" value="">Graduation Year</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2020</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2021</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2022</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2023</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2024</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2025</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2026</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2027</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2028</NativeSelectOption>
                <NativeSelectOption className="bg-zinc-900 text-zinc-300 font-medium" value="todo">2029</NativeSelectOption>
            </NativeSelect>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Signup
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
