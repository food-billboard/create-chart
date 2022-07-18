import { useEffect } from 'react';
import { SVG } from '@svgdotjs/svg.js';

const AnimationSvg = (props: { value: any; id: string; delay?: number }) => {
  const { value, id, delay } = props;

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
    SVG(`#${id}`).animate;
    SVG(`#${id}`).size('100%', '100%');
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

  return <div>{value}</div>;
};

export default AnimationSvg;
