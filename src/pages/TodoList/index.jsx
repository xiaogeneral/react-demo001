import React, {Fragment, useEffect, useState} from "react";
import store from "../../store";
import styles from './index.module.less'
console.log(styles, 'styles');

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
      <ul className={styles['list-wrap']}>
        {
          todolistData.list.map((item) => <li className={styles.item}>{item}</li>)
        }
      </ul>
    </Fragment>
  )
}
export default TodoList;