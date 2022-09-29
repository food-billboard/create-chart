import { CSSProperties, useMemo, useRef, useState, ReactNode } from 'react';
import { merge, uniqueId } from 'lodash';
import classnames from 'classnames';
import QRCode from 'qrcode';
import type { QRCodeRenderersOptions } from 'qrcode';
import { useDeepCompareEffect } from 'ahooks';
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

const { getRgbaString, getHexString } = ColorSelect;

const CHART_ID = 'QR_CODE';

const QrCode = (props: {
  className?: string;
  style?: CSSProperties;
  value: ComponentData.TComponentData<TQrCodeConfig>;
  global: ComponentProps['global'];
  children?: ReactNode;
}) => {
  const [qrCode, setQrCode] = useState<string>('');

  const { className, style, value, global, children } = props;
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
    linkageMethod,
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

  const onClick = () => {
    linkageMethod('click', {
      value: finalValue.value,
    });
  };

  const logoDom = useMemo(() => {
    const { show, size, image, borderRadius, border } = logo;
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
          width: size.width,
          height: size.height,
        }}
      />
    );
  }, [logo]);

  const generateQrCode = async (
    url: string,
    options: Partial<QRCodeRenderersOptions>,
  ) => {
    return new Promise<string>((resolve, reject) => {
      QRCode.toDataURL(url, options, (error, url) => {
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

  useDeepCompareEffect(() => {
    generateQrCode(finalValue.value, {
      margin: base.margin,
      color: {
        light: getHexString(base.backgroundColor),
        dark: getHexString(base.codeColor),
      },
    });
  }, [finalValue.value, base]);

  return (
    <>
      <div
        className={componentClassName}
        style={componentStyle}
        id={chartId.current}
        onClick={onClick}
      >
        {children}
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
