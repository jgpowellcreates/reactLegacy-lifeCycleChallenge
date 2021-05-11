import React, { Component } from 'react'
import './PokeFetch.css';

class Counter extends React.Component {
    constructor(props) {
        super(props)   
    }

    componentDidMount() {
        this.props.toggleInterval();
    }

    render() {
        return(
            <div>
                <h1 className={'timer'} >{this.props.secondsLeft}</h1>
            </div>
        )
    }

    componentWillUnmount() {
        console.log("Unmounted complete!")
        this.props.toggleInterval();
        this.props.resetState();
    }
}
//This component ^^^ is in charge of the timer. It uses lifecycle methods to alter states.

//This component vvv is the parent that will pass down props.
//It provides the logic & functions but waits for the child component to call on them.
class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      showCounter: false,
      secondsLeft: 10
    }
    this.tick = () => this.setState( {secondsLeft: this.state.secondsLeft - 1});
    }

    toggleCounter = () => this.setState({showCounter: !this.state.showCounter});
    resetState = () => this.setState({showCounter: false, secondsLeft: 10})  

    toggleInterval = () => {
        if (this.interval == null) {
            this.interval = setInterval(() => this.tick(), 1000);
        } else if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          showCounter: true
        })
      })
      .catch((err) => console.log(err))
  }

  /* stateCheck = () => {
      console.log(
          "Counter:", this.state.showCounter,
          "Interval:", this.interval,
          "Seconds:", this.state.secondsLeft
      )
  } */

  render() {
      console.log("main boy is re-rendering");
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        {/* <button onClick={this.toggleCounter}>Toggle</button> */}
        {/* <button onClick={this.stateCheck}>Check States/Variables</button> */}
        {this.state.showCounter && this.state.secondsLeft >= 0 ?
            <Counter  
                secondsLeft={this.state.secondsLeft}
                toggleInterval={this.toggleInterval}
                // tick={this.tick}
                revealPoke={this.revealPoke}
                toggleCounter={this.toggleCounter}
                resetState={this.resetState}
                /> :
            null}
        <div className={'pokeWrap'}>
        {this.state.showCounter
            ? <>
          <img className={"hiddenImg"} src={this.state.pokeSprite} />
          <h1 className={"hiddenName"}>{this.state.pokeName}</h1>
            </>:<>
          <img className={"pokeImg"} src={this.state.pokeSprite} />
          <h1 className={"pokeName"}>{this.state.pokeName}</h1>
            </>}
        </div>
      </div>
    )
  }
}

export default PokeFetch;