import { useCallback, useRef, useState, useMemo } from 'react';
import Clipboard from 'clipboard';
import { uniqueId } from 'lodash';
import { CopyOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { sleep } from '@/utils';
import IconTooltip from '../IconTooltip';

const ClipboardAction = (props: { value: string }) => {
  const { value } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);
  const iconId = useRef<string>(uniqueId('code-editor-copy'));

  const handleCopy = useCallback(
    (event) => {
      let clipboard = new Clipboard(`#${iconId.current}`, {
        text: () => value,
      });

      clipboard.on('success', () => {
        clipboard.destroy();
        setSuccess(true);
        setLoading(true);
        sleep(2000).then((_) => {
          setLoading(false);
        });
      });
      clipboard.on('error', (e) => {
        clipboard.destroy();
        setSuccess(false);
        setLoading(true);
        sleep(2000).then((_) => {
          setLoading(false);
        });
      });

      // @ts-ignore
      clipboard.onClick(event);
    },
    [value],
  );

  const Icon = useMemo(() => {
    if (!loading)
      return <CopyOutlined onClick={handleCopy} id={iconId.current} />;
    if (success) {
      return <CheckOutlined />;
    }
    return <CloseOutlined />;
  }, [success, loading, handleCopy]);

  return <IconTooltip title="复制">{Icon}</IconTooltip>;
};

export default ClipboardAction;
