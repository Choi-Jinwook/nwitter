import React, { useEffect, useState } from "react";
import AppRouter from "components/Router.js";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const handleUserObj = (user) => {
    setUserObj({
      email: user.email,
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: () =>
        user.updateProfile(user, { displayName: user.displayName }),
    });
  };

  const refreshUser = () => {
    const user = authService.currentUser;
    if (user) {
      handleUserObj(user);
    } else {
      setUserObj(null);
    }
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        handleUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing"
      )}
    </>
  );
}

export default App;
