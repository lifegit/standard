---
group:
  title: Table/List - 列表
  path: /table
---

## 表格

### 最佳实践

先来体验一下吧！我们稍后会展开讲解。

```tsx
/**
 * iframe: 400
 */
import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Button, Popconfirm, Space, Tag } from 'antd';
import { DrawerForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { DeleteOutlined,BugOutlined, PlusOutlined } from '@ant-design/icons';

interface TableListItem {
  name: string;
  status: string;
  tag: string;
  salePrice: number;
  remarks: string;
  crateTime: string;
};

const dataSource: TableListItem[] = [
  {
    name: '这是一条比较长的名称',
    status: 'error',
    tag: 'bug',
    salePrice: 100,
    remarks: '这是一条备注',
    crateTime: '2021-11-12'
  },
  {
    name: '这是一条比较长的名称',
    status: 'success',
    tag: 'question',
    salePrice: 98,
    remarks: '这是一条备注',
    crateTime: '2021-11-12'
  }
];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    valueEnum: {
      error: {
        text: '已通过',
        status: 'Error',
      },
      success: {
        text: '已拒绝',
        status: 'Success',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'tag',
    align: 'center',
    render: (_, row) => (
      <Tag color={'blue'}>
        {row.tag}
      </Tag>
    )
  },
  {
    title: '售价',
    dataIndex: 'salePrice',
    valueType: 'money',
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'remarks',
  },
  {
    title: '创建时间',
    dataIndex: 'crateTime',
    align: 'center'
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a key="1">
        <DrawForm
          trigger={<a key='2'>详情</a>}
          initialValues={record}
        />
      </a>,
      <a key='2'>编辑</a>,
      <TableDropdown
        key="3"
        menus={[
          { key: 'available', name: <Space><BugOutlined />审批</Space> },
          {
            key: 'delete',
            name: (
              <Popconfirm
                title="确定要删除吗？"
              >
                <Space><DeleteOutlined />删除</Space>
              </Popconfirm>
            )
          },
        ]}
      />,
    ],
  }
]


const DrawForm: React.FC<DrawerForm> = (props) => (
  <DrawerForm<TableListItem>
    title="新建表单"
    width={400}
    {...props}
  >
    <ProFormText
      label="名称"
      name="name"
    />
    <ProFormDigit
      label='售价'
      name="salePrice"
    />
    <ProFormTextArea
      label='备注'
      name="remarks"
    />
  </DrawerForm>
);

export default () => {
  return (
    <ProTable
      columns={columns}
      dataSource={dataSource}
      toolBarRender={() => [
        <DrawForm
          trigger={
            <Button type="primary">
              <PlusOutlined />新增
            </Button>
          }
        />
      ]}
    />
  )
};
```

### 列顺序

列的顺序建议摆放：
  - 按照业务优先级 或 视觉优先级摆放。
  - 操作栏放到最右边，时间相对右边。
  - 多个相同数据类型的字段按邻居摆放。

<Alert type="info">
  当然也不一定强迫按照这个要求，毕竟每一个模块都有自己的着重点
</Alert>

#### 代码演示
```tsx
import React from 'react';
import ProTable from '@ant-design/pro-table';

const columns = [
  { title: '名称' },
  { title: '状态' },
  { title: '标签' },
  { title: '售价' },
  { title: '备注' },
  { title: '创建时间' },
  { title: '操作' }
]
export default () => {
  return (
    <ProTable
      columns={columns}
      search={false}
      options={false}
    />
  )
};
```

### 操作栏

两项以上的操作放到更多里。

#### 代码演示

```tsx
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
        key="3"
        b='更多2'
        menus={[
          { key: 'available', name: <Space><BugOutlined />审批</Space> },
          { key: 'delete', name: <Space><DeleteOutlined />删除</Space> },
        ]}
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
```

### 抽屉

