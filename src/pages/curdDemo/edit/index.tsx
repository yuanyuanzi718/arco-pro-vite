import React, {
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
} from 'react';
import dayjs from 'dayjs';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Grid,
  Drawer,
} from '@arco-design/web-react';
// import { GlobalContext } from '@/context';
// import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
// import { ContentType, FilterType, Status } from './constants';
// import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { useForm } = Form;

const Edit = forwardRef(({ onSearch }: any, ref) => {
  // onSearch: (values: Record<string, any>) => void;
  const [form] = useForm();
  useImperativeHandle(ref, () => ({ showDrawer }));
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [status, setStatus] = useState('');

  const showDrawer = (value: any) => {
    const { record, status, formDetail } = value;
    if (status === 'create') {
      setVisible(true);
      setStatus(status);
      setRecord({});
      form.resetFields();
    } else {
      setVisible(true);
      setStatus(status);
      setRecord(record);
      form.setFieldsValue(formDetail);
    }
  };

  // const { lang } = useContext(GlobalContext);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values, 'values');
    // 数据提交
    if (status === 'create' || status === 'copy') {
      console.log('新建');
    } else {
      console.log('更新');
    }
    // 刷新列表
    // onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <Drawer
      width={800}
      title={<span>编辑</span>}
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleReset}
      okText="保存"
      cancelText="关闭"
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 10 }}>
        <Row gutter={24}>
          <Col>
            <Form.Item label="集合编号" field="id">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="集合名称" field="name">
              <Input allowClear placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
});

export default Edit;
