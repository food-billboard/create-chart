import React, { useMemo, useCallback } from 'react';
import { Row, Col, Radio } from 'antd';
import { useControllableValue } from 'ahooks';
import classnames from 'classnames';
import { merge } from 'lodash';
import type { UploadFile } from 'antd/es/upload/interface';
import { CompatColorSelect } from '../ColorSelect';
import ImageUpload from '../ImageUpload';
import { DEFAULT_BACKGROUND_CONFIG } from '@/utils/constants';
import styles from './index.less';

const BackgroundSelect = (props: {
  value?: ComponentData.TBackgroundConfig;
  onChange?: (value: ComponentData.TBackgroundConfig) => void;
}) => {
  const [value, setValue] =
    useControllableValue<ComponentData.TBackgroundConfig>(props, {
      defaultValue: DEFAULT_BACKGROUND_CONFIG,
    });

  const { color, background, type } = value;

  const onColorChange = useCallback(
    (color) => {
      setValue(
        merge({}, value, {
          color,
        }),
      );
    },
    [value],
  );

  const onBackgroundChange: any = useCallback(
    (fileList: UploadFile<any>[]) => {
      const [target] = fileList;
      if (!target) {
        setValue(
          merge({}, value, {
            background: '',
          }),
        );
      } else {
        setValue(
          merge({}, value, {
            background: target.status === 'done' ? target.url : target,
          }),
        );
      }
    },
    [value],
  );

  const backgroundForm = useMemo(() => {
    const realValue: any =
      typeof background === 'string' && !!background
        ? [{ url: background, uid: '-1', name: 'background', status: 'done' }]
        : [];
    return (
      <Col span={24}>
        <ImageUpload
          defaultFileList={realValue}
          onChange={onBackgroundChange}
        />
      </Col>
    );
  }, [background, onBackgroundChange]);

  const colorForm = useMemo(() => {
    return <CompatColorSelect value={color} onChange={onColorChange} />;
  }, [color, onColorChange]);

  const form = useMemo(() => {
    if (type === 'color') return colorForm;
    return backgroundForm;
  }, [type, backgroundForm, colorForm]);

  const onTypeChange = useCallback(
    (e) => {
      setValue(
        merge({}, value, {
          type: e.target.value,
        }),
      );
    },
    [value],
  );

  return (
    <div className={classnames(styles['component-background-select'])}>
      <Radio.Group value={type} onChange={onTypeChange}>
        <Radio key="image" value="image">
          图片
        </Radio>
        <Radio key="color" value="color">
          颜色
        </Radio>
      </Radio.Group>
      {form}
    </div>
  );
};

export default BackgroundSelect;
