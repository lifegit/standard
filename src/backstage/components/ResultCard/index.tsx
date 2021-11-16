import React from 'react';
import { Button, Card, Result, ResultProps } from 'antd';
import { history } from 'umi';

const Index: React.FC<ResultProps> = (props) => {
  const { title = '错误', subTitle = '获取信息错误！' } = props;

  return (
    <Card>
      <Result
        status="error"
        title={title}
        subTitle={subTitle}
        extra={[
          <Button key="primary" type="primary" onClick={() => history.goBack()}>
            返回
          </Button>,
        ]}
        {...props}
      />
    </Card>
  );
};

export default Index;
