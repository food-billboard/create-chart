import { Component } from 'react';

class Test extends Component<any> {
  static id: ComponentData.TComponentSelfType = 'BAR_BASIC';

  render() {
    const { className, value, style } = this.props;
    return (
      <h1 className={className} style={style}>
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
