import "./App.css";
import { Route, Router, Switch } from "react-router";
import AddRecord from "./component/AddRecord";
function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={AddRecord} />
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
