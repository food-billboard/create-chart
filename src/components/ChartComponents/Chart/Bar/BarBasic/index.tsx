import { Component } from 'react';

class Test extends Component<any> {
  static id: ComponentData.TComponentSelfType = 'BAR_BASIC';

  render() {
    const { className, value } = this.props;
    const {
      config: {
        style: { left, top, width, height },
      },
    } = value;
    return (
      <h1
        className={className}
        style={{
          left,
          top,
          width,
          height,
          position: 'absolute',
        }}
      >
        hello
      </h1>
    );
  }
}

export default {
  defaultConfig: {},
  configComponent: Test,
  render: Test,
  type: Test.id,
};
