import React from 'react';
import { Button, Typography, Badge, Space } from '@arco-design/web-react';
import IconText from './icons/text.svg';
import IconHorizontalVideo from './icons/horizontal.svg';
import IconVerticalVideo from './icons/vertical.svg';
import dayjs from 'dayjs';
import styles from './style/index.module.less';

const { Text } = Typography;

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['未上线', '已上线'];

const ContentIcon = [
  <IconText key={0} />,
  <IconHorizontalVideo key={1} />,
  <IconVerticalVideo key={2} />,
];

export function getColumns(
  callback: (type: string, record: Record<string, any>) => Promise<void>
) {
  return [
    {
      title: '集合编号',
      dataIndex: 'id',
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: '集合名称',
      dataIndex: 'name',
    },
    {
      title: '内容体裁',
      dataIndex: 'contentType',
      render: (value) => (
        <div className={styles['content-type']}>
          {ContentIcon[value]}
          {ContentType[value]}
        </div>
      ),
    },
    {
      title: '筛选方式',
      dataIndex: 'filterType',
      render: (value) => FilterType[value],
    },
    {
      title: '内容量',
      dataIndex: 'count',
      sorter: (a, b) => a.count - b.count,
      render(x) {
        return Number(x).toLocaleString();
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      render: (x) => dayjs().subtract(x, 'days').format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a, b) => b.createdTime - a.createdTime,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (x) => {
        if (x === 0) {
          return <Badge status="error" text={Status[x]}></Badge>;
        }
        return <Badge status="success" text={Status[x]}></Badge>;
      },
    },
    {
      title: '操作',
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            onClick={() => callback('update', record)}
          >
            编辑
          </Button>
          <Button
            type="text"
            status="danger"
            size="small"
            onClick={() => callback('delete', record)}
          >
            删除
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => callback('copy', record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];
}

export default () => ContentIcon;
