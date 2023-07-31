import {
  DeleteOutlined,
  CaretRightOutlined,
  HolderOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useHover } from 'ahooks';
import { Button, Checkbox, Collapse, Badge, Space } from 'antd';
import classnames from 'classnames';
import { useState, useCallback, useMemo, useRef } from 'react';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';
import CodeEditor from '@/components/CodeEditor';
import IconTooltip from '@/components/IconTooltip';
import ParamsSelect from '@/components/ParamsSelect';
import FunctionHeader from '@/components/SyncCodeEditor/FunctionHeader';
import { ComponentNumber } from '@/pages/Designer/components/LeftContent/components/CallbackManage';
import NameEditor from './NameEditor';
import StepDataButton from './StepData';
import styles from './index.less';

export type TOnChangeType = (
  action: 'delete' | 'update' | 'name-update',
  value: Partial<ComponentData.TFilterConfig> & { id: string },
) => void;
export type TOnComponentChangeType = (
  action: 'delete' | 'update' | 'name-update',
  value: Partial<ComponentData.TComponentFilterConfig> & { id: string },
) => void;

const DragHandle = SortableHandle(() => {
  return <HolderOutlined className="c-po" />;
}) as any;

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
  }, [propsOnCodeCancel]);

  const onConfirm = useCallback(() => {
    propsOnCodeConfirm?.(updateFilter ? { id, ...updateFilter } : { id });
    setActiveKey('');
    setUpdateFilter(null);
  }, [propsOnCodeConfirm, updateFilter, id]);

  const onConfigChange = useCallback(
    (
      key: keyof ComponentData.TFilterConfig,
      action: 'delete' | 'update' | 'name-update',
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
    [id, updateFilter],
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
        <StepDataButton
          buttonProps={{
            style: {
              visibility: isHover && !disabled ? 'visible' : 'hidden',
            },
          }}
          id={id}
        />
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
          onChange={onConfigChange.bind(null, 'name', 'name-update')}
          isHover={isHover}
        />
        <div
          className={
            styles['design-config-data-filter-list-item-header-action-right']
          }
        >
          <div
            className={
              styles[
                'design-config-data-filter-list-item-header-action-right-info'
              ]
            }
          >
            共有
            <span>
              <ComponentNumber id={id} />
            </span>
            个组件使用
          </div>
          <Button
            className="h-a"
            type="link"
            icon={<DeleteOutlined />}
            style={{
              visibility: isHover ? 'visible' : 'hidden',
            }}
            onClick={(e) => {
              stop(e);
              onComponentChange('id', 'delete', null);
            }}
          />
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
      expandIconPosition="end"
      className={styles['design-config-data-filter-list-item']}
      activeKey={[activeKey]}
      onChange={onPanelCloseChange}
      style={{ zIndex: 9999, opacity: 1, visibility: 'visible' }}
      {...nextProps}
      items={[
        {
          key: id,
          label: header,
          className: classnames({
            [styles['design-config-data-filter-list-item-content']]:
              !!updateFilter,
          }),
          children: (
            <>
              <p className="m-t-4">
                全局参数
                <IconTooltip title="可响应式更新数据">
                  <QuestionCircleOutlined className="m-l-4" />
                </IconTooltip>
                {' ：'}
              </p>
              <div className="p-lr-8">
                <ParamsSelect
                  value={updateFilter?.params ?? params}
                  onChange={onUpdateFilterChange.bind(null, 'params')}
                  wrapperClassName="m-t-4 m-b-8"
                />
              </div>
              <FunctionHeader functionName="filter" />
              <CodeEditor
                language="javascript"
                width={426}
                height={180}
                value={updateFilter?.code ?? code}
                onChange={onUpdateFilterChange.bind(null, 'code')}
              />
              <p>{'}'}</p>
              <div
                className={styles['design-config-data-filter-list-item-action']}
              >
                <div>
                  {updateFilter && <Badge status="warning" text="未保存" />}
                </div>
                <div>
                  <Space>
                    <Button onClick={onCodeCancel}>
                      {isTemp ? '取消' : '撤销'}
                    </Button>
                    <Button type="primary" onClick={onConfirm}>
                      {isTemp ? '保存' : '完成'}
                    </Button>
                  </Space>
                </div>
              </div>
            </>
          ),
        },
      ]}
    />
  );
};

export default SortableElement(DataFilter) as any;
