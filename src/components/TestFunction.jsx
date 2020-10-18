import React, { Fragment } from 'react';


export const TestFunction = (props) => {
  const { title } = props;
  return (
    <Fragment>
      <span>{title}</span>
    </Fragment>
  )
}