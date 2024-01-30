import { useControllableValue, useUnmount } from 'ahooks';
import arrayMove from 'array-move';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useState } from 'react';
import { connect } from 'umi';
import { DEFAULT_FILTER_CODE } from '@/utils';
import {
  EVENT_NAME_MAP,
  GLOBAL_EVENT_EMITTER,
} from '@/utils/Assist/EventEmitter';
import List from './List';
import ListItem, { TOnChangeType, TOnComponentChangeType } from './ListItem';
import AddItem from './addItem';
import { mapDispatchToProps, mapStateToProps } from './connect';
import styles from './index.less';

const DataFilter = (props: {
  id: string;
  disabled?: boolean;
  filter: ComponentData.TFilterConfig[];
  setCallbackData: (value: ComponentData.TFilterConfig[]) => void;
  value?: ComponentData.TComponentFilterConfig[];
  onChange?: (value: ComponentData.TComponentFilterConfig[]) => void;
}) => {
  const { disabled, filter, setCallbackData, id } = props;

  const [value, setValue] = useControllableValue<
    ComponentData.TComponentFilterConfig[]
  >(props, {
    defaultValue: [],
  });

  const wrapperSetValue = useCallback(
    (
      config: Partial<{
        filter: ComponentData.TFilterConfig[];
        value: ComponentData.TComponentFilterConfig[];
      }>,
    ) => {
      const { value, filter } = config;
      value && setValue(value);
      // 绑定全局事件
      GLOBAL_EVENT_EMITTER.emit(EVENT_NAME_MAP.COMPONENT_FILTER_CHANGE, {
        id,
        filter,
        componentConfig: {
          filter: {
            value,
          },
        },
      });
    },
    [],
  );

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
        const newCallback = [
          ...filter,
          {
            ...(tempFilterConfig as ComponentData.TFilterConfig),
            ...updateValue,
          },
        ];
        setCallbackData(newCallback);
        wrapperSetValue({
          value: [
            ...value,
            {
              id,
              disabled: false,
            },
          ],
          filter: newCallback,
        });
        setTempFilterConfig(null);
      } else {
        const newCallback = filter.map((item) => {
          if (item.id !== id) return item;
          return {
            ...item,
            ...updateValue,
          };
        });
        wrapperSetValue({
          filter: newCallback,
        });
        setCallbackData(newCallback);
      }
    },
    [filter, setCallbackData, tempFilterConfig, value],
  );

  const onCodeCancel = useCallback(
    (id: string) => {
      const newFilterList = resetFilterConfig(filter);
      setCallbackData(newFilterList);
      if (id === tempFilterConfig?.id) {
        setTempFilterConfig(null);
      }
    },
    [setCallbackData, tempFilterConfig, filter],
  );

  const onComponentChange: TOnComponentChangeType = useCallback(
    (action, updateValue) => {
      if (action === 'delete') {
        const newValue = value.filter((item) => item.id !== updateValue.id);
        wrapperSetValue({
          value: newValue,
        });
        if (updateValue.id === tempFilterConfig?.id) {
          setTempFilterConfig(null);
        }
      } else if (action === 'copy') {
        const newId = nanoid();
        const copyTarget = value.find((item) => item.id === updateValue.id);
        const copyCallbackTarget = filter.find(
          (item) => item.id === updateValue.id,
        );
        if (!copyTarget || !copyCallbackTarget) return;
        wrapperSetValue({
          value: [
            ...value,
            {
              ...copyTarget,
              id: newId,
            },
          ],
        });
        setCallbackData([...filter, { ...copyCallbackTarget, id: newId }]);
      } else {
        wrapperSetValue({
          value: value.map((item) => {
            if (item.id !== updateValue.id) return item;
            return {
              ...item,
              ...updateValue,
            };
          }),
        });
      }
    },
    [value, tempFilterConfig, filter],
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
          const newFilter = filter.map((item) => {
            if (item.id !== updateValue.id) return item;
            return {
              ...item,
              ...updateValue,
            };
          });
          setCallbackData(newFilter);
          if (action !== 'name-update')
            wrapperSetValue({
              filter: newFilter,
            });
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
      params: [],
    };
    setTempFilterConfig(newFilterConfig);
  }, [tempFilterConfig]);

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const reverseValue = value.reverse();
      const newResult = arrayMove(reverseValue, oldIndex, newIndex);
      wrapperSetValue({
        value: newResult.reverse(),
      });
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
        onChange={(value) => wrapperSetValue({ value })}
        btnDisabled={!!tempFilterConfig}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DataFilter);
