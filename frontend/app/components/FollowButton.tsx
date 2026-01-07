import { followUser, unfollowUser } from "../actions"
import { UserT } from "../types"
import EditProfileButton from "./EditProfileButton"

export default function FollowButton(
    {
        currentUser, userData
    }: {
        currentUser: UserT,
        userData: UserT
    }
){
    return (
        currentUser.username == userData.username ?
            <EditProfileButton currentUser={currentUser} userData={userData}/>
        :
        <form action={userData.followed_by_me ? unfollowUser : followUser}>
            <input type="hidden" name="followee" value={userData.username} />
            <button 
                className={
                    !userData.followed_by_me ? 
                    "bg-white px-6 py-3 text-black font-semibold rounded-full hover:opacity-80" :
                    "bg-black border border-white px-6 py-3 text-white font-semibold rounded-full hover:opacity-80" 
                }
            >
                {userData.followed_by_me ? "Following" : "Follow"}
            </button>
        </form>
    )
}