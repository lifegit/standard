---
group:
  title: DetailsFormPage - 详情表单页
  path: /details-page
---

## 表单页


### 大型表单

1. 推荐使用三列布局且结合栅格布局。
1. 提交按钮应固定到页面底部。
   
#### 示例

```tsx
/**
 * iframe: 1200
 */
import React,{useState} from 'react';
import {Card, Col, message, Row} from 'antd';
import ProForm, {ProFormDateRangePicker, ProFormSelect, ProFormText, ProFormTimePicker,} from '@ant-design/pro-form';
import {FooterToolbar, PageContainer} from '@ant-design/pro-layout';
import FormErrorList from '../../components/FormErrorList';
import ProLayout from '@ant-design/pro-layout';
import {FieldError} from "rc-field-form/es/interface";
import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumnType } from '@ant-design/pro-table';

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}
const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};
export default () => {
  const [errors, setErrors] = useState<FieldError[]>([]);

  const onFinish = async (values: Record<string, any>) => {
    // http request
    return Promise.resolve(values).then(()=>{
      message.success('提交成功');
    })
  };

  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: '成员姓名',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: '工号',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.key);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  return (
    <ProLayout style={{ height: '120vh' }}>
      <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
        <ProForm
          layout="vertical"
          hideRequiredMark
          submitter={{
            render: (props, dom) => (
              <FooterToolbar>
                <FormErrorList errors={errors} fieldLabels={fieldLabels} />
                {dom}
              </FooterToolbar>
            )
          }}
          onFinish={onFinish}
          onFieldsChange={(_,v) => setErrors(v as FieldError[])}
        >
          <Card title="仓库管理" bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={fieldLabels.name}
                  name="name"
                  rules={[{ required: true, message: '请输入仓库名称' }]}
                  placeholder="请输入仓库名称"
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={fieldLabels.url}
                  name="url"
                  rules={[{ required: true, message: '请选择' }]}
                  fieldProps={{
                    style: { width: '100%' },
                    addonBefore: 'http://',
                    addonAfter: '.com',
                  }}
                  placeholder="请输入"
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormSelect
                  label={fieldLabels.owner}
                  name="owner"
                  rules={[{ required: true, message: '请选择管理员' }]}
                  options={[
                    {
                      label: '付晓晓',
                      value: 'xiao',
                    },
                    {
                      label: '周毛毛',
                      value: 'mao',
                    },
                  ]}
                  placeholder="请选择管理员"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormSelect
                  label={fieldLabels.approver}
                  name="approver"
                  rules={[{ required: true, message: '请选择审批员' }]}
                  options={[
                    {
                      label: '付晓晓',
                      value: 'xiao',
                    },
                    {
                      label: '周毛毛',
                      value: 'mao',
                    },
                  ]}
                  placeholder="请选择审批员"
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormDateRangePicker
                  label={fieldLabels.dateRange}
                  name="dateRange"
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  rules={[{ required: true, message: '请选择生效日期' }]}
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormSelect
                  label={fieldLabels.type}
                  name="type"
                  rules={[{ required: true, message: '请选择仓库类型' }]}
                  options={[
                    {
                      label: '私密',
                      value: 'private',
                    },
                    {
                      label: '公开',
                      value: 'public',
                    },
                  ]}
                  placeholder="请选择仓库类型"
                />
              </Col>
            </Row>
          </Card>
          <Card title="任务管理" bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormText
                  label={fieldLabels.name2}
                  name="name2"
                  rules={[{ required: true, message: '请输入' }]}
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormText
                  label={fieldLabels.url2}
                  name="url2"
                  rules={[{ required: true, message: '请选择' }]}
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormSelect
                  label={fieldLabels.owner2}
                  name="owner2"
                  rules={[{ required: true, message: '请选择管理员' }]}
                  options={[
                    {
                      label: '付晓晓',
                      value: 'xiao',
                    },
                    {
                      label: '周毛毛',
                      value: 'mao',
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <ProFormSelect
                  label={fieldLabels.approver2}
                  name="approver2"
                  rules={[{ required: true, message: '请选择审批员' }]}
                  options={[
                    {
                      label: '付晓晓',
                      value: 'xiao',
                    },
                    {
                      label: '周毛毛',
                      value: 'mao',
                    },
                  ]}
                  placeholder="请选择审批员"
                />
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <ProFormTimePicker
                  label={fieldLabels.dateRange2}
                  name="dateRange2"
                  rules={[{ required: true, message: '请输入' }]}
                  placeholder="提醒时间"
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                />
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <ProFormSelect
                  label={fieldLabels.type2}
                  name="type2"
                  rules={[{ required: true, message: '请选择仓库类型' }]}
                  options={[
                    {
                      label: '私密',
                      value: 'private',
                    },
                    {
                      label: '公开',
                      value: 'public',
                    },
                  ]}
                  placeholder="请选择仓库类型"
                />
              </Col>
            </Row>
          </Card>
          <Card title="成员管理" bordered={false}>
            <ProForm.Item name="members">
              <EditableProTable<TableFormDateType>
                recordCreatorProps={{
                  record: () => {
                    return {
                      key: `0${Date.now()}`,
                    };
                  },
                }}
                columns={columns}
                rowKey="key"
              />
            </ProForm.Item>
          </Card>
        </ProForm>
      </PageContainer>
    </ProLayout>
  );
};
```


