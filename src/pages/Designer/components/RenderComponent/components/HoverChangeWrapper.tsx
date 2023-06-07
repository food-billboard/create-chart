import { useTransition } from 'react';
import { useHover } from 'ahooks';
import { useComponentHover } from '@/hooks';

const HoverChangeWrapper = (props: { id: string }) => {
  const { id } = props;

  const [, transitionFn] = useTransition();

  const [, setHover] = useComponentHover();

  useHover(() => document.querySelector(`[data-id="${id}"]`), {
    onChange: (state) => {
      transitionFn(() => {
        if (state) {
          setHover(id);
        } else {
          setHover('');
        }
      });
    },
  });

  return <></>;
};

export default HoverChangeWrapper;
