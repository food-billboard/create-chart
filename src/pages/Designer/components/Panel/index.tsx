import { useState } from 'react';
import PanelWrapper from './components/PanelWrapper';
import ToolBar from './components/ToolBar';
import Painter from './components/Painter';

import TestComponent from '@/components/ColorGradientSelect';

const Panel = () => {
  const [scale, setScale] = useState<number>(1);

  return (
    <div className="dis-flex-column">
      <PanelWrapper scale={scale}>
        <Painter />
      </PanelWrapper>
      <ToolBar />
    </div>
  );
};

export default Panel;
