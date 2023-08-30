const UserProfile = ({ loggedUser }) => {
    return (
        <div>
            <h1>Welcome, {loggedUser.username}!</h1>
        </div>
    )
}

export default UserProfile;