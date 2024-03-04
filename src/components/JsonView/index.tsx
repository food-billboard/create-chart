import ReactJson from 'react-json-view';
import type { ReactJsonViewProps } from 'react-json-view';

const Viewer = (props: ReactJsonViewProps) => {
  return (
    <ReactJson
      theme="apathy"
      enableClipboard={true}
      onEdit={false}
      onDelete={false}
      onAdd={false}
      displayDataTypes={false}
      displayObjectSize
      indentWidth={2}
      collapseStringsAfterLength={10}
      iconStyle="circle"
      collapsed={2}
      {...props}
    />
  );
};

export default Viewer;
