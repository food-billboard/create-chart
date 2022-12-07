import { useEffect, useRef } from 'react';
import { SVG } from '@svgdotjs/svg.js';
import { useSize } from 'ahooks';

const AnimationSvg = (props: { value: any; id: string; delay?: number }) => {
  const { value, id, delay } = props;

  const elementRef = useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useSize(elementRef) || {};

  const getAlllElements = () => {
    function getListInner(list: any[]) {
      return list.reduce<any>((acc, cur) => {
        if (['circle', 'rect', 'path', 'polygon'].includes(cur.type)) {
          acc.push(cur);
        } else {
          try {
            acc.push(...getListInner(cur.children()));
          } catch (err) {}
        }
        return acc;
      }, []);
    }
    const list = SVG(`#${id}`).children();
    return getListInner(list);
  };

  useEffect(() => {
    const size = Math.min(width, height);
    SVG(`#${id}`).size(size, size);
  }, [width, height]);

  useEffect(() => {
    SVG(`#${id}`).animate;
    getAlllElements().forEach((item: any, index: number) => {
      const originFill = item.fill();
      item.attr({ fill: 'transparent' });
      item
        .animate({
          duration: 100,
          delay: 80 * index + (delay || 0),
          when: 'now',
          swing: true,
          times: 1,
          wait: 0,
        })
        .attr({ fill: originFill })
        .ease('<>');
    });
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ alignItems: 'center', justifyContent: 'center' }}
      className="w-100 h-100 dis-flex"
    >
      {value}
    </div>
  );
};

export default AnimationSvg;
