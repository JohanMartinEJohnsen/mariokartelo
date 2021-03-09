import logo from './logo.svg';
import './App.css';
import ScoreBoard from "./components/ScorebBoard";
import RegisterGame from "./components/RegisterGame";
import SortableScoreBoard from "./components/SortableScoreBoard";
import Button from "./components/Button";
import Header from "./components/Header";

function App() {
  return (

  <div className="appWrapper">
    <Header/>
    <ScoreBoard className="scoreBoard"/>
    <Button/>
    
    
  </div>
 
  );
}

export default App;
