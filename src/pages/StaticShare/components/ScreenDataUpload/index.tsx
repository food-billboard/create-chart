import { UploadOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { message } from '@/components/Message';
import { ContentLoading } from '@/components/PageLoading';
import { sleep } from '@/utils';
import { staticLeadIn } from '@/utils/Assist/LeadInAndOutput';
import staticShareIcon from '../../../../../public/other/static-share-icon.png';
import styles from './index.less';

const { Paragraph, Text } = Typography;

const ScreenDataUpload = () => {
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleUpload = useCallback(async () => {
    staticLeadIn({
      onStart: () => {
        setUploadLoading(true);
      },
      onError: () => {
        setUploadLoading(true);
      },
      onOk: async () => {
        await sleep(2000);
        const href = location.href;
        const hash = location.hash;
        let nextUrl = href;
        let nextHash = hash;
        if (href.includes('skipUpload')) {
          nextUrl = nextUrl.replace('skipUpload=0', 'skipUpload=1');
        } else {
          if (hash.includes('?')) {
            nextHash = nextHash.replace('?', '?skipUpload=1&');
            nextUrl = nextUrl.replace(hash, nextHash);
          } else {
            nextHash += '?skipUpload=1';
          }
          nextUrl = nextUrl.replace(hash, nextHash);
        }
        message.info('导入成功，即将刷新页面', 1, () => {
          window.open(nextUrl, '_self');
          window.location.reload();
        });
      },
    });
  }, []);

  return (
    <div className={styles['static-share-upload']}>
      <div className={styles['static-share-upload-content']}>
        <img
          src={staticShareIcon}
          className={classnames(styles['static-share-upload-icon'], 'm-b-8')}
        />
        <Paragraph className="ali-cen">
          来自他人分享的链接，需要一个展示该大屏的数据文件
          <br />
          默认的文件名称为
          <Text code>
            [screenName]-screen-data-[{dayjs().format('YYYY-MM-DD')}].json
          </Text>
        </Paragraph>
        <Button type="primary" icon={<UploadOutlined />} onClick={handleUpload}>
          选择文件上传
        </Button>
      </div>
      <ContentLoading loading={uploadLoading} />
    </div>
  );
};

export default ScreenDataUpload;
