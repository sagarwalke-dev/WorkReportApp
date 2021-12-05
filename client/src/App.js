import "./App.css";
import { Route, Router, Switch } from "react-router";
import AddRecord from "./component/AddRecord";
import Header from "./component/Layout/Header";
import ViewAll from "./component/ViewAll";
function App() {
  return (
    <>
    <Header/>
      <Switch>
        <Route exact path='/addRecord' component={AddRecord} />
        <Route exact path='/viewAll' component={ViewAll} />

      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
