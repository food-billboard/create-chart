export interface CommonActionType {
  value: ComponentData.TComponentData;
  components: ComponentData.TComponentData[];
  path: string;
  select: string[];
  setSelect: (value: string[]) => void;
  setComponent: ComponentMethod.SetComponentMethod;
  setComponentAll: (value: ComponentData.TComponentData[]) => void;
  onClick: () => void;
}
