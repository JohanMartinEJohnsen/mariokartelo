import React, {Component} from 'react';
import './App.css';
import ScoreBoard from "./components/ScorebBoard";
import Button from "./components/Button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from 'axios';

class App extends Component {
  state = { users: [] }

  componentDidMount() {
    axios.get('/users')
      .then(res => res.data)
      .then(users => this.setState( {users} ))
  }

  render() {
    return (
      
      <div className="appWrapper">

        <Header/>
        <ScoreBoard className="scoreBoard" users={this.state.users}/>
        <Button users={this.state.users}/>
        <Footer/>
      </div>
      );
  } 
}


export default App;
