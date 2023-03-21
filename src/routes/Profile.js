import { authService, dbService } from "fbase";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [editProfile, setEditProfile] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const onLogOutClick = () => {
    signOut(auth).then(() => {
      refreshUser();
      navigate("/");
    });
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // console.log(doc.data().text);
    });
  };

  useEffect(() => {
    getMyNweets();
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
      setEditProfile(false);
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const handleDisplayName = () => {
    setEditProfile(true);
  };

  return (
    <>
      {editProfile ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            onChange={onChange}
          />
          <input type="submit" value="Update Profile" />
        </form>
      ) : (
        <button onClick={handleDisplayName}>Edit Profile</button>
      )}
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
