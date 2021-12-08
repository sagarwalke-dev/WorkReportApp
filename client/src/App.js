import "./App.css";
import { Route, Router, Switch } from "react-router";
import AddRecord from "./component/AddRecord";
import Header from "./component/Layout/Header";
import ViewAll from "./component/ViewAll";
import MonthlyReport from "./component/MonthlyReport";
import RecordTable from "./component/RecordTable";
import ModifiyRecord from "./component/ModifiyRecord";
function App() {
  return (
    <>
    <Header/>
      <Switch>
        <Route exact path='/addRecord' component={AddRecord} />
        <Route exact path='/viewAll' component={ViewAll} />
          <Route exact path='/monthlyReport' component={RecordTable}/>
          <Route exact path='/modifiy/:id' component={ModifiyRecord}/>
      </Switch>
      {/* <Footer /> */}
    </>
  );
}

export default App;
