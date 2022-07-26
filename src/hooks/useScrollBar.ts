import { useEffect, useRef } from 'react';
// import PerfectScrollbar from 'perfect-scrollbar';

type PerfectScrollbar = any;

const resize = (scrollBar: PerfectScrollbar) => {
  scrollBar?.update();
};

const initScrollBar = (query: string) => {
  // const dom: HTMLElement | null = document.querySelector(query);
  // let scrollBar!: PerfectScrollbar;
  // if (dom) {
  //   scrollBar = new PerfectScrollbar(dom, {});
  //   dom.addEventListener('resize', resize.bind(null, scrollBar));
  //   return {
  //     scrollBar,
  //     dom,
  //   };
  // }
  // return {
  //   scrollBar: null,
  //   dom: null,
  // };
};

export const useScrollBar = (query: string) => {
  // const elementRef = useRef<HTMLElement>(null);
  // const scrollBarRef = useRef<PerfectScrollbar>(null);
  // useEffect(() => {
  //   const { dom, scrollBar } = initScrollBar(query);
  //   // @ts-ignore
  //   elementRef.current = dom;
  //   // @ts-ignore
  //   scrollBarRef.current = scrollBar;
  //   return () => {
  //     elementRef.current?.removeEventListener(
  //       'resize',
  //       resize.bind(null, scrollBarRef.current!),
  //     );
  //     scrollBarRef.current?.destroy();
  //   };
  // }, []);
  // // * 有些情况可能是元素是后面才渲染，一开始获取不到
  // useEffect(() => {
  //   if (!elementRef.current) {
  //     scrollBarRef.current?.destroy();
  //     const { dom, scrollBar } = initScrollBar(query);
  //     // @ts-ignore
  //     elementRef.current = dom;
  //     // @ts-ignore
  //     scrollBarRef.current = scrollBar;
  //   }
  // });
};
