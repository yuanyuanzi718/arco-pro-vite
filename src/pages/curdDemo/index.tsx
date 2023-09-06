import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
} from '@arco-design/web-react';
import PermissionWrapper from '@/components/PermissionWrapper';
import { IconDownload, IconPlus } from '@arco-design/web-react/icon';
import { get, post } from '@/utils/axios';
// import axios from 'axios';
import SearchForm from './form';
import styles from './style/index.module.less';
import './mock';
import { getColumns } from './constants';
import Edit from './edit';

const { Title } = Typography;
export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['已上线', '未上线'];

function CurdDemo() {
  // 表单ref
  const editRef = useRef(null);

  const tableCallback = async (type, record) => {
    console.log(record, type);
    openEditHandler(type, record);
  };

  const columns = getColumns(tableCallback);

  const [data, setData] = useState([]);
  // 看分页组件了解
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});

  // 页码变动重新请求
  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);
    get('/api/list', {
      params: {
        page: current,
        pageSize,
        ...formParams,
      },
    }).then((res: any) => {
      console.log(res, 'res');

      setData(res.data.list);
      setPatination({
        ...pagination,
        current,
        pageSize,
        total: res.data.total,
      });
      setLoading(false);
    });
  }

  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }

  function handleSearch(params) {
    setPatination({ ...pagination, current: 1 });
    setFormParams(params);
  }

  // 操作
  const openEditHandler = async (type: string, record?: any) => {
    switch (type) {
      case 'create':
        editRef.current.showDrawer({
          // 状态
          status: 'create',
          record: {},
          formDetail: {},
        });
        break;
      case 'update':
        // const { data } = await detail({ id: record.id });
        editRef.current.showDrawer({
          status: 'update',
          record: record,
          formDetail: data,
        });
        break;
      case 'copy':
        // const { data } = await detail({ id: record.id });
        // delete data.id;
        editRef.current.showDrawer({
          status: 'copy',
          record: record,
          formDetail: data,
        });
        break;
      case 'delete':
        // const res = await fetch(`/api/admin/articles/${record.id}`, {
        //   method: "DELETE",
        // }).then((res) => res.json());
        // if (res.success) {
        //   message.success("删除成功");
        //   setQuery({ ...query });
        // }
        break;
    }
  };

  return (
    <Card>
      <Title heading={6}>查询表格</Title>
      <SearchForm onSearch={handleSearch} />
      {/* 权限管理 */}
      {/* <PermissionWrapper
        requiredPermissions={[
          { resource: 'menu.list.searchTable', actions: ['write'] },
        ]}
      >
        <div className={styles['button-group']}>
          <Space>
            <Button type="primary" icon={<IconPlus />}>
              新建
            </Button>
            <Button>批量导入</Button>
          </Space>
          <Space>
            <Button icon={<IconDownload />}>下载</Button>
          </Space>
        </div>
      </PermissionWrapper> */}
      <div className={styles['button-group']}>
        <Space>
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => openEditHandler('create', {})}
          >
            新建
          </Button>
          <Button>批量导入</Button>
        </Space>
        <Space>
          <Button icon={<IconDownload />}>下载</Button>
        </Space>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        onChange={onChangeTable}
        pagination={pagination}
        columns={columns}
        data={data}
      />
      <Edit ref={editRef} onSearch={handleSearch} />
    </Card>
  );
}

export default CurdDemo;
