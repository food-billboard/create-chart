import { createRef, Component } from 'react';
import ReactRuler, { RulerProps as BaseRulerProps } from '@scena/react-ruler';

export type RulerProps = Partial<BaseRulerProps>;

class Ruler extends Component<RulerProps> {
  rulerRef = createRef<any>();

  resize = () => {
    this.rulerRef.current?.resize();
  };

  componentDidMount = () => {
    window.addEventListener('resize', this.resize);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resize);
  };

  render() {
    return <ReactRuler type="vertical" {...this.props} ref={this.rulerRef} />;
  }
}

export default Ruler;
