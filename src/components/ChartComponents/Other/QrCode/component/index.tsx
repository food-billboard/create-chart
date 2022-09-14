import { CSSProperties, useMemo, useRef, useState, useEffect } from 'react';
import { merge, uniqueId } from 'lodash';
import classnames from 'classnames';
import QRCode from 'qrcode';
import {
  useComponent,
  useCondition,
} from '@/components/ChartComponents/Common/Component/hook';
import { ComponentProps } from '@/components/ChartComponents/Common/Component/type';
import FetchFragment, {
  TFetchFragmentRef,
} from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { TQrCodeConfig } from '../type';
import styles from './index.less';

const { getRgbaString } = ColorSelect;

const CHART_ID = 'QR_CODE';

const QrCode = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TQrCodeConfig>;
  global: ComponentProps['global'];
}) => {
  const [qrCode, setQrCode] = useState<string>('');

  const { className, style, value, global } = props;
  const { screenType } = global;

  const {
    id,
    config: { options },
  } = value;
  const { condition, logo, base } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));
  const requestRef = useRef<TFetchFragmentRef>(null);

  const {
    request,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TQrCodeConfig>(
    {
      component: value,
      global,
    },
    requestRef,
  );

  const {
    onCondition: propsOnCondition,
    style: conditionStyle,
    className: conditionClassName,
  } = useCondition(onCondition, screenType);

  const finalValue = useMemo(() => {
    return FilterDataUtil.getFieldMapValue(processedValue, {
      map: componentFilterMap,
    });
  }, [processedValue, componentFilterMap]);

  const logoDom = useMemo(() => {
    const { show, size, image, borderRadius, backgroundColor, border } = logo;
    if (!show || !image) return null;
    return (
      <img
        className={styles['component-other-qr-code-logo']}
        src={image}
        style={{
          borderRadius,
          border: `${border.width}px ${border.type} ${getRgbaString(
            border.color,
          )}`,
          backgroundColor: getRgbaString(backgroundColor),
          width: size.width,
          height: size.height,
        }}
      />
    );
  }, [logo]);

  const generateQrCode = async (url: string) => {
    return new Promise<string>((resolve, reject) => {
      QRCode.toDataURL(url, {}, (error, url) => {
        if (error) {
          reject(error);
        } else {
          resolve(url);
        }
      });
    })
      .then((url) => {
        setQrCode(url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const componentClassName = useMemo(() => {
    return classnames(
      className,
      'w-100 h-100',
      styles['component-other-qr-code'],
      conditionClassName,
    );
  }, [className, conditionClassName]);

  const componentStyle = useMemo(() => {
    return merge(style, conditionStyle);
  }, [style, conditionStyle]);

  useEffect(() => {
    generateQrCode(finalValue.value);
  }, [finalValue.value]);

  return (
    <>
      <div
        className={componentClassName}
        style={componentStyle}
        id={chartId.current}
      >
        <div
          className={styles['component-other-qr-code-content']}
          style={{
            backgroundColor: getRgbaString(base.backgroundColor),
          }}
        >
          <img
            src={qrCode}
            className={styles['component-other-qr-code-content-image']}
          />
          {logoDom}
        </div>
      </div>
      <FetchFragment
        id={id}
        url={requestUrl}
        ref={requestRef}
        reFetchData={request}
        reGetValue={getValue}
        reCondition={propsOnCondition}
        componentFilter={componentFilter}
        componentCondition={condition}
      />
    </>
  );
};

const WrapperQrCode: typeof QrCode & {
  id: ComponentData.TComponentSelfType;
} = QrCode as any;

WrapperQrCode.id = CHART_ID;

export default WrapperQrCode;
