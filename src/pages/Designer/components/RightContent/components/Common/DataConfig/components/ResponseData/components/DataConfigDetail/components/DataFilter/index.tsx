import { useCallback, useMemo, useState } from 'react';
import { connect } from 'dva';
import { nanoid } from 'nanoid';
import classnames from 'classnames';
import { useControllableValue, useUnmount } from 'ahooks';
import arrayMove from 'array-move';
import { DEFAULT_FILTER_CODE } from '@/utils';
import AddItem from './addItem';
import ListItem, { TOnChangeType, TOnComponentChangeType } from './ListItem';
import List from './List';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

const DataFilter = (props: {
  disabled?: boolean;
  filter: ComponentData.TFilterConfig[];
  setCallbackData: (value: ComponentData.TFilterConfig[]) => void;
  value?: ComponentData.TComponentFilterConfig[];
  onChange?: (value: ComponentData.TComponentFilterConfig[]) => void;
}) => {
  const { disabled, filter, setCallbackData } = props;

  const [value, setValue] = useControllableValue<
    ComponentData.TComponentFilterConfig[]
  >(props, {
    defaultValue: [],
  });

  const [tempFilterConfig, setTempFilterConfig] =
    useState<null | Partial<ComponentData.TFilterConfig>>(null);

  const mergedFilterList: (ComponentData.TFilterConfig &
    ComponentData.TComponentFilterConfig)[] = useMemo(() => {
    return [...value, ...(tempFilterConfig ? [tempFilterConfig] : [])].map(
      (item) => {
        const target = filter.find((filterItem) => filterItem.id === item.id);
        return {
          ...item,
          ...(target || {}),
        };
      },
    ) as (ComponentData.TFilterConfig & ComponentData.TComponentFilterConfig)[];
  }, [value, tempFilterConfig, filter]);

  const resetFilterConfig = (filterList: ComponentData.TFilterConfig[]) => {
    return filterList.map((item) => ({ ...item, editable: false }));
  };

  const onCodeConfirm = useCallback(
    (updateValue: Partial<ComponentData.TFilterConfig> & { id: string }) => {
      const { id } = updateValue;
      if (id === tempFilterConfig?.id) {
        setCallbackData([
          ...filter,
          {
            ...(tempFilterConfig as ComponentData.TFilterConfig),
            ...updateValue,
          },
        ]);
        setValue([
          ...value,
          {
            id,
            disabled: false,
          },
        ]);
        setTempFilterConfig(null);
      }
    },
    [filter, setCallbackData, tempFilterConfig, value],
  );

  const onCodeCancel = useCallback(
    (id: string) => {
      setCallbackData(resetFilterConfig(filter));
      if (id === tempFilterConfig?.id) {
        setTempFilterConfig(null);
      }
    },
    [setCallbackData, tempFilterConfig],
  );

  const onComponentChange: TOnComponentChangeType = useCallback(
    (action, updateValue) => {
      if (action === 'delete') {
        const newValue = value.filter((item) => item.id !== updateValue.id);
        setValue(newValue);
      } else {
        setValue(
          value.map((item) => {
            if (item.id !== updateValue.id) return item;
            return {
              ...item,
              ...updateValue,
            };
          }),
        );
      }
    },
    [value],
  );

  const onConfigChange: TOnChangeType = useCallback(
    (action, updateValue) => {
      if (action === 'delete') {
        if (updateValue.id === tempFilterConfig?.id) {
          setTempFilterConfig(null);
        }
      } else {
        if (updateValue.id === tempFilterConfig?.id) {
          setTempFilterConfig((prev) => {
            return {
              ...prev,
              ...updateValue,
            };
          });
        } else {
          setCallbackData(
            filter.map((item) => {
              if (item.id !== updateValue.id) return item;
              return {
                ...item,
                ...updateValue,
              };
            }),
          );
        }
      }
    },
    [value, tempFilterConfig],
  );

  const handleAdd = useCallback(() => {
    if (tempFilterConfig) return;
    const newFilterConfig: ComponentData.TFilterConfig = {
      id: nanoid(),
      editable: true,
      name: '自定义过滤器',
      code: DEFAULT_FILTER_CODE,
    };
    setTempFilterConfig(newFilterConfig);
  }, [tempFilterConfig]);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const reverseValue = value.reverse();
      const newResult = arrayMove(reverseValue, oldIndex, newIndex);
      setValue(newResult.reverse());
    },
    [value],
  );

  useUnmount(() => {
    setCallbackData(resetFilterConfig(filter));
  });

  return (
    <div
      className={classnames(
        'design-config-format-font-size',
        'design-config-format-font-size-with-collapse',
        styles['design-config-data-filter'],
        {
          [styles['design-config-data-filter-disabled']]: disabled,
        },
        'border-1',
      )}
    >
      <List onSortEnd={onSortEnd} useDragHandle distance={10}>
        {mergedFilterList.map((item, index) => {
          return (
            <ListItem
              props={item}
              index={index}
              key={item.id}
              onCodeConfirm={onCodeConfirm}
              onCodeCancel={onCodeCancel.bind(null, item.id)}
              onChange={onConfigChange}
              onComponentChange={onComponentChange}
              isTemp={item.id === tempFilterConfig?.id}
            />
          );
        })}
      </List>
      <AddItem
        dataSource={filter}
        onClick={handleAdd}
        value={value}
        onChange={setValue}
        btnDisabled={!!tempFilterConfig}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DataFilter);
