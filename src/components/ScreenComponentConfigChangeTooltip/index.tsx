import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Pagination, Button } from 'antd';
import { connect } from 'dva';
import { findLast } from 'lodash';
import { InfoCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { versionCompare } from '@/utils';
import { useAnyDva } from '@/hooks';
import IconTooltip from '../IconTooltip';
import type { Props as IconTooltipProps } from '../IconTooltip';
import allConfigVersionMap from './Constants';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

type Props = {
  id: string;
  setVersionChangeTooltip: (value: ComponentData.VersionChangeTooltip) => void;
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
  const [open, setOpen] = useState(false);

  const { getState } = useAnyDva();

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

  const onOpenChange = useCallback((open) => {
    setOpen(open);
  }, []);

  const isAllRead = (version: ComponentData.VersionChangeTooltipItem) => {
    return Object.values(version).every((item) => item.read);
  };

  const handleRead = useCallback((version: string) => {
    setOpen(false);
    // ? 直接关闭会出现tooltip空白的情况
    setTimeout(() => {
      const versionChangeTooltip =
        getState().global.screenData.extra.versionChangeTooltip;
      versionChangeTooltip[version][configId].read = true;
      const currentVersion = versionChangeTooltip[version];
      // 全部已读且前面没有版本，就把当前的tooltip剔除
      if (isAllRead(currentVersion)) {
        const currentVersionPrev = Object.keys(versionChangeTooltip).filter(
          (item) => versionCompare(version, item),
        );
        // 前面版本都是已读
        if (
          currentVersionPrev.every((version) =>
            isAllRead(versionChangeTooltip[version]),
          )
        ) {
          delete versionChangeTooltip[version];
        }
      }

      setVersionChangeTooltip({ ...versionChangeTooltip });
    }, 300);
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
      open={open}
      onOpenChange={onOpenChange}
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
        pointerEvents: versionTooltip.length ? 'all' : 'none',
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
