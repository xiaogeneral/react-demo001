import React from 'react';
import CommonList from '../../components/NewList';
import { withRouter } from 'react-router';

const Check =  (props) => {
  const config = {
    header: '保障薪欠款查询',
    urls: {
      search: 'http://localhost:3004/mock/test',
      export: '/export',
      calculate: '/calculate'
    },
    items: ['status'],
    headActionList: [
      {
        type: "button",
        align: "left",
        label: "导出数据",
        icon: "download",
        className: "MR-s",
        primary: true,
        actionType: "ajax",
        api: {
          url: '/mack/test'
        }
      },
      {
        type: "button",
        align: "left",
        label: "导出列表",
        primary: true,
        onAction: () => {
          console.log(props);
          // 跳转到导出列表
          props.history.push('/g/exportList');
        }
      }
    ],
    columns: [
      {
        "type": "container",
        "label": "姓名",
        "body": (props) => (<a>{props.data.name}</a>)
      },
      {
        name: 'field1',
        label: '职级'
      },
      {
        name: 'field2',
        label: '薪资月'
      },
      {
        name: 'field3',
        label: '实发保障薪'
      },
      {
        name: 'field3',
        label: '核算月结款'
      },
      {
        name: 'field3',
        label: '核算月还款'
      },
      {
        name: 'field3',
        label: '累计欠款'
      },
      {
        name: 'field3',
        label: '借款剩余额度'
      },
      {
        name: 'field3',
        label: '计算状态'
      },
      {
        name: 'field3',
        label: '公司'
      }
    ]
  };
  return <CommonList {...config} />;
};
export default withRouter(Check);

