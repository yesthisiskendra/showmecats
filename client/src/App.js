import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { 
    passwords: [],
    animals: [],
    animalType: 'dogs',
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getKittens();
    // this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
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
    const { passwords, animals } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
          <div>
            <h1>these are not {this.state.animalType}</h1>
            <ul className="passwords">
              {animals.map((animal, index) =>
                <li key={index}>
                  <img src={animal['data'].url} width="500px" />
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getAnimals} >
              Show me {this.state.animalType}
            </button>
          </div>
      </div>
    );
  }
}

export default App;
