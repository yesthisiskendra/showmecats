import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { 
    passwords: [],
    kittens: []
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

  getKittens = () => {
    fetch('/api/kittens')
      .then(res => res.json())
      .then(kittens => this.setState({ kittens }));
  }

  render() {
    const { passwords, kittens } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {kittens.length ? (
          <div>
            <h1>5 Cats.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {kittens.map((kitten, index) =>
                <li key={index}>
                  {kitten}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
