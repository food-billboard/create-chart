import classnames from 'classnames';
import {
  UndoIcon,
  RedoIcon,
  LayerShowIcon,
  GuideLineIcon,
  CallbackIcon,
  ConstantIcon,
  TCommonProps,
} from './action.map';
import styles from './index.less';

const ToolBar = (props: TCommonProps) => {
  const { ...nextProps } = props;

  return (
    <div
      className={classnames(
        styles['page-design-left-tool-bar'],
        'border-r-8',
        'ali-cen',
        'dis-flex-column',
        'border-1',
        'normal-background',
        'pos-sti',
      )}
    >
      <UndoIcon {...nextProps} />
      <RedoIcon {...nextProps} />
      <LayerShowIcon {...nextProps} />
      <GuideLineIcon {...nextProps} />
      <CallbackIcon {...nextProps} />
      <ConstantIcon {...nextProps} />
    </div>
  );
};

export default ToolBar;
