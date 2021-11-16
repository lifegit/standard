import React from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { BugOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space } from 'antd';

const columns = [
  { title: '名称', dataIndex: 'name' },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a key="1">编辑</a>,
      <a key='2'>详情</a>,
      <TableDropdown
        n

        // key="3"
        // b='更多2'
        // menus={[
          {/*{ key: 'available', name: <Space><BugOutlined />审批</Space> },*/}
          {/*{ key: 'delete', name: <Space><DeleteOutlined />删除</Space> },*/}
        // ]}
      />,
    ],
  }
]
export default () => {
  return (
    <ProTable
      columns={columns}
      dataSource={[{ name: '名称一' }]}
      search={false}
      options={false}
      pagination={false}
    />
  )
};
