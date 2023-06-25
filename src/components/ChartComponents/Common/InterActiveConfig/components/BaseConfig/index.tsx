import { useMemo, ReactNode, useCallback } from 'react';
import { Collapse, Checkbox } from 'antd';
import { get } from 'lodash';
import { connect } from 'dva';
import { InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import { getPath } from '@/utils/Assist/Component';
import InteractiveUtil from '@/utils/Assist/Interactive';
import GlobalComponent from '@/utils/Assist/GlobalComponent';
import FieldSetting from './FieldSetting';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const { Panel } = Collapse;

export const Icon = ({ isActive }: any) => (
  <CaretRightOutlined rotate={isActive ? 90 : 0} />
);

const PanelHeader = (props: {
  value: ComponentData.TBaseInteractiveConfig;
}) => {
  const {
    value: { description, name },
  } = props;

  const Component = GlobalComponent.getComponent(
    description?.replace('component_', '') || '',
  );

  if (!description) return <>{name}</>;
  if (!description.startsWith('component_'))
    return (
      <>
        {name}
        <IconTooltip title={description}>
          <InfoCircleOutlined className="m-l-4" />
        </IconTooltip>
      </>
    );

  return (
    <>
      {name}
      {Component && <Component />}
    </>
  );
};

// 基础交互

const BaseConfig = (props: {
  id: string;
  component: ComponentData.TComponentData;
  onChange?: ComponentMethod.SetComponentMethod;
  params: ComponentData.TParams[];
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
}) => {
  const { id, component, onChange, params, setScreen } = props;

  const setParams = useCallback(
    (params: ComponentData.TParams[]) => {
      setScreen({
        config: {
          attr: {
            params,
          },
        },
      });
    },
    [setScreen],
  );

  const enableComponentInteractive = (show: boolean, originId: string) => {
    return InteractiveUtil.enableComponentInteractive(
      {
        params,
        setParams,
      },
      id,
      originId,
      show,
    );
  };

  const baseInteractive: ComponentData.TInteractiveConfig['base'] =
    useMemo(() => {
      return get(component, 'config.interactive.base')!;
    }, [component]);

  const { keys, domList } = useMemo(() => {
    const onKeyChange = (
      newValue: Partial<ComponentData.TBaseInteractiveConfig>,
    ) => {
      const path = getPath(id);
      onChange?.({
        value: {
          config: {
            interactive: {
              base: baseInteractive.map((item) => {
                if (item.name !== newValue.name) return item;
                return {
                  ...item,
                  ...newValue,
                };
              }),
            },
          },
        },
        id,
        path,
        action: 'update',
      });
    };

    return (baseInteractive || []).reduce<{
      keys: string[];
      domList: ReactNode[];
    }>(
      (acc, cur) => {
        const { type, name, show } = cur;

        acc.keys.push(type);

        acc.domList.push(
          <Panel
            header={<PanelHeader value={cur} />}
            key={type}
            extra={
              <Checkbox
                className={styles['design-config-interactive-base-checkbox']}
                checked={show}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const value = e.target.checked;
                  onKeyChange({
                    name,
                    show: value,
                  });
                  enableComponentInteractive(value, type);
                }}
              >
                <span onClick={(e) => e.stopPropagation()}>启用</span>
              </Checkbox>
            }
          >
            <FieldSetting
              value={cur}
              onChange={onChange}
              id={id}
              dataSource={baseInteractive}
              key={name}
              params={params}
              setParams={setParams}
              disabled={!show}
            />
          </Panel>,
        );

        return acc;
      },
      {
        keys: [],
        domList: [],
      },
    );
  }, [onChange, baseInteractive, params, setParams]);

  return (
    <div className={styles['design-config-interactive-base']}>
      <Collapse
        defaultActiveKey={['1']}
        expandIcon={Icon}
        bordered={false}
        className={styles['design-config-interactive-base-collapse']}
      >
        <Panel header="交互事件" key="1">
          <Collapse
            defaultActiveKey={keys}
            expandIcon={Icon}
            bordered={false}
            className={styles['design-config-interactive-base-collapse']}
          >
            {domList}
          </Collapse>
        </Panel>
      </Collapse>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseConfig);
