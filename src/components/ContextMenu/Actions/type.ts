export interface CommonActionType {
  value: ComponentData.TComponentData;
  components: ComponentData.TComponentData[];
  path: string;
  select: string[];
  clipboard: ComponentClipboard.LocalClipboardType;
  setSelect: (value: string[]) => void;
  setClipboard: (value: ComponentClipboard.LocalClipboardType) => void;
  setComponent: ComponentMethod.SetComponentMethod;
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
  onClick: () => void;
  actionFrom: 'screen' | 'layer';
}
