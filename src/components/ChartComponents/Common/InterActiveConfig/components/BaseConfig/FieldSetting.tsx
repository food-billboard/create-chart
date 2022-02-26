import { useMemo, useCallback } from 'react';
import { Input } from 'antd';
import { connect } from 'dva';
import { getPath } from '@/utils/Assist/Component';
import InteractiveUtil from '@/utils/Assist/Interactive';
import MapTable from '../../../MapTable';
import { mapStateToProps, mapDispatchToProps } from './connect';

const FieldSetting = (props: {
  value: ComponentData.TBaseInteractiveConfig;
  onChange?: ComponentMethod.SetComponentMethod;
  id: string;
  dataSource: ComponentData.TBaseInteractiveConfig[];
  params: ComponentData.TParams[];
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
}) => {
  const { value, onChange, id, dataSource, params, setScreen } = props;
  const { name, fields } = value;

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

  const onFieldMapChange = useCallback(
    (value: ComponentData.TBaseInteractiveConfigField, e) => {
      const path = getPath(id);
      const mapValue = e.target.value;
      const { variable } = value;

      if (variable === mapValue) return;

      // sync the global params
      const mapId = InteractiveUtil.updateBaseInteractiveVariable(
        {
          params,
          setParams,
        },
        {
          variable: mapValue,
          id: value.mapId,
          origin: id,
          key: value.key,
        },
      );

      onChange?.({
        value: {
          config: {
            interactive: {
              base: dataSource.map((item) => {
                if (item.name !== name) return item;
                return {
                  ...item,
                  fields: item.fields.map((item) => {
                    if (item.key !== value.key) return item;
                    return {
                      ...item,
                      variable: mapValue,
                      mapId,
                    };
                  }),
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
    [id, onChange, params, setParams],
  );

  const columns = useMemo(() => {
    return [
      {
        key: 'key',
        title: '字段',
        dataIndex: 'key',
      },
      {
        key: 'variable',
        title: '绑定到变量',
        dataIndex: 'variable',
        width: 140,
        render: (
          value: string,
          record: ComponentData.TBaseInteractiveConfigField,
        ) => {
          return (
            <Input
              className="w-100"
              defaultValue={value}
              onBlur={onFieldMapChange.bind(null, record)}
              placeholder="可自定义"
            />
          );
        },
      },
      {
        key: 'description',
        title: '字段说明',
        dataIndex: 'description',
      },
    ];
  }, [onChange, onFieldMapChange]);

  return <MapTable dataSource={fields} columns={columns} rowKey="key" />;
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldSetting);
