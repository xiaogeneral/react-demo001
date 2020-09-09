import React from "react";
class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', id: 1};
    this.id = 1;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const data = `${event.target.value}--${this.id++}`
    this.setState({value: data});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          不能输入:
          <input type="text" value="hello input" />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
export default TestForm