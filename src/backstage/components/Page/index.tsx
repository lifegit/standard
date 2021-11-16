import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import ResultCard from '@/backstage/components/ResultCard';
import { ResultProps } from 'antd';
import { PageContainerProps } from '@ant-design/pro-layout/lib/components/PageContainer';

export type Options = {
  error?: Error;
  resultErrProps?: ResultProps
  PageProps?: PageContainerProps
}

const Index: React.FC<Options> = (props) => (
  <PageContainer {...props.PageProps} >
    {props.error ? (
      <ResultCard subTitle={props.error} {...props.resultErrProps} />
    ) : (
      props.children
    )}
  </PageContainer>
)

export default Index
