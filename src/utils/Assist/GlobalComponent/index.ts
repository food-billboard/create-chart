class GlobalComponent {
  COMPONENT_MAP: any = {};

  register = (key: string, value: any) => {
    this.COMPONENT_MAP[key] = value;
  };

  unRegister = (key: string) => {
    delete this.COMPONENT_MAP[key];
  };

  getComponent = (key: string) => {
    return this.COMPONENT_MAP[key];
  };
}

export default new GlobalComponent();
