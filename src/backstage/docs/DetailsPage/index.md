---
group:
  title: DetailsPage - 详情页
  path: /details-page
---

## 展示页

1. 初始化时务必处理 loading 和 error 状态，推荐使用 [useRequest](https://ahooks.js.org/zh-CN/hooks/async) 。
 - loading: 显示加载状态（[`<Proskeleton/>` 骨架屏](https://procomponents.ant.design/components/skeleton) 或 [`<Card/>` 卡片](https://ant.design/components/card-cn/) 等 loading）。
 - error: 如果出错则显示错误落地页。
为了满足上述需求，我们简单封装了 `<Page /> 页` 组件来帮助我们。

### 示例

```tsx
/**
 * iframe: 600
 */
import React from 'react';
import { history } from 'umi';
import { Result, Avatar, Card, Skeleton } from 'antd';
import { useRequest } from 'ahooks';
import Page from '../../components/Page';
import Meta from 'antd/lib/card/Meta';
import ProLayout from '@ant-design/pro-layout';

const Index: React.FC = () => {
  const { query } = history.location;
  const id = query?.id as string;

  const { data, error, loading } = useRequest<string>(() =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        new Date().getTime() % 2 === 0 ? resolve('hi,当时时间非常棒!') : reject('当时时间不适合')
      }, 3500)
    })
  );

  return (
    <ProLayout style={{  height: '120vh' }}>
      <Page error={error}>
        <Skeleton loading={loading} active>
          <Result
            status="success"
            title={'title'}
            subTitle={data}
          />
        </Skeleton>
      </Page>
    </ProLayout>
  );
};

export default Index;
```
