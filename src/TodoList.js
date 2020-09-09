import React, { Component } from "react";
// import store from "./store";

class TodoList extends Component {
  constructor(props) {
    super(props);
    // this.state = store.getState();
    this.state = {
      inputValue: '',
      list: ['hello', 'world']
    }
  }
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      inputValue: e.target.value
    })
  }
  handleSubmit = () => {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      // inputValue: ''
    })
  }
  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.handleChange} type="text"/>
        <button onClick={this.handleSubmit}>提交</button>
        <ul>
          {
            this.state.list.map((item, index) => {
              return <li>{item}</li>
            })
          }
        </ul>
      </div>
    );
  }
}
export default TodoList;