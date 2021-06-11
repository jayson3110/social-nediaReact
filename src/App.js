import {Home} from "./pages";
import {UserContextProvider} from "./contexts/user"
import './App.css';

function App() {
  return (
   <UserContextProvider>
    <div className="App">
        <Home />
    </div>
   </UserContextProvider>
  );
}

export default App;
