import { Drawer, Select, Checkbox as AntCheckbox } from 'antd';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useResponseData } from '@/hooks';
import FocusWrapper from '@/components/FocusWrapper';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import {
  GLOBAL_EVENT_EMITTER,
  EVENT_NAME_MAP,
} from '@/utils/Assist/EventEmitter';
import CodeViewer from '../CodeViewer';
import Title from './components/NormalTitle';
import ResponseDataTitle from './components/ResponseDataTitle';
import SubTitle, { SubForm } from './components/SubTitle';
import DataFilter from './components/DataFilter';
import DefineConfig from './components/DefineConfig';
import ResponseDataMap from './components/ResponseDataMap';
import { TOnChange } from './components/DefineConfig/type';
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

  // --- end

  return (
    <Drawer
      visible={visible}
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
            className="w-100 c-f-s"
            dropdownClassName="design-config-select-dropdown"
            value={type}
            defaultValue="static"
            onChange={onDataTypeChange}
          >
            <Option key="static" value="static">
              静态数据
            </Option>
            {!!GlobalConfig.ENABLE_MOCK_DATA_CONFIG && (
              <Option key="mock" value="mock">
                Mock
              </Option>
            )}
            <Option key="api" value="api">
              API
            </Option>
          </Select>
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
          }}
          mockProps={{
            onChange,
            value: props.value,
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

        <ResponseDataTitle value={props.value!} onChange={onChange} />

        <CodeViewer width={454} height={238} value={props.value!} />
      </FocusWrapper>
    </Drawer>
  );
});

export default DataConfigDetail;
