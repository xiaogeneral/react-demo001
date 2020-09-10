import {
  ADD_LIST,
  CHANGE_VALUE
} from "./types";

export const addList = (dispatch) => {
  dispatch({
    type: ADD_LIST
  });
}
export const changeValue = (dispatch) => {
  dispatch({
    type: CHANGE_VALUE
  })
}