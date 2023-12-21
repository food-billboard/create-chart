import classNames from 'classnames';
import { pick } from 'lodash';
import { useMemo, Fragment } from 'react';
import { connect } from 'umi';
import BorderMap from '../Border';
import styles from '../Border/index.less';
import { CommonBorderProps } from '../Border/type';
import { mapDispatchToProps, mapStateToProps } from './connect';

export const getTargetBorder = (
  border: ComponentData.TComponentData['config']['style']['border'],
) => {
  if (!border.show) return null;
  return (BorderMap as any)[border.value]?.value || null;
};

const _InternalBorderWrapper = (
  props: CommonBorderProps & {
    border: ComponentData.TComponentData['config']['style']['border'];
    wrapper?: any;
  },
) => {
  const {
    children,
    border = { show: false },
    wrapper: Wrapper = Fragment,
    ...nextProps
  } = props;

  const Dom = useMemo(() => {
    return getTargetBorder(
      border as ComponentData.TComponentData['config']['style']['border'],
    );
  }, [border]);

  return (
    <Wrapper>
      {Dom && <Dom {...nextProps}></Dom>}
      <div
        className={classNames(styles['internal-border-outer'])}
        style={
          Dom?.getOuterStyle?.(pick(nextProps, ['width', 'padding'])) || {}
        }
        data-id={nextProps.id}
      >
        {children}
      </div>
    </Wrapper>
  );
};

export const InternalBorderWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_InternalBorderWrapper);
