import { useEffect } from 'react';
import { connect } from 'dva';
import { get } from 'lodash';
import { history } from 'umi';
import { DEFAULT_SCREEN_DATA } from '@/utils/constants';
import { getScreenDetail } from '@/services';
import { autoFitScale } from '../../pages/Designer/components/Panel/components/ToolBar/components/Scale';
import { mapStateToProps, mapDispatchToProps } from './connect';

const FetchScreenComponent = (props: {
  needFetch?: boolean;
  setScale?: (scale: number) => void;
  setScreen: (value: ComponentMethod.GlobalUpdateScreenDataParams) => void;
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
}) => {
  const { setScreen, setComponentAll, needFetch = true, setScale } = props;

  const fetchData = async () => {
    const { width, height } = get(DEFAULT_SCREEN_DATA, 'config.style');
    const {
      location: { state },
    } = history;
    const { id } = (state as any) || {};

    // fetchData
    if (id) {
      try {
        const data = await getScreenDetail({
          _id: id,
        });
        const { components, ...nextData } = data;
        setScreen(nextData);
        setComponentAll(components);
      } catch (err) {}
    }

    const result = autoFitScale(width, height);
    setScale?.(result);
  };

  useEffect(() => {
    needFetch && fetchData();
  }, [needFetch]);

  return <></>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FetchScreenComponent);
