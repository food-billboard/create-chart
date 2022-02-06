import { useState, useCallback, useMemo, useRef } from 'react';
import { Button, Checkbox, Collapse, Badge, Space } from 'antd';
import classnames from 'classnames';
import { useHover } from 'ahooks';
import { DeleteOutlined, CaretRightOutlined } from '@ant-design/icons';
import {} from 'react-sortable-hoc';
import { CollapsePanelProps, CollapseProps } from 'antd/es/collapse';
import CodeEditor from '@/components/CodeEditor';
import NameEditor from './NameEditor';
import styles from './index.less';

export type TOnChangeType = (
  action: 'delete' | 'update',
  value: Partial<ComponentData.TFilterConfig> & { id: string },
) => void;
export type TOnComponentChangeType = (
  action: 'delete' | 'update',
  value: Partial<ComponentData.TComponentFilterConfig> & { id: string },
) => void;

const { Panel } = Collapse;

const Container = (props: CollapseProps) => {
  return <Collapse {...props} />;
};

const DragHandle = () => {
  return <div></div>;
};

const Content = (props: CollapsePanelProps) => {
  return <Panel {...props} />;
};

const DataFilter = (
  props: {
    isTemp?: boolean;
    onChange?: TOnChangeType;
    onComponentChange?: TOnComponentChangeType;
    onCodeConfirm?: (
      value: Partial<ComponentData.TFilterConfig> & { id: string },
    ) => void;
    onCodeCancel?: () => void;
  } & ComponentData.TFilterConfig &
    ComponentData.TComponentFilterConfig,
) => {
  const {
    disabled,
    id,
    name,
    code,
    onCodeCancel: propsOnCodeCancel,
    onCodeConfirm: propsOnCodeConfirm,
    onChange,
    onComponentChange: propsOnComponentChange,
    isTemp,
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

  const onCodeChange = useCallback((value: string) => {
    const newUpdateFilter = {
      ...(updateFilter || {}),
      code: value,
      id,
    };
    setUpdateFilter(newUpdateFilter);
  }, []);

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
              onConfigChange('code', 'delete', null);
            }}
          ></Button>
        </div>
      </div>
    );
  }, [disabled, name, onComponentChange, onConfigChange, isHover]);

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
    >
      <Panel header={header} key={id}>
        <p>{'function filter(data) {'}</p>
        <CodeEditor
          language="javascript"
          width={426}
          height={180}
          value={updateFilter?.code ?? code}
          onChange={onCodeChange}
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

export default DataFilter;
