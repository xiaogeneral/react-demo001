import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'
import { ADD_LIST } from "../../store/types";

const TodoList = (props) => {
  const [inputValue, setInputValue] = useState('');
  const { list } = props;
  const handleInput = (e) => {
    // todo
    setInputValue(e.target.value);
  }
  const handleAdd = () => {
    // todo
    list.push(inputValue);
    props.dispatch({
      type: ADD_LIST,
      payload: [...list]
    })
  }
  return (
    <Fragment>
      <input type="text" value={inputValue} onChange={handleInput}/>
      <button onClick={handleAdd}>提交</button>
      <ul>
        {
          list.map((item) => <li>{item}</li>)
        }
      </ul>
    </Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}
export default connect(mapStateToProps)(TodoList);