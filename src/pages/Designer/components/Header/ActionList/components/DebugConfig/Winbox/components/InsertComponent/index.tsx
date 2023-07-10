import { useState, useRef, useCallback } from 'react';
import { Button } from 'antd';
import { useUnmount, useDebounceFn } from 'ahooks';
import { connect } from 'dva';
import {
  getAllComponent,
  getComponentLength,
} from '@/components/ChartComponents';
import { createComponent } from '@/utils/Assist/Component';
import DataChangePool from '@/utils/Assist/DataChangePool';
import { COMPONENT_ONLY_TYPE_LIST } from '../../../../../../../../utils/component';
import { mapStateToProps, mapDispatchToProps } from './connect';

const IS_EMPTY = COMPONENT_ONLY_TYPE_LIST.every(
  (item) => item.disabled || item.development,
);

const InsertComponent = (props: { setSelect: (select: string[]) => void }) => {
  const { setSelect } = props;

  const [isStart, setIsStart] = useState(false);

  const timer = useRef<NodeJS.Timer>();
  const currentInsertIndex = useRef(0);
  const componentLength = useRef(getComponentLength());
  const allComponent = useRef(getAllComponent());
  const prevComponent = useRef('');

  const createNextComponent = useCallback((isInterval = false) => {
    if (
      isInterval &&
      currentInsertIndex.current + 1 >= allComponent.current.length
    ) {
      clearInterval(timer.current);
      currentInsertIndex.current = 0;
      setIsStart(false);
      return;
    }
    let nextIndex: number;
    let nextComponent;
    while (!nextComponent) {
      nextIndex = (currentInsertIndex.current + 1) % componentLength.current;
      currentInsertIndex.current++;
      const _nextComponent = allComponent.current[nextIndex];
      const { type } = _nextComponent;
      const targetComponentInfo = COMPONENT_ONLY_TYPE_LIST.find(
        (item) => item.type === type,
      );
      if (!targetComponentInfo?.disabled && !targetComponentInfo?.development) {
        nextComponent = targetComponentInfo;
      }
    }
    const { title, description, type } = nextComponent;
    const component = createComponent({
      name: title,
      description,
      componentType: type as ComponentSelfType,
      config: {
        style: {
          left: Math.floor(Math.random() * 500),
          top: Math.floor(Math.random() * 200),
        },
      },
    });

    const changeComponents: ComponentMethod.SetComponentMethodParamsData[] = [
      {
        action: 'add',
        id: component.id,
        value: component,
        path: '',
      },
    ];
    if (prevComponent.current)
      changeComponents.push({
        action: 'delete',
        id: prevComponent.current,
        value: {},
        path: '',
      });

    DataChangePool.setComponent(changeComponents);
    prevComponent.current = component.id;

    setSelect([component.id]);
  }, []);

  const handleAutoInsert = useCallback(() => {
    clearInterval(timer.current);
    const _isStart = isStart;
    setIsStart(!isStart);
    if (_isStart) {
      currentInsertIndex.current = 0;
      return;
    }
    createNextComponent(true);
    timer.current = setInterval(() => {
      createNextComponent(true);
    }, 5000);
  }, [isStart, createNextComponent]);

  const { run: handleInsert } = useDebounceFn(
    () => {
      setIsStart(false);
      clearInterval(timer.current);
      createNextComponent();
    },
    {
      wait: 500,
    },
  );

  useUnmount(() => {
    clearInterval(timer.current);
  });

  return (
    <>
      <Button
        disabled={IS_EMPTY}
        type="primary"
        className="m-r-4"
        onClick={handleAutoInsert}
      >
        {isStart && '停止'}自动添加
      </Button>
      <Button disabled={IS_EMPTY} type="primary" onClick={handleInsert}>
        手动添加
      </Button>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertComponent);
