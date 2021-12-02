import "./App.css";
import { Route, Router, Switch } from "react-router";
import AddRecord from "./component/AddRecord";
import Header from "./component/Layout/Header";
function App() {
  return (
    <>
    <Header/>
      <Switch>
        <Route exact path='/' component={AddRecord} />
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
