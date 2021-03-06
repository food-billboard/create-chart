export interface CommonActionType {
  value: ComponentData.TComponentData;
  components: ComponentData.TComponentData[];
  path: string;
  select: string[];
  clipboard: string[];
  setSelect: (value: string[]) => void;
  setClipboard: (value: string[]) => void;
  setComponent: ComponentMethod.SetComponentMethod;
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
  onClick: () => void;
  actionFrom: 'screen' | 'layer';
}
