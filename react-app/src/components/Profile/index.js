import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <div>{user.username}</div>
      <img src={user.imageUrl} />
    </div>
  );
};

export default Profile;
