import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { get } from 'lodash';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { connect } from 'umi';
import { useAnyDva } from '@/hooks';
import Drawer from '../../../FocusDrawer';
import Marquee from '../Marquee';
import Tooltip from '../Tooltip';

export type VariableUsageProps = {
  setSelect: (value: string[]) => void;
};

export type VariableUsageRef = {
  open: (variable: string) => void;
};

export type ValueType = {
  component: string;
  componentId: string;
  usage: 'filter' | 'condition' | 'iframe';
  detail: string;
};

const VariableUsage = forwardRef<VariableUsageRef, VariableUsageProps>(
  (props, ref) => {
    const { setSelect } = props;

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [dataSource, setDataSource] = useState<ValueType[]>([]);

    const { getState } = useAnyDva();

    const handleSelect = (componentId: string) => {
      setSelect([componentId]);
    };

    const columns: ColumnsType<ValueType> = [
      {
        title: '组件id',
        dataIndex: 'componentId',
        key: 'componentId',
      },
      {
        title: '组件名称',
        dataIndex: 'component',
        key: 'component',
        width: 200,
        render: (value, record) => {
          return (
            <Tooltip title="点击跳转到该组件">
              <Button
                type="link"
                style={{ padding: 0 }}
                onClick={handleSelect.bind(null, record.componentId)}
              >
                {value}
              </Button>
            </Tooltip>
          );
        },
      },
      {
        title: '使用位置',
        dataIndex: 'usage',
        key: 'usage',
        render: (value) => {
          const keyMap: { [key: string]: string } = {
            filter: '过滤器',
            condition: '条件',
            iframe: 'iframe关联参数',
          };
          return keyMap[value];
        },
      },
      {
        title: '详情',
        dataIndex: 'detail',
        key: 'detail',
        width: 150,
      },
    ];

    const open = (variable: string) => {
      setVisible(true);
      setLoading(true);

      // 查找使用variable的地方
      // 1. 条件
      // 2. 过滤器
      // 3. iframe的关联参数
      const { components, screenData } = getState().global;
      const filterDataSource: ComponentData.TFilterConfig[] = get(
        screenData,
        'config.attr.filter',
      );
      const paramsDataSource: ComponentData.TParams[] =
        get(screenData, 'config.attr.params') || [];
      const variableId =
        paramsDataSource.find((item) => item.variable === variable)?.id || '';

      // 未找到对应的params
      if (!variableId) {
        setLoading(false);
        setDataSource([]);
        return;
      }

      function judge(
        components: ComponentData.TComponentData[],
        filterComponentDataSource: ValueType[],
        parent: string[],
      ) {
        components.forEach((component) => {
          const { components, name, id, componentType } = component;
          const filter = get(component, 'config.data.filter') || { value: [] };
          const condition: ComponentData.ComponentConditionConfig = get(
            component,
            'config.options.condition',
          ) || { value: [], initialState: 'visible' };

          const commonDataSourceConfig: ValueType = {
            component: [...parent, name].join('->'),
            componentId: id,
            usage: 'filter',
            detail: '',
          };

          // iframe
          if (
            componentType === 'IFRAME' &&
            (
              get(component, 'config.options.relationParams') ||
              ([] as string[])
            ).includes(variableId)
          ) {
            filterComponentDataSource.push({
              ...commonDataSourceConfig,
              usage: 'iframe',
              detail: '关联参数中',
            });
            return;
          }

          let detailInfo: false | string = false;
          // 过滤器
          const filterDataWidthDetail = filterDataSource.filter((item) => {
            return (
              item.params.includes(variableId) ||
              item.code.includes(`{{${variable}}}`)
            );
          });
          const filterTarget = filterDataWidthDetail.find((item) => {
            return filter.value.some((data) => data.id === item.id);
          });
          if (filterTarget) {
            filterComponentDataSource.push({
              ...commonDataSourceConfig,
              usage: 'filter',
              detail: filterTarget.code,
            });
            return;
          }

          // 条件
          condition.value.find((item) => {
            const { type, value } = item;
            const { code, condition } = value;
            if (type === 'code') {
              const { relation, code: codeString } = code || {};
              if (relation.includes(variableId)) {
                detailInfo = '自定义条件的关联参数中';
              } else if (codeString.includes(`{{${variable}}}`)) {
                detailInfo = codeString;
              }
            } else {
              const { rule } = condition;
              rule.some((item) => {
                const { rule } = item;
                return rule.some((item) => {
                  const { params } = item;
                  if (params === variableId) {
                    detailInfo = '基础条件中';
                    return true;
                  }
                  return false;
                });
              });
            }

            return !!detailInfo;
          });
          if (detailInfo) {
            filterComponentDataSource.push({
              ...commonDataSourceConfig,
              usage: 'condition',
              detail: detailInfo,
            });
            return;
          }

          // 子组件
          judge(components || [], filterComponentDataSource, [...parent, name]);
        });
      }
      const result: ValueType[] = [];
      judge(components, result, []);
      setDataSource(result);
      setLoading(false);
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          open,
        };
      },
      [],
    );

    return (
      <Drawer
        open={visible}
        loading={loading}
        placement="left"
        onClose={() => setVisible(false)}
        mask={false}
      >
        <div>
          <Marquee open>
            当前对于自定义逻辑代码中的使用情况只是做了简单比对查找，
            不一定准确，可手动点击查看是否使用￣□￣｜｜
          </Marquee>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            scroll={{ x: 'max-content' }}
            rowKey={'componentId'}
            className="m-t-16"
          />
        </div>
      </Drawer>
    );
  },
);

export default connect(
  () => ({}),
  (dispatch) => {
    return {
      setSelect: (value: string[]) =>
        dispatch({ type: 'global/setSelect', value }),
    };
  },
  null,
  {
    forwardRef: true,
  },
)(VariableUsage);
