import ReactRuler, { RulerProps as BaseRulerProps } from '@scena/react-ruler';
import { Component, createRef } from 'react';
import { connect } from 'umi';
import ColorSelect from '@/components/ColorSelect';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';
import { mapDispatchToProps, mapStateToProps } from './connect';

export type RulerProps = Partial<BaseRulerProps>;

const { getRgbaString } = ColorSelect;

type Props = RulerProps & {
  theme: ComponentData.TScreenTheme;
};

class Ruler extends Component<Props> {
  rulerRef = createRef<any>();

  resize = () => {
    this.rulerRef.current?.resize();
  };

  componentDidUpdate = (prevProps: Props) => {
    if (
      this.props.height !== prevProps.height ||
      this.props.width !== prevProps.width
    ) {
      this.resize();
    }
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.resize);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resize);
  };

  render() {
    return (
      <>
        <ReactRuler
          lineColor={'rgb(255, 255, 255)'}
          textColor={'rgb(255, 255, 255)'}
          type="vertical"
          backgroundColor={DEFAULT_THEME_COLOR}
          {...this.props}
          ref={this.rulerRef}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ruler) as any;
