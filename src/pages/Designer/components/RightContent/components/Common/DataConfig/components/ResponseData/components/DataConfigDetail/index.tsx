import { Drawer, Badge, Select, Checkbox } from 'antd';
import {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useResponseData } from '@/hooks';
import IconTooltip from '@/components/IconTooltip';
import FilterDataUtil from '@/utils/Assist/FilterData';
import CodeViewer from '../CodeViewer';
import SubTitle, { SubForm } from './components/SubTitle';
import DataFilter from './components/DataFilter';
import DefineConfig from './components/DefineConfig';
import ResponseDataMap from './components/ResponseDataMap';
import { TOnChange } from './components/DefineConfig/type.d';
import styles from './index.less';

export interface IDataConfigDetailRef {
  open: () => void;
}

interface IDataConfigDetailProps {
  value: ComponentData.TComponentApiDataConfig;
  onChange?: TOnChange;
}

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
  const { value, onChange } = props;
  const {
    request: { type, valueType, method, url, body, headers },
    filter: { show: filterShow, map, value: filterValue },
  } = value;

  const responseData = useResponseData(props.value);

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

  // config change
  // --- start
  const onDataTypeChange = useCallback(
    (value) => {
      onChange?.({
        request: {
          type: value,
        },
      });
    },
    [onChange],
  );

  const onDataFilterOpenChange = useCallback(
    (e) => {
      onChange?.({
        filter: {
          show: e.target.checked,
        },
      });
    },
    [onChange],
  );

  const onDataFilterValueChange = useCallback(
    (value) => {
      onChange?.({
        filter: {
          value,
        },
      });
    },
    [onChange],
  );

  // --- end

  const reRequestData = useCallback(() => {
    const result = FilterDataUtil.requestData(props.value!);
    onChange?.({
      request: {
        value: result,
      },
    });
  }, [value, onChange]);

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
            value={type}
            defaultValue="static"
            onChange={onDataTypeChange}
          >
            <Option key="static" value="static">
              静态数据
            </Option>
            <Option key="api" value="api">
              API
            </Option>
          </Select>
        </SubForm>
        <DefineConfig
          method={type}
          staticProps={{
            value: responseData,
            onChange,
          }}
          apiProps={{
            onChange,
            method,
            url,
            headers,
            body,
          }}
        />

        <Title visible={!!filterShow}>
          <Checkbox checked={filterShow} onChange={onDataFilterOpenChange}>
            数据过滤器
          </Checkbox>
        </Title>
        <DataFilter
          value={filterValue}
          onChange={onDataFilterValueChange}
          disabled={!filterShow}
        />
        <ResponseDataMap value={map} valueType={valueType} />

        <Title>
          数据响应结果
          <IconTooltip title="重新获取数据">
            <Loading3QuartersOutlined onClick={reRequestData} />
          </IconTooltip>
        </Title>

        <CodeViewer width={454} height={238} value={props.value!} />
      </div>
    </Drawer>
  );
});

export default DataConfigDetail;
