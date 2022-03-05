import { useMemo, ReactNode } from 'react';
import { Collapse, Checkbox } from 'antd';
import { get } from 'lodash';
import classnames from 'classnames';
import { InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import { getComponent, getPath } from '@/utils/Assist/Component';
import FieldSetting from './FieldSetting';
import styles from './index.less';

const { Panel } = Collapse;

export const Icon = ({ isActive }: any) => (
  <CaretRightOutlined rotate={isActive ? 90 : 0} />
);

// 基础交互

const BaseConfig = (props: {
  id: string;
  components: ComponentData.TComponentData[];
  onChange?: ComponentMethod.SetComponentMethod;
}) => {
  const { id, components, onChange } = props;

  const component = useMemo(() => {
    return getComponent(id, components);
  }, [id, components]);

  const baseInteractive: ComponentData.TInteractiveConfig['base'] =
    useMemo(() => {
      return get(component, 'config.interactive.base');
    }, [component]);

  if (!baseInteractive.length) {
    return (
      <div className={styles['design-config-interactive-base-empty']}>
        <InfoCircleOutlined style={{ marginRight: 4 }} />
        该组件无基础交互事件
      </div>
    );
  }

  const { keys, domList } = useMemo(() => {
    return baseInteractive.reduce<{
      keys: string[];
      domList: ReactNode[];
    }>(
      (acc, cur) => {
        const { type, name, show } = cur;

        acc.keys.push(type);

        acc.domList.push(
          <Panel
            header={name}
            key={type}
            extra={
              <Checkbox
                className={styles['design-config-interactive-base-checkbox']}
                checked={show}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const path = getPath(id);
                  const value = e.target.checked;
                  onChange?.({
                    value: {
                      config: {
                        interactive: {
                          base: baseInteractive.map((item) => {
                            if (item.name !== name) return item;
                            return {
                              ...item,
                              show: value,
                            };
                          }),
                        },
                      },
                    },
                    id,
                    path,
                    action: 'update',
                  });
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
  }, [onChange, baseInteractive]);

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

export default BaseConfig;
