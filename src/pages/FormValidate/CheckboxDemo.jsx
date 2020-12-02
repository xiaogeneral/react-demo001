import React, {useState} from "react";
import {Form, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const CheckboxDemo = (props) => {
  const {form} = props;
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    validateFields,
  } = form
  const [checkObj, setCheckObj] = useState({
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  })

  const onChange = checkedList => {
    setCheckObj({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };

  const onCheckAllChange = e => {
    setCheckObj({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  return (
    <div>
      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
        <Form>
          <Form.Item>
            <Checkbox
              indeterminate={checkObj.indeterminate}
              onChange={onCheckAllChange}
              checked={checkObj.checkAll}
            >
              Check all
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <CheckboxGroup
              options={plainOptions}
              value={checkObj.checkedList}
              onChange={onChange}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
export default Form.create({name: 'check'})(CheckboxDemo);