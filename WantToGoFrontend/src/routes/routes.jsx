import { Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import { useAuth } from "../utils/context/authContext";

function App() {
  const { user, userLoading, setUser } = useAuth();
  return (
    <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="*" component={() => () => <p>Landing</p>} />
      </Switch>
  );
}

export default App;
