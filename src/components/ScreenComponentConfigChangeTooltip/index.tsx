import {
  ReactNode,
  useCallback,
  useMemo,
  useState,
  CSSProperties,
} from 'react';
import { Pagination, Button } from 'antd';
import { connect } from 'dva';
import { findLast } from 'lodash';
import { InfoCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { versionCompare } from '@/utils';
import IconTooltip from '../IconTooltip';
import type { Props as IconTooltipProps } from '../IconTooltip';
import allConfigVersionMap from './Constants';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

type Props = {
  id: string;
  setVersionChangeTooltip: (
    value: SuperPartial<ComponentData.VersionChangeTooltip>,
  ) => void;
  versionChangeTooltip: ComponentData.VersionChangeTooltip;
  children?: ReactNode;
} & IconTooltipProps;

const ScreenComponentConfigChangeTooltip = (props: Props) => {
  const {
    id: configId,
    versionChangeTooltip,
    setVersionChangeTooltip,
    children: anotherChildren,
    ...nextProps
  } = props;

  const [current, setCurrent] = useState(1);

  const versionTooltip = useMemo(() => {
    return Object.entries(versionChangeTooltip)
      .filter((item) => {
        return item[1][configId] && !item[1][configId].read;
      })
      .sort((a, b) => {
        return versionCompare(a[0], b[0]) ? -1 : 1;
      })
      .map((item) => {
        const [version, tooltip] = item;
        const targetVersionConfig = findLast(allConfigVersionMap, (item) => {
          return item.version == version;
        });
        return {
          version,
          ...tooltip[configId],
          tooltip: targetVersionConfig?.tooltip[configId],
        };
      });
  }, [configId, versionChangeTooltip]);

  const handleRead = useCallback((version: string) => {
    setVersionChangeTooltip({
      [version]: {
        [configId]: {
          read: true,
        },
      },
    });
  }, []);

  const children = useMemo(() => {
    const target = versionTooltip[current - 1];
    if (!target) return null;
    const { version, tooltip } = target;
    return (
      <div
        className={classnames(
          styles['screen-component-config-change-tooltip'],
          'c-f-s',
        )}
      >
        <div className="f-b">{version}</div>
        <div className="m-tb-4">{tooltip}</div>
        <div className="ali-r">
          <Button
            size="small"
            type="primary"
            onClick={handleRead.bind(null, version)}
          >
            我已知晓
          </Button>
        </div>
      </div>
    );
  }, [versionTooltip, current]);

  const onPageChange = useCallback((current) => {
    setCurrent(current);
  }, []);

  if (!versionTooltip.length && children) return <>{anotherChildren}</>;

  return (
    <IconTooltip
      {...nextProps}
      title={
        <div className={styles['screen-component-config-change-tooltip']}>
          {children}
          <Pagination
            size="small"
            current={current}
            total={versionTooltip.length}
            hideOnSinglePage
            pageSize={1}
            simple
            onChange={onPageChange}
            className="m-t-4"
          />
        </div>
      }
      iconStyle={{
        visibility: versionTooltip.length ? 'visible' : 'hidden',
      }}
    >
      <InfoCircleOutlined />
    </IconTooltip>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenComponentConfigChangeTooltip);

// 去除老版本全部已经阅读过的tooltip
// 手动控制tooltip的显示隐藏(先隐藏再删除)顺带控制一下删除时的隐藏规则
