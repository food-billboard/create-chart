import { useDeepCompareEffect } from 'ahooks';
import classnames from 'classnames';
import { uniqueId } from 'lodash';
import QRCode from 'qrcode';
import type { QRCodeRenderersOptions } from 'qrcode';
import { useMemo, useRef, useState } from 'react';
import {
  useComponent,
  useCondition,
  ConditionComponent,
} from '@/components/ChartComponents/Common/Component/hook';
import { DEFAULT_BORDER_RADIUS } from '@/components/ChartComponents/Common/Constants/defaultConfig';
import FetchFragment from '@/components/ChartComponents/Common/FetchFragment';
import ColorSelect from '@/components/ColorSelect';
import FilterDataUtil from '@/utils/Assist/FilterData';
import { CHART_ID } from '../id';
import { TQrCodeConfig } from '../type';
import styles from './index.less';

const { getRgbaString, getHexString } = ColorSelect;

const QrCode = (props: ComponentData.CommonComponentProps<TQrCodeConfig>) => {
  const [qrCode, setQrCode] = useState<string>('');

  const { className, style, value, global, children, wrapper: Wrapper } = props;
  const { screenType } = global;

  const {
    id,
    config: {
      options,
      style: { border },
    },
  } = value;
  const { condition, logo, base } = options;

  const chartId = useRef<string>(uniqueId(CHART_ID));

  const {
    request,
    linkageMethod,
    getValue,
    requestUrl,
    componentFilter,
    value: processedValue = [],
    componentFilterMap,
    onCondition,
  } = useComponent<TQrCodeConfig>({
    component: value,
    global,
  });

  const { onCondition: propsOnCondition } = useCondition({
    onCondition,
    screenType,
    componentId: id,
  });

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
    );
  }, [className]);

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
      <ConditionComponent
        componentId={id}
        className={componentClassName}
        style={style}
        id={chartId.current}
        onClick={onClick}
      >
        <Wrapper border={border}>
          {children}
          <div
            className={styles['component-other-qr-code-content']}
            style={{
              backgroundColor: getRgbaString(base.backgroundColor),
              borderRadius: DEFAULT_BORDER_RADIUS,
              overflow: 'hidden',
            }}
          >
            <img
              src={qrCode}
              className={styles['component-other-qr-code-content-image']}
            />
            {logoDom}
          </div>
        </Wrapper>
      </ConditionComponent>
      <FetchFragment
        id={id}
        url={requestUrl}
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
