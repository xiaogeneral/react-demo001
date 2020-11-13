import React, {Fragment, useEffect, useState} from "react";
import store from "../../store";

const TodoList = (props) => {
  const { getState, dispatch, subscribe } = store;
  const [todolistData, setTodolistData] = useState(getState());
  const handleInput = (e) => {
    dispatch({
      type: 'CHANGE_VALUE',
      payload: e.target.value
    })
  }
  const handleAdd = () => {
    dispatch({
      type: 'ADD_ITEM'
    })
  }
  // 挂载时添加订阅及卸载时取消订阅
  useEffect(() => {
    return subscribe(() => {
      setTodolistData({...getState()});
    })
  }, [])
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
export default TodoList;