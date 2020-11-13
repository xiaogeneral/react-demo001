import React, { Fragment, useState } from "react";
import { connect } from 'react-redux'


const ConnectTodoList = (props) => {
  console.log(props, 'props')
  const { todolistData, handleInput, handleAdd } = props;
  return (
    <Fragment>
      <input type="text" value={todolistData.inputValue} onChange={handleInput}/>
      <button onClick={handleAdd}>提交</button>
      <ul>
        {
          todolistData.list.map((item) => <li>{item}</li>)
        }
      </ul>
    </Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    todolistData: {...state}
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInput(e) {
      dispatch({
        type: 'CHANGE_VALUE',
        payload: e.target.value
      })
    },
    handleAdd() {
      dispatch({
        type: 'ADD_ITEM',
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectTodoList);