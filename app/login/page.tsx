import { login, signup } from './actions'
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

export default function LoginPage() {
    return (
        <form>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Email"/>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Email</Label>
                <Input type="password" id="password" name="password" placeholder="Password"/>
            </div>
            <Button type="submit" formAction={login}>Log in</Button>
            <Button type="submit" formAction={signup}>Sign up</Button>
        </form>
    )
}