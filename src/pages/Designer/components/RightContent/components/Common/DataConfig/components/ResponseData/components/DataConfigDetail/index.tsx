import { Drawer, Badge, Select, Checkbox } from 'antd';
import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import CodeEditor from '@/components/CodeEditor';
import SubTitle, { SubForm } from './components/SubTitle';
import DataFilter from './components/DataFilter';
import DefineConfig from './components/DefineConfig';
import ResponseDataMap from './components/ResponseDataMap';
import styles from './index.less';

export interface IDataConfigDetailRef {
  open: () => void;
}

interface IDataConfigDetailProps {}

const { Option } = Select;

const Title = (props: { children?: ReactNode; visible?: boolean }) => {
  const { children, visible = true } = props;

  const status = useMemo(() => {
    return visible ? 'processing' : 'default';
  }, [visible]);

  return (
    <div className={styles['design-config-data-detail-title']}>
      <Badge status={status} size="default" />
      {children}
    </div>
  );
};

const DataConfigDetail = forwardRef<
  IDataConfigDetailRef,
  IDataConfigDetailProps
>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  // 特殊数据类型配置
  const DataOptions = useMemo(() => {
    return <div></div>;
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open,
      };
    },
    [open],
  );

  return (
    <Drawer
      visible={visible}
      placement="right"
      onClose={setVisible.bind(null, false)}
      title="设置数据源"
      width={500}
      bodyStyle={{ paddingTop: 0 }}
    >
      <div className={styles['design-config-data-detail']}>
        <Title>数据源</Title>
        <SubTitle>数据源类型</SubTitle>
        <SubForm>
          <Select
            className="w-100 c-f-s"
            dropdownClassName="design-config-select-dropdown"
          >
            <Option key="static" value="static">
              静态数据
            </Option>
            <Option key="api" value="api">
              API
            </Option>
          </Select>
        </SubForm>
        <DefineConfig />

        <Title visible>
          <Checkbox>数据过滤器</Checkbox>
        </Title>
        <DataFilter />
        <ResponseDataMap />

        <Title>数据响应结果</Title>

        <CodeEditor
          language="json"
          disabled
          width={454}
          height={238}
          className={styles['design-config-data-detail-code-view']}
        />
      </div>
    </Drawer>
  );
});

export default DataConfigDetail;
