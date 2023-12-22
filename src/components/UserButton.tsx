import { auth } from "@/auth"
import SignIn from "./SignIn"


export default async function UserButton() {
    const session = await auth()
    if (!session) {
        return <SignIn />
    }

    return <div className="w-9 h-9 rounded-full ring-1 ring-gray-300" style={{ backgroundImage: `url(${session.user?.image})`, backgroundSize: 'cover' }} />

}