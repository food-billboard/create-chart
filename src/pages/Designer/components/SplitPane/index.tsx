import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LeftContent from '../LeftContent';
import Panel from '../Panel';
import RightContent from '../RightContent';

const SplitPane = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <LeftContent />
        <Panel />
      </DndProvider>
      <RightContent />
    </>
  );
};

export default SplitPane;
