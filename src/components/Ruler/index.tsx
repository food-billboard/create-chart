import { useEffect, useRef } from 'react';
import ReactRuler, { RulerProps } from '@scena/react-ruler';

const Ruler = (props: Partial<RulerProps>) => {
  const { ...nextProps } = props;

  const rulerRef = useRef<any>();

  const resize = () => {
    rulerRef.current?.resize();
  };

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <ReactRuler type="vertical" {...nextProps} ref={rulerRef} />;
};

export default Ruler;
