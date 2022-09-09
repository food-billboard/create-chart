import { useEffect } from 'react';

const Test = () => {
  const init = () => {
    const AMapFactory = (window as any).AMap;
    var map = new AMapFactory.Map('container-a', {
      zoom: 9,
      // viewMode: '3D',
      center: [120.8, 30.14],
      // mapStyle: 'amap://styles/whitesmoke',
      showLabel: false,
      showIndoorMap: false,
    });

    map.on('complete', function () {
      // 创建 AMap.LabelsLayer 图层
      var layer = new AMapFactory.LabelsLayer({
        zooms: [3, 20],
        zIndex: 2000,
        collision: false,
        center: [120.8, 30.14],
      });

      // 将图层添加到地图
      map.add(layer);

      var markers = [];
      var positions = [[120.8, 30.14]];

      var icon = {
        image: 'https://webapi.amap.com/theme/v2.0/markers/n/mark_b.png',
        size: [18, 27],
        anchor: 'bottom-center',
      };

      for (var i = 0; i < positions.length; i++) {
        var curPosition = positions[i];
        console.log(curPosition, 222);
        var curData = {
          // position: curPosition,
          position: [120.8, 30.14],
          icon,
          zIndex: 16,
        };

        var labelMarker = new AMapFactory.LabelMarker({
          // position: curPosition,
          position: [120.8, 30.14],
          icon,
          zIndex: 16,
        });

        markers.push(labelMarker);

        labelMarker.on('click', () => {
          console.log(22222222);
        });
        layer.add(labelMarker);
      }

      // 一次性将海量点添加到图层
      // layer.add(markers);
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      id="container-a"
      style={{
        width: 1300,
        height: 1300,
      }}
    ></div>
  );
};

export default Test;
