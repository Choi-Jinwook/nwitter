import React, { useEffect, useState } from "react";
import AppRouter from "components/Router.js";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const handleUserObj = (user) => {
    setUserObj(user);
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
          handleUserObj={handleUserObj}
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
