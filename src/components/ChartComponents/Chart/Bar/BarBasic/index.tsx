import { Component } from 'react';

class Test extends Component {
  static id: ComponentData.TComponentSelfType = 'BAR_BASIC';

  render() {
    return <h1>hello</h1>;
  }
}

export default {
  defaultConfig: {},
  configComponent: Test,
  render: Test,
  type: Test.id,
};
