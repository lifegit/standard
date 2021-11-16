---
nav:
  title: 中后台
group:
  title: AnyPage - 任何页面
  path: /any-page
---

### 面包屑

任何页面都需要使用 [`<PageContainer/>` 页容器](https://procomponents.ant.design/components/page-container) 。因为他自动帮我们维护了标题和面包屑。以及提供了一些可用区供我们使用。


```tsx
/**
 * iframe: 600
 */
import React, { useState } from 'react';
import { Avatar, Button, Descriptions, Result, Space, Statistic } from 'antd';
import { UserOutlined, LikeOutlined } from '@ant-design/icons';
import ProLayout, { PageContainer, RouteContext } from '@ant-design/pro-layout';
import defaultProps from './_defaultProps';

const content = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="创建人">曲丽丽</Descriptions.Item>
        <Descriptions.Item label="订购产品">XX 服务</Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-07-07</Descriptions.Item>
        <Descriptions.Item label="关联单据">
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item>
        <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);


export default () => {
  const [pathname, setPathname] = useState('/welcome');
  return (
    <ProLayout
      {...defaultProps}
      location={{
        pathname,
      }}
      rightContentRender={() => (
        <div>
          <Avatar shape="square" size="small" icon={<UserOutlined />} />
        </div>
      )}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            setPathname(item.path || '/welcome');
          }}
        >
          {dom}
        </a>
      )}
    >
      <PageContainer
        content={content}
        tabList={[
          {
            tab: '基本信息',
            key: 'base',
          },
          {
            tab: '详细信息',
            key: 'info',
          },
        ]}
        extraContent={
          <Space size={24}>
            <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
            <Statistic title="Unmerged" value={93} suffix="/ 100" />
          </Space>
        }
        extra={[
          <Button key="3">操作</Button>,
          <Button key="2">操作</Button>,
          <Button key="1" type="primary">
            主操作
          </Button>,
        ]}
        footer={[
          <Button key="3">重置</Button>,
          <Button key="2" type="primary">
            提交
          </Button>,
        ]}
      >
        <div style={{  height: '120vh' }}>
          <Result
            status="404"
            style={{
              height: '100%',
              background: '#fff',
            }}
            title="Hello World"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">Back Home</Button>}
          />
        </div>
      </PageContainer>
    </ProLayout>
  );
};

```
