import { useState, useCallback, useMemo, useRef } from 'react';
import { Button, Checkbox, Collapse, Badge, Space } from 'antd';
import classnames from 'classnames';
import { useHover } from 'ahooks';
import {
  DeleteOutlined,
  CaretRightOutlined,
  HolderOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';
import CodeEditor from '@/components/CodeEditor';
import NameEditor from './NameEditor';
import ParamsSelect from './ParamsSelect';
import styles from './index.less';
import IconTooltip from '@/components/IconTooltip';

export type TOnChangeType = (
  action: 'delete' | 'update',
  value: Partial<ComponentData.TFilterConfig> & { id: string },
) => void;
export type TOnComponentChangeType = (
  action: 'delete' | 'update',
  value: Partial<ComponentData.TComponentFilterConfig> & { id: string },
) => void;

const { Panel } = Collapse;

const DragHandle = SortableHandle(() => {
  return <HolderOutlined className="m-r-8 c-po" />;
});

const DataFilter = (props: {
  isTemp?: boolean;
  onChange?: TOnChangeType;
  onComponentChange?: TOnComponentChangeType;
  onCodeConfirm?: (
    value: Partial<ComponentData.TFilterConfig> & { id: string },
  ) => void;
  onCodeCancel?: () => void;
  dragDisabled?: boolean;
  props: ComponentData.TFilterConfig & ComponentData.TComponentFilterConfig;
}) => {
  const {
    props: { disabled, id, name, code, params },
    onCodeCancel: propsOnCodeCancel,
    onCodeConfirm: propsOnCodeConfirm,
    onChange,
    onComponentChange: propsOnComponentChange,
    isTemp,
    dragDisabled,
    ...nextProps
  } = props;

  const [updateFilter, setUpdateFilter] =
    useState<Partial<ComponentData.TFilterConfig> | null>(
      isTemp ? { code } : null,
    );

  const [activeKey, setActiveKey] = useState<string>(isTemp ? id : '');

  const headerRef = useRef<HTMLDivElement>(null);

  const isHover = useHover(headerRef);

  const onCodeCancel = useCallback(() => {
    setUpdateFilter(null);
    propsOnCodeCancel?.();
    setActiveKey('');
  }, []);

  const onConfirm = useCallback(() => {
    propsOnCodeConfirm?.(updateFilter ? { id, ...updateFilter } : { id });
    setActiveKey('');
    setUpdateFilter(null);
  }, [propsOnCodeConfirm, updateFilter, id]);

  const onConfigChange = useCallback(
    (
      key: keyof ComponentData.TFilterConfig,
      action: 'delete' | 'update',
      updateValue: any,
    ) => {
      onChange?.(action, {
        id,
        [key]: updateValue,
      });
    },
    [id, onChange],
  );

  const onUpdateFilterChange = useCallback(
    (key: keyof ComponentData.TFilterConfig, value: any) => {
      const newUpdateFilter = {
        ...(updateFilter || {}),
        [key]: value,
        id,
      };
      setUpdateFilter(newUpdateFilter);
    },
    [id],
  );

  const onComponentChange = useCallback(
    (
      key: keyof ComponentData.TComponentFilterConfig,
      action: 'delete' | 'update',
      value: any,
    ) => {
      propsOnComponentChange?.(action, {
        [key]: value,
        id,
      });
    },
    [propsOnComponentChange, id],
  );

  const stop = (e: any) => {
    e.stopPropagation();
  };

  const header = useMemo(() => {
    return (
      <div
        ref={headerRef}
        className={classnames(
          'dis-flex',
          'w-100',
          styles['design-config-data-filter-list-item-header'],
        )}
      >
        {!dragDisabled && !isTemp && <DragHandle />}
        <Checkbox
          checked={!disabled}
          onChange={(e) => {
            onComponentChange('disabled', 'update', !e.target.checked);
          }}
          onClick={stop}
          style={{
            visibility: isTemp ? 'hidden' : 'visible',
          }}
        />
        <NameEditor
          value={name}
          onChange={onConfigChange.bind(null, 'name', 'update')}
          isHover={isHover}
        />
        <div
          style={{
            flex: 1,
            visibility: isHover ? 'visible' : 'hidden',
            textAlign: 'right',
          }}
        >
          <Button
            className="h-a"
            type="link"
            icon={<DeleteOutlined />}
            onClick={(e) => {
              stop(e);
              onComponentChange('id', 'delete', null);
            }}
          ></Button>
        </div>
      </div>
    );
  }, [
    disabled,
    name,
    onComponentChange,
    onConfigChange,
    isHover,
    dragDisabled,
  ]);

  const onPanelCloseChange = useCallback(
    (value) => {
      const realList = value.filter((item: any) => item === id);
      if (!realList.includes(id) && !!updateFilter) return;
      setActiveKey(realList[0]);
    },
    [id, updateFilter],
  );

  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      expandIconPosition="right"
      className={styles['design-config-data-filter-list-item']}
      activeKey={[activeKey]}
      onChange={onPanelCloseChange}
      style={{ zIndex: 9999, opacity: 1, visibility: 'visible' }}
      {...nextProps}
    >
      <Panel
        header={header}
        key={id}
        className={classnames({
          [styles['design-config-data-filter-list-item-content']]:
            !!updateFilter,
        })}
      >
        <p className="m-t-4">
          全局参数
          <IconTooltip title="可响应式更新数据" iconStyle={{ marginLeft: 0 }}>
            <QuestionCircleOutlined />
          </IconTooltip>
          {' ：'}
        </p>
        <div className="p-lr-8">
          <ParamsSelect
            value={updateFilter?.params ?? params}
            onChange={onUpdateFilterChange.bind(null, 'params')}
            className="m-t-4 m-b-8"
          />
        </div>

        <p>{'function filter( data, global ) {'}</p>
        <CodeEditor
          language="javascript"
          width={426}
          height={180}
          value={updateFilter?.code ?? code}
          onChange={onUpdateFilterChange.bind(null, 'code')}
        />
        <p>{'}'}</p>
        <div className={styles['design-config-data-filter-list-item-action']}>
          <div>{updateFilter && <Badge status="warning" text="未保存" />}</div>
          <div>
            <Space>
              <Button onClick={onCodeCancel}>{isTemp ? '取消' : '撤销'}</Button>
              <Button type="primary" onClick={onConfirm}>
                {isTemp ? '保存' : '完成'}
              </Button>
            </Space>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
};

export default SortableElement(DataFilter);
