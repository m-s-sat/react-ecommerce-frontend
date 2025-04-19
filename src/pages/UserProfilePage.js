import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/Component/UserProfile";

export default function UserProfilePage(){
    return(
        <>
            <Navbar>
                <h1 className="mx-auto text-2xl">My Profile</h1>
                <UserProfile></UserProfile>
            </Navbar>
        </>
    );
}