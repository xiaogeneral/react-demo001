import React, {useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
const DynamicRule = (props) => {
  const { form } = props;
  const { getFieldDecorator, validateFields } = form;
  const [checkNick, setCheckNick] = useState(false)

  const check = () => {
    validateFields(err => {
      if (!err) {
        console.info('success');
      }
    });
  };

  const handleChange = e => {
    setCheckNick(e.target.checked);
    // form.validateFields(['nickname'], { force: true });
  };

  return (
    <div>
      <Form.Item {...formItemLayout} label="Name">
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: 'Please input your name',
            },
          ],
        })(<Input placeholder="Please input your name" />)}
      </Form.Item>
      <Form.Item {...formItemLayout} label="Nickname">
        {getFieldDecorator('nickname', {
          rules: [
            {
              required: checkNick,
              message: 'Please input your nickname',
            },
          ],
        })(<Input placeholder="Please input your nickname" />)}
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Checkbox checked={checkNick} onChange={handleChange}>
          Nickname is required
        </Checkbox>
      </Form.Item>
      <Form.Item {...formTailLayout}>
        <Button type="primary" onClick={check}>
          Check
        </Button>
      </Form.Item>
    </div>
  );
}

export default Form.create({ name: 'dynamic_rule' })(DynamicRule);
