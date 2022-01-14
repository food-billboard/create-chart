import React, { useMemo, useCallback } from 'react';
import { Row, Col, Radio } from 'antd';
import { useControllableValue } from 'ahooks';
import classnames from 'classnames';
import { merge } from 'lodash';
import type { UploadFile } from 'antd/es/upload/interface';
import { CompatColorSelect } from '../ColorSelect';
import ImageUpload from '../ImageUpload';
import styles from './index.less';

const BackgroundSelect = (props: {
  value?: ComponentData.TBackgroundConfig;
  onChange?: (value: ComponentData.TBackgroundConfig) => void;
}) => {
  const [value, setValue] =
    useControllableValue<ComponentData.TBackgroundConfig>(props, {
      defaultValue: {
        type: 'color',
        color: {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        },
        background: '',
      },
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
      <>
        {/* 先不要这个吧 */}
        {/* <Col span={24} className='m-b-8'>
          <Input disabled value={background} className='w-100' />
        </Col> */}
        <Col span={24}>
          <ImageUpload
            defaultFileList={realValue}
            onChange={onBackgroundChange}
          />
        </Col>
      </>
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
      <Row gutter={24}>
        <Col span={7} className="line-height-2">
          背景类型
        </Col>
        <Col span={17} className="line-height-2">
          <Radio.Group value={type} onChange={onTypeChange}>
            <Radio key="image" value="image">
              图片
            </Radio>
            <Radio key="color" value="color">
              颜色
            </Radio>
          </Radio.Group>
        </Col>
        {form}
      </Row>
    </div>
  );
};

export default BackgroundSelect;
