import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'; 
import Deck from './Deck';

function App() {
  return ( <Deck />);
}

ReactDOM.render(<App />, document.getElementById('root')); 

export default App;
