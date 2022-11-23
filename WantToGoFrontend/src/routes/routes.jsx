import { Route, Switch } from "react-router-dom";
import { signIn, signOut } from "../utils/auth";
import { useAuth } from "../utils/context/authContext";

function App() {
  const { user, userLoading, setUser } = useAuth();
  return (
    <Switch>
        <Route exact path="/" component={() => <><button onClick={signIn}>Signin</button><button onClick={signOut}>Signout</button></>} />
        <Route path="*" component={() => () => <p>Landing</p>} />
      </Switch>
  );
}

export default App;
