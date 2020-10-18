import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { TestFunction } from './TestFunction';

export const TestParams = (props) => {
  const [title, setTitle] = useState('go');
  const handleRequest = () => {
    setTitle(`go${+new Date()}`)
    // const test = {
    //   a: undefined
    // }
    // console.log(`a=${test.a}`);
    // const config = {
    //   url: '/users/list',
    //   method: 'get',
    //   params: {
    //     a: null,
    //     b: '',
    //     c: 100,
    //     d: '100'
    //   }
    // }
    // axios(config).then((res) => {
    //   // todo
    //   console.log(res)
    // })
  }
  return (
    <Fragment>
      <Button type="primary" onClick={handleRequest}>send ajax!</Button>
      { TestFunction({ title }) }
    </Fragment>
  )
}
