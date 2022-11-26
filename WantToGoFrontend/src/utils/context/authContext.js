import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserApi } from "../../api/userApi";
import { firebase } from "../client";

const AuthContext = createContext();

AuthContext.displayName = "AuthContext";

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        const dbUser = await UserApi.getUserByFirebaseId(fbUser.uid);
        setUser({ fbUser: { ...fbUser }, dbUser });
      } else {
        setUser(false);
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      userLoading: user === null,
    }),
    [user]
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
