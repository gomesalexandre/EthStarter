import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    contractManager: '',
    players : [],
    contractBalance: '',
    value: '',
    message: ''
  }
  async componentDidMount() {
    const contractManager = await lottery.methods.manager().call(); // Using metamask as provider, we don't have to specify a from field
    const players = await lottery.methods.getPlayers().call();
    const contractBalance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ contractManager, players, contractBalance });
  }
  onSubmit = async event => {
    event.preventDefault();
    this.setState({message: 'Waiting for transaction to confirm'});
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether'),
    });
    this.setState({ 'message': `You have jsut sent ${this.state.value} eth to the lottery`})
  }
  onWinnerClick = async _ => {
    this.setState({message: 'Waitin on pickWinner transaction success'});

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({message: 'A winner has been picked !'});
  }
  render() {
    return (
      <div className="App">
        <h2>Lottery contract</h2>
        { this.state.message && <h3>{this.state.message}</h3> }
        <p>This contract is managed by {this.state.contractManager}</p>
        <p>There are currently { this.state.players.length } peeps in the lottery, competing to win {web3.utils.fromWei(this.state.contractBalance, 'ether')} ETH </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Feeling lucky ?</h4>
          <div>
            <label>Amount of Ether you want to put in the lottery</label>
            <input value={this.state.value} onChange={e => this.setState({ value: e.target.value })}></input>
          </div>
          <button type="submit">Enter</button>
        </form>
          <hr />
          <h4>Ready to pick a winner ?</h4>
          <button onClick={this.onWinnerClick}>Pick winner</button>
      </div>
    );
  }
}

export default App;
