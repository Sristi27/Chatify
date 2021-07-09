import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/login/Login';
import {AuthProvider} from './contexts/AuthContext';
import Chat from './components/chats/Chat';


function App() {

  const Routing = () =>
  {
     return (
     <Router>
       <AuthProvider>
       <Switch>
         <Route path="/" exact component={Login}/>
         <Route path="/chats" component={Chat}/>
       </Switch>
       </AuthProvider>
     </Router>
     )
  }

  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
