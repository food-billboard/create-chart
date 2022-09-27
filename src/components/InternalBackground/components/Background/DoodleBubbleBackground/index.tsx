import {} from 'react';
import './index.less';

const DoodleBubbleBackground = () => {
  return (
    <div className={'internal-background-doodle-hex-background'}>
      <css-doodle
        grid="12"
        class={'internal-background-doodle-hex-background-main'}
      >{`
        :doodle {
          @grid: 12 / 100vmax;
          background: #0a0c27;
          filter: blur(.1px);
          transform: scale(1.1)
        }
        
        @random {
          border: 3px solid hsla(158, 70%, 68%, @rand(0.3));
        }
        
        @random {
           filter: blur(1.5px);
        }
        
        @random {
          animation: move 5s linear alternate infinite;
        }
        
        @random(0.1) {
          animation: flicker 5s ease infinite;
        }
        
        @keyframes move {		
          0% {
            transform:	translate(
            @rand(-50%, 50%), @rand(-50%, 50%)
            );
          }
        
          100% {
            transform:	translate(
            @rand(-50%, 50%), @rand(-50%, 50%)
            );
          }
        }
        
        @keyframes flicker {
          0% {
            opacity: 1;
          }
        
          50% {
            opacity: 0;
          }
        
          100% {
            opacity: 1;
          }
        }
        
        border-radius: 50%;
        background: hsla(158, 70%, 68%, @rand(0.6));
        transform: scale(@rand(.5, 1.2))
        translate(
        @rand(-50%, 50%), @rand(-50%, 50%)
        );
      `}</css-doodle>
    </div>
  );
};

export default DoodleBubbleBackground;
