import React, { useEffect, useState } from "react";
import axios from 'axios'
import {downloadByBlob, downloadDirect} from './utils/download';
let id = 1;
const TestOne = () => {
  console.log('hello hooks');
  const [name, setName] = useState('xiaoJiang007');
  const [age, setAge] = useState('16');
  // useEffect(() => {
  //   console.log('只在mount时执行');
  // }, [])
  // useEffect(() => {
  //   console.log('在mount及重新渲染时执行');
  // }, [name])
  const url = 'http://wproxy.org/whistle/img/iOS_proxy_settings.png';
  const handleAdd = () => {
    id = 3;
    setName((name) => {
      return name
    });
  }
  const handleApi = () => {
    axios.get('/test/api').then((res) => {
      // todo
    })
  }
  const handlDownload = () => {
    // downloadDirect(url);
    axios({
      url,
      responseType: 'blob'
    }).then((res) => {
      console.log(res, 'res===')
      downloadByBlob(res.data, 'iOS_proxy_settings.png')
    })
  }
  return (
    <div>
      hello hooks
      {/*<button onClick={handleAdd}>{name}</button>*/}
      <span>{age}</span>
      <button onClick={handleAdd}>{name}</button>
      <button onClick={handleApi}>测试接口代理</button>
      <button onClick={handlDownload}>文件下载</button>
      <input type="file"/>
    </div>
  )
}
export default TestOne;