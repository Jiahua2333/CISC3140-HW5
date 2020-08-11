import React, { Component } from "react";
import Pokemon from "./Pokemon";
class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        keyword: '',
        pre_keyword: '',
        send: false,
    };
  }

  handleKeyWordChange = (event) => {
    let word = event.target.value.toLowerCase();
    this.setState({ 
      keyword: word, 
    });
  };

  handleSearch = () => {
    let word = this.state.keyword
    this.setState({ 
      pre_keyword: word,
      keyword: '',
      send: true,
    });
  };


    render() { 
      return (
        <>
        <div className="SearchField">
            <label htmlFor="KeyWord">ID or Pokemon Name: </label>
            <input
              type="text"
              name="KeyWord"
              placeholder="132 or ditto"
              value={this.state.keyword}
              onChange={this.handleKeyWordChange}
            />
            <button onClick = {this.handleSearch}>Search</button>
            <br/>
            {this.state.send ?  
              <Pokemon 
                search_keyword = {this.state.pre_keyword}
              />  : "loading"}
        </div>
        </>
      );
    }
}

export default SearchField;