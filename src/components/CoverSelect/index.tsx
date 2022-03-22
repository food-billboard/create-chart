import { useMemo, useCallback, useState } from 'react';
import { Button, message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { captureCover, captureCoverAndUpload } from '@/utils/captureCover';
import ImageUpload from '../ImageUpload';

const CoverSelect = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { value, onChange } = props;
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const fileList = useMemo(() => {
    const realValue: any =
      typeof value === 'string' && !!value
        ? [{ url: value, uid: '-1', name: 'background', status: 'done' }]
        : [];
    return realValue;
  }, [value]);

  const onBackgroundChange: any = useCallback(
    (fileList: UploadFile<any>[]) => {
      const [target] = fileList;
      if (!target) {
        onChange?.('');
      } else {
        onChange?.(target.status === 'done' ? target.url || '' : '');
      }
    },
    [value, onChange],
  );

  const handleCaptureCover = useCallback(async () => {
    setFetchLoading(true);
    try {
      const result = await captureCover('#panel-id');
      const url = await captureCoverAndUpload(result);
      onChange?.(url as string);
    } catch (err) {
      message.info('封面截图失败');
    } finally {
      setFetchLoading(false);
    }
  }, [onChange]);

  return (
    <>
      <Button
        className="m-b-4"
        block
        type="primary"
        onClick={handleCaptureCover}
        loading={fetchLoading}
      >
        截取封面
      </Button>
      <ImageUpload value={fileList} onChange={onBackgroundChange} />
    </>
  );
};

export default CoverSelect;
