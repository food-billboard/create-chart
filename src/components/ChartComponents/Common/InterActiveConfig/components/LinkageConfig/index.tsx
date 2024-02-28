import { InfoCircleOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Checkbox } from 'antd';
import { get } from 'lodash';
import type { ItemType } from 'rc-collapse/es/interface';
import { useMemo, ReactNode, useCallback } from 'react';
import IconTooltip from '@/components/IconTooltip';
import { getPath } from '@/utils/Assist/Component';
import GlobalComponent from '@/utils/Assist/GlobalComponent';
import Textarea from '../../../Textarea';
import baseStyles from '../BaseConfig/index.less';

const { Panel } = Collapse;

export const Icon = ({ isActive }: any) => (
  <CaretRightOutlined rotate={isActive ? 90 : 0} />
);

const PanelHeader = (props: {
  value: ComponentData.TLinkageInteractiveConfig;
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

// 跳转交互

const LinkageConfig = (props: {
  id: string;
  component: ComponentData.TComponentData;
  onChange?: ComponentMethod.SetComponentMethod;
}) => {
  const { id, component, onChange } = props;

  const linkageInteractive: ComponentData.TLinkageInteractiveConfig[] =
    useMemo(() => {
      return get(component, 'config.interactive.linkage')!;
    }, [component]);

  const onLinkageChange = useCallback(
    (
      key: keyof ComponentData.TLinkageInteractiveConfig,
      name: string,
      value: any,
    ) => {
      const path = getPath(id);
      onChange?.({
        value: {
          config: {
            interactive: {
              linkage: linkageInteractive.map((item) => {
                if (item.name !== name) return item;
                return {
                  ...item,
                  [key]: value,
                };
              }),
            },
          },
        },
        id,
        path,
        action: 'update',
      });
    },
    [linkageInteractive, onChange, id],
  );

  const { keys, domList } = useMemo(() => {
    return (linkageInteractive || []).reduce<{
      keys: string[];
      domList: ItemType[];
    }>(
      (acc, cur) => {
        const { type, name, show, value } = cur;

        acc.keys.push(type);
        acc.domList.push({
          key: type,
          label: <PanelHeader value={cur} />,
          extra: (
            <Checkbox
              className={baseStyles['design-config-interactive-base-checkbox']}
              checked={show}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const value = e.target.checked;
                onLinkageChange('show', name, value);
              }}
            >
              <span onClick={(e) => e.stopPropagation()}>启用</span>
            </Checkbox>
          ),
          children: (
            <Textarea
              value={value}
              onChange={onLinkageChange.bind(null, 'value', name)}
              disabled={!show}
              rows={2}
            />
          ),
        });

        return acc;
      },
      {
        keys: [],
        domList: [],
      },
    );
  }, [onChange, linkageInteractive]);

  return (
    <div className={baseStyles['design-config-interactive-base']}>
      <Collapse
        defaultActiveKey={['2']}
        expandIcon={Icon}
        bordered={false}
        className={baseStyles['design-config-interactive-base-collapse']}
        items={[
          {
            label: (
              <IconTooltip title='链接地址支持变量，使用"{{}}"包含变量'>
                跳转交互
                <InfoCircleOutlined className="m-l-4" />
              </IconTooltip>
            ),
            key: '2',
            children: (
              <Collapse
                defaultActiveKey={keys}
                expandIcon={Icon}
                bordered={false}
                className={
                  baseStyles['design-config-interactive-base-collapse']
                }
                items={domList}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default LinkageConfig;
