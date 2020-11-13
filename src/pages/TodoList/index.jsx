import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'
import { ADD_LIST, CHANGE_VALUE } from "../../store-old/types";

const TodoList = (props) => {
  const [inputValue, setInputValue] = useState('');
  const { list, dispatch } = props;
  const handleInput = (e) => {
    setInputValue(e.target.value);
    dispatch({
      type: CHANGE_VALUE,
      payload: e.target.value
    })
  }
  const handleAdd = () => {
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