import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactNavbar from "./components/ReactNavbar";
import ReactFooter from "./components/ReactFooter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Window1 from "./components/Window1";
import Window3 from "./components/Window3";
import Window2 from "./components/Window2";

function App() {
  return (
    <div className="App">
      <Router>
        <ReactNavbar />
        <div className="main">
          <Switch>
            <Route path="/window3">
              <Window3 />
            </Route>
            <Route path="/window2/:id" component={Window2} />
            <Route path="/">
              <Window1 />
            </Route>
          </Switch>
        </div>
        <ReactFooter />
      </Router>
    </div>
  );
}

export default App;
