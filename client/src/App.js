import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { 
    animals: [],
    animalType: 'dogs',
  }

  componentDidMount() {
    this.getKittens();
  }

  getAnimals = () => {
    if (this.state.animalType === 'dogs'){
      this.getDogs();
      this.setState({ animalType: 'cats'});
    } else {
      this.getKittens();
      this.setState({ animalType: 'dogs'});
    }
  }

  getKittens = () => {
    fetch('/api/kittens')
      .then(res => res.json())
      .then(kittens => this.setState({ animals: kittens['data'].children}));
  }

  getDogs = () => {
    fetch('/api/dogs')
      .then(res => res.json())
      .then(dogs => this.setState({ animals: dogs['data'].children}));
  }

  render() {
    const { animals } = this.state;

    return (
      <div className="App">
          <div>
            <h1>these are not {this.state.animalType}</h1>
            <button
              className="more"
              onClick={this.getAnimals} >
              Show me {this.state.animalType}
            </button>
            <ul className="animals">
              {animals.map((animal, index) =>
                <li key={index}>
                  <img src={animal['data'].url} width="500px" />
                </li>
              )}
            </ul>
          </div>
      </div>
    );
  }
}

export default App;