如果你需要预览一个简单详情，或者新增一个字段少的数据类型，你可以直接在当前页面的使用 [DrawerForm 表单](https://procomponents.ant.design/components/modal-form#drawer-%E8%A1%A8%E5%8D%95) 实现。

<Alert type="warning">
  不要在 <a src='https://ant.design/components/modal-cn/'>Modal 对话框</a> 里面使用 <a src='https://ant.design/components/form-cn'>Form 表单</a>，这会强行打断用户视觉且阻止用户操作。 
</Alert>

#### 代码演示
```tsx
/**
 * iframe: 300
 */
import React from 'react';
import { DrawerForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';

const DrawForm = () => (
  <DrawerForm
    title="新建表单"
    width={400}
    trigger={
      <Button type="primary">
        <PlusOutlined />
        新增
      </Button>
    }
  >
    <ProFormText
      label="名称"
    />
    <ProFormDigit
      label='售价'
    />
    <ProFormTextArea
      label='备注'
    />
  </DrawerForm>
);

export default () => {
  return (
    <ProTable
      search={false}
      toolBarRender={() => [
        <DrawForm/>
      ]}
    />
  )
};
```

### Table宽度
为了适配多端正常使用，Table整体应该存在一个宽度。请使用配置 [`scroll.x`](https://ant.design/components/table-cn#scroll)

#### 代码演示

### 列宽度
为了适配多端正常使用，每一列应该存在最小单位宽度。 //TODO
#### 代码演示


### 列较多

列数量较多时（通常大于10列以上），推荐使用 [ProList - 高级列表](https://procomponents.ant.design/components/list) 来布局。

#### 代码演示
```tsx
import React from 'react';
import { Button, Tag, Space } from 'antd';
import ProList from '@ant-design/pro-list';

const dataSource = [
  {
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
];

export default () => (
  <ProList
    rowKey="name"
    headerTitle="基础列表"
    tooltip="基础列表的配置"
    dataSource={dataSource}
    showActions="hover"
    showExtra="hover"
    metas={{
      title: {
        dataIndex: 'name',
      },
      avatar: {
        dataIndex: 'image',
      },
      description: {
        dataIndex: 'desc',
      },
      subTitle: {
        render: () => {
          return (
            <Space size={0}>
              <Tag color="blue">Ant Design</Tag>
              <Tag color="#5BD8A6">TechUI</Tag>
            </Space>
          );
        },
      },
      actions: {
        render: (text, row) => [
          <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="link">
            链路
          </a>,
          <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="warning">
            报警
          </a>,
          <a href={row.html_url} target="_blank" rel="noopener noreferrer" key="view">
            查看
          </a>,
        ],
      },
    }}
  />
);
```
### 列对齐

应该考虑每一列的居中问题：
 - 内容多 或 长度不固定推荐 `左对齐`
 - 内容少 或 固定长度推荐 `居中对齐`

#### 代码演示
```tsx
import React from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';

const columns = [
  { title: '名称', dataIndex:'field1' },
  { title: '状态', dataIndex:'field2', align: 'center' },
  { title: '时间', dataIndex:'field3', align: 'center', valueType:'dateTime' },
  { title: '字段5',dataIndex:'field4' },
];

const dataSource = [{
  field1:'wang li ',
  field2:'启用',
  field3:'2018-01-02 22:22:22',
  field4:'',
},{
  field1:'zhang san feng sr',
  field2:'禁用',
  field3:'2018-01-02 22:22:22',
  field4:'好多内容呢零零落落零零落落',
}]
export default () => {
  return (
    <ProTable
      columns={columns}
      dataSource={dataSource}
      search={false}
      options={false}
    />
  )
};
```

### 状态改变

涉及到状态改变(进度、删除），应该使用 [Popconfirm 气泡确认框](https://ant.design/components/popconfirm-cn/) 进行确认操作。

#### 代码演示
```tsx
import React from 'react';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Popconfirm } from 'antd';

const columns = [
  { title: '名称', dataIndex: 'name' },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <Popconfirm
        title="确定要删除吗？"
      >
        <a href="#">删除</a>
      </Popconfirm>
    ],
  }
]
export default () => {
  return (
    <ProTable
      columns={columns}
      dataSource={[{name: '名称一'}]}
      search={false}
      options={false}
      pagination={false}
    />
  )
};
```
