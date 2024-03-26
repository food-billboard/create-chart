import { useControllableValue } from 'ahooks';
import { Col, Radio } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import classnames from 'classnames';
import { merge } from 'lodash';
import { useMemo, useCallback } from 'react';
import { DEFAULT_BACKGROUND_CONFIG } from '@/utils/constants';
import ColorSelect from '../ColorSelect';
import ImageUpload from '../ImageUpload';
import { InternalBackgroundSelect } from '../InternalBackground';
import styles from './index.less';

const BackgroundSelect = (props: {
  value?: ComponentData.TBackgroundConfig;
  onChange?: (value: ComponentData.TBackgroundConfig) => void;
}) => {
  const [value, setValue] =
    useControllableValue<ComponentData.TBackgroundConfig>(props, {
      defaultValue: DEFAULT_BACKGROUND_CONFIG,
    });

  const { color, background, type, internal_background } = value;

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

  const onInternalBackgroundChange = useCallback(
    (internal_background) => {
      setValue(
        merge({}, value, {
          internal_background,
        }),
      );
    },
    [value],
  );

  const onBackgroundChange = useCallback(
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

  const internalBackgroundForm = useMemo(() => {
    return (
      <Col span={24}>
        <InternalBackgroundSelect
          value={internal_background}
          onChange={onInternalBackgroundChange}
        />
      </Col>
    );
  }, [internal_background, onInternalBackgroundChange]);

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
    return (
      <ColorSelect
        value={color}
        onChange={onColorChange}
        style={{ display: type === 'color' ? 'flex' : 'none' }}
      />
    );
  }, [color, onColorChange, type]);

  const form = useMemo(() => {
    if (type === 'image') return backgroundForm;
    if (type === 'internal_background') return internalBackgroundForm;
    return null;
  }, [type, backgroundForm, colorForm, internalBackgroundForm]);

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
        <Radio key="internal_background" value="internal_background">
          内置背景
        </Radio>
      </Radio.Group>
      {colorForm}
      {form}
    </div>
  );
};

export default BackgroundSelect;
