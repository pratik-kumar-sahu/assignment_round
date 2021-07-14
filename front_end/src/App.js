import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Dashboard } from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
