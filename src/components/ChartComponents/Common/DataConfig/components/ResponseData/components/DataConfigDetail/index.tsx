import { Drawer, Checkbox as AntCheckbox } from 'antd';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import Select from '@/components/ChartComponents/Common/Select';
import FocusWrapper from '@/components/FocusWrapper';
import { useResponseData } from '@/hooks';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import CodeViewer from '../CodeViewer';
import DataFilter from './components/DataFilter';
import DefineConfig from './components/DefineConfig';
import { TOnChange } from './components/DefineConfig/type';
import Title from './components/NormalTitle';
import ResponseDataMap from './components/ResponseDataMap';
import ResponseDataTitle from './components/ResponseDataTitle';
import SubTitle, { SubForm } from './components/SubTitle';
import styles from './index.less';

export interface IDataConfigDetailRef {
  open: () => void;
}

interface IDataConfigDetailProps {
  value: ComponentData.TComponentApiDataConfig;
  onChange?: TOnChange;
  id: string;
}

const { Option } = Select;

const DataConfigDetail = forwardRef<
  IDataConfigDetailRef,
  IDataConfigDetailProps
>((props, ref) => {
  const { value, onChange, id } = props;
  const {
    request: { type, valueType },
    filter: { show: filterShow, map, value: filterValue },
  } = value;

  const responseData = useResponseData(props.value);

  const [visible, setVisible] = useState<boolean>(false);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  // 特殊数据类型配置
  const DataOptions = useMemo(() => {
    // TODO
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
      const value = e.target.checked;
      onChange?.({
        filter: {
          show: value,
        },
      });
      // 绑定全局事件
      GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_FILTER_CHANGE, {
        id,
        componentConfig: {
          filter: {
            show: value,
          },
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

  const dataSourceOptions = useMemo(() => {
    const options = [{ label: '静态数据', value: 'static' }];
    if (
      !!GlobalConfig.ENABLE_MOCK_DATA_CONFIG &&
      !GlobalConfig.IS_STATIC &&
      !GlobalConfig.IS_IMPROVE_BACKEND
    )
      options.push({ label: 'Mock', value: 'mock' });
    options.push({ label: 'API', value: 'api' });
    return options;
  }, []);

  // --- end

  return (
    <Drawer
      open={visible}
      placement="right"
      onClose={setVisible.bind(null, false)}
      title="设置数据源"
      width={500}
      bodyStyle={{ paddingTop: 0 }}
      destroyOnClose
    >
      <FocusWrapper
        className={styles['design-config-data-detail']}
        force={visible}
      >
        <Title>数据源</Title>
        <SubTitle>数据源类型</SubTitle>
        <SubForm>
          <Select
            className="w-100"
            value={type}
            defaultValue="static"
            onChange={onDataTypeChange}
            options={dataSourceOptions}
          />
        </SubForm>
        <DefineConfig
          type={type}
          staticProps={{
            value: responseData,
            onChange,
          }}
          apiProps={{
            onChange,
            value: props.value,
            componentId: id,
          }}
          mockProps={{
            onChange,
            value: props.value,
            componentId: id,
          }}
        />

        <Title visible={!!filterShow}>
          <AntCheckbox checked={filterShow} onChange={onDataFilterOpenChange}>
            数据过滤器
          </AntCheckbox>
        </Title>
        <DataFilter
          value={filterValue}
          onChange={onDataFilterValueChange}
          disabled={!filterShow}
          id={id}
        />
        <ResponseDataMap value={map} valueType={valueType} />

        <ResponseDataTitle
          value={props.value!}
          onChange={onChange}
          componentId={id}
        />

        <CodeViewer width={454} height={238} value={props.value!} />
      </FocusWrapper>
    </Drawer>
  );
});

export default DataConfigDetail;
