import React from 'react';
import { FieldError } from 'rc-field-form/es/interface';
import { Popover } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './style.less';

interface Options {
  errors: FieldError[]
  fieldLabels?: Record<string, string>
}

const Index = (props: Options) => {
  const errorCount = props.errors.filter((item) => item.errors.length > 0).length;
  if (!props.errors || errorCount === 0) {
    return null;
  }
  const scrollToField = (fieldKey: string) => {
    const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
    if (labelNode) {
      labelNode.scrollIntoView(true);
    }
  };
  const errorList = props.errors.map((err) => {
    if (!err || err.errors.length === 0) {
      return null;
    }
    const key = err.name[0] as string;
    return (
      <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
         <CloseCircleOutlined className={styles.errorIcon} />
         <div className={styles.errorMessage}>{err.errors[0]}</div>
         <div className={styles.errorField}>{props.fieldLabels?.[key]}</div>
       </li>
     );
   });
   return (
    <span className={styles.errorIcon}>
      <Popover
        title="表单校验信息"
        content={errorList}
        overlayClassName={styles.errorPopover}
        trigger="click"
        getPopupContainer={(trigger: HTMLElement) => {
          if (trigger && trigger.parentNode) {
            return trigger.parentNode as HTMLElement;
          }
          return trigger;
        }}
      >
        <CloseCircleOutlined /> {errorCount}
      </Popover>
    </span>
  );
};

export default Index