### 小型表单

1. 使用单列布局，且表单需要居中。
1. 提交按钮紧跟表单最后一项的后边。


#### 示例

```tsx
/**
 * iframe: 1100
 */
import {Card, message} from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import React from 'react';
import ProLayout from '@ant-design/pro-layout';
import {PageContainer} from '@ant-design/pro-layout';

export default () => {
  return (
    <ProLayout>
      <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
        <Card bordered={false}>
          <ProForm
            hideRequiredMark
            style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
            name="basic"
            layout="vertical"
            initialValues={{ public: '1' }}
            onFinish={()=>(
              Promise.resolve().then(()=>{
                message.success('提交成功');
              })
            )}
          >
            <ProFormText
              width="md"
              label="标题"
              name="title"
              required
              rules={[
                {
                  required: true,
                  message: '请输入标题',
                },
              ]}
              placeholder="给目标起个名字"
            />
            <ProFormDateRangePicker
              label="起止日期"
              width="md"
              name="date"
              required
              rules={[
                {
                  required: true,
                  message: '请选择起止日期',
                },
              ]}
              placeholder={['开始日期', '结束日期']}
            />
            <ProFormTextArea
              label="目标描述"
              width="xl"
              name="goal"
              required
              rules={[
                {
                  required: true,
                  message: '请输入目标描述',
                },
              ]}
              placeholder="请输入你的阶段性工作目标"
            />
  
            <ProFormTextArea
              label="衡量标准"
              name="standard"
              width="xl"
              required
              rules={[
                {
                  required: true,
                  message: '请输入衡量标准',
                },
              ]}
              placeholder="请输入衡量标准"
            />
  
            <ProFormText
              width="md"
              label={'客户'}
              tooltip="目标的服务对象"
              name="client"
              placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"
            />
  
            <ProFormText
              width="md"
              label={'邀评人'}
              name="invites"
              placeholder="请直接 @姓名／工号，最多可邀请 5 人"
            />
  
            <ProFormDigit
              label={'权重'}
              name="weight"
              placeholder="请输入"
              min={0}
              max={100}
              width="xs"
              fieldProps={{
                formatter: (value) => `${value || 0}%`,
                parser: (value) => (value ? value.replace('%', '') : '0'),
              }}
            />
  
            <ProFormRadio.Group
              options={[
                {
                  value: '1',
                  label: '公开',
                },
                {
                  value: '2',
                  label: '部分公开',
                },
                {
                  value: '3',
                  label: '不公开',
                },
              ]}
              label="目标公开"
              help="客户、邀评人默认被分享"
              name="publicType"
            />
            <ProFormDependency name={['publicType']}>
              {({ publicType }) => {
                return (
                  <ProFormSelect
                    width="md"
                    name="publicUsers"
                    fieldProps={{
                      style: {
                        margin: '8px 0',
                        display: publicType && publicType === '2' ? 'block' : 'none',
                      },
                    }}
                    options={[
                      {
                        value: '1',
                        label: '同事甲',
                      },
                      {
                        value: '2',
                        label: '同事乙',
                      },
                      {
                        value: '3',
                        label: '同事丙',
                      },
                    ]}
                  />
                );
              }}
            </ProFormDependency>
          </ProForm>
        </Card>
      </PageContainer>
    </ProLayout>
  );
};
```
