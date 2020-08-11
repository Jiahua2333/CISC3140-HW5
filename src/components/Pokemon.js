import React, { Component } from "react";
import axios from "axios";

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        data: {},
        error: {},
    };
  }

  componentDidMount(){
    this.searching();
  }

  componentDidUpdate(preProps){
    if(this.props.search_keyword !== preProps.search_keyword){
      this.setState({
        error: {},
      })
      this.searching();
    }
  }


  urlSetting = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.props.search_keyword}`
    return url;
  }


  searching = () => {
    const url = this.urlSetting();
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        // let titles = [], GIFsUrl = [];
        // titles.push(data.title);
        // GIFsUrl.push(data.images.original.url);

    
        console.log(data);
        // console.log(GIFsUrl);


        this.setState({ 
           data: data,
        });
      })
     .catch((err) => {
       console.log(err)
       this.setState({
         error: err,
       })
      });
  };

  render() {
    let errorMessage;
    let isSuccess = true;
    if(this.state.error.length){
      errorMessage = this.state.error.message;
      isSuccess = false;
    }

    let types;
    if(this.state.data.types === undefined)
      types = ""
    else{
      types = (
        <ul>
          {this.state.data.types.map((type, index) =>{
            return(
              <li key={index}>
                {type.type.name}
              </li>
            )
          })}
        </ul> 
      )
    }

    let display;
    if(!isSuccess){
      display = <p>No data</p>
    }
    else{
      // let imageURL = this.state.data.sprites.front_default;
      if(this.state.data.sprites === undefined){
        display = "loading..."
      }
      else{
        display = (
          <div>
            <img src={this.state.data.sprites.other.dream_world.front_default} alt={this.state.data.name}></img>
            {/* <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' alt={this.state.data.name}></img> */}
            <p>Index: {this.state.data.id}     /      Name: {this.state.data.name}</p>
            <h3>Types:</h3>
            {types}
            <h3>Stats:</h3>
            <ul>
              <li>HP: {this.state.data.stats[0].base_stat}</li>
              <li>Attack: {this.state.data.stats[1].base_stat}</li>
              <li>Defense: {this.state.data.stats[2].base_stat}</li>
              <li>Special-attack: {this.state.data.stats[3].base_stat}</li>
              <li>Special-defense: {this.state.data.stats[4].base_stat}</li>
              <li>Speed: {this.state.data.stats[5].base_stat}</li>
            </ul>
          </div>
        );
      }
    }
    // let sequence = [...Array(this.state.title.length).keys()];
    // //console.log(sequence);

    // if (this.state.title.length === 0) {
    //   display = <p>Loading...</p>;
    // } 
    // else {    
    //   const urlList = sequence.map((i) => {
    //       return (
    //           <li> 
    //               <div>
    //                 <img src= {this.state.GIFurl[i]} alt={this.state.title[i]}/><br/>
    //                   <h3>{this.state.title[i]}</h3>
    //               </div>                 
    //           </li>
    //       )
    //   });
    //   display = (
    //     <>
    //       <ul>
    //         {urlList}
    //       </ul>
    //     </>
    //   );
    // }

    return (
      <div className="GIFS">   
        {errorMessage}
        {display}
      </div>
    );
  }

}

export default Pokemon;