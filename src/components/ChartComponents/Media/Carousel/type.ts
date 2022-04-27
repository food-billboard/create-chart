export type TCarouselConfig = {
  speed: number;
  autoplay: boolean;
  dot: {
    show: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
  };
  pauseOnHover: boolean;
  // easing: string
  fade: boolean;
  condition: ComponentData.ComponentCondition[];
};
