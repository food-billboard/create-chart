import { useCallback } from 'react';
import { Typography } from 'antd';
import { merge } from 'lodash';
import { connect } from 'dva';
import { InfoCircleOutlined } from '@ant-design/icons';
import Select from '@/components/ChartComponents/Common/Select';
import IconTooltipBase from '@/components/IconTooltip';
import Checkbox from '@/components/ChartComponents/Common/Checkbox';
import FilterDataUtil from '@/utils/Assist/FilterData';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import { API_CONTAIN_PARAMS_LAZY_REQUEST_URL_FLAG } from '@/utils/constants/another';
import CodeEditor from '../SaveCodeEditor';
import SubTitle, { SubForm } from '../../SubTitle';
import { TOnChange } from '../type';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

export const IconTooltip = () => {
  return (
    <IconTooltipBase title="可以使用全局的变量">
      <InfoCircleOutlined className="m-r-4" />
    </IconTooltipBase>
  );
};

export type ApiConfigProps = {
  onChange?: TOnChange;
  value: ComponentData.TComponentApiDataConfig;
  params: ComponentData.TParams[];
  constants: ComponentData.TConstants[];
  componentId: string;
};

const ApiConfig = (props: ApiConfigProps) => {
  const { onChange, value, params, constants, componentId } = props;
  const {
    request: { method, url, headers, body, serviceRequest },
  } = value;

  const onUrlChange = useCallback(
    async (url) => {
      const result: any = await FilterDataUtil.requestData(
        componentId,
        merge({}, value, {
          request: {
            url,
          },
        }),
        params,
        constants,
      );

      onChange?.({
        request: {
          url: url,
          value: result,
        },
      });
    },
    [params, constants, value],
  );

  return (
    <div>
      <SubTitle>请求方式</SubTitle>
      <SubForm>
        <Select
          className="w-100"
          defaultValue="POST"
          value={method}
          onChange={(value) => {
            onChange?.({
              request: {
                method: value as any,
              },
            });
          }}
          options={[
            {
              label: 'POST',
            },
            {
              label: 'GET',
            },
          ]}
        />
      </SubForm>
      <SubTitle>
        <IconTooltipBase
          title={
            <div className="ali-l">
              可以使用全局变量
              <br />
              可在"url"最后添加特殊标识
              <Typography.Paragraph
                className={styles['api-config-copy-text']}
                italic
                copyable
              >
                {API_CONTAIN_PARAMS_LAZY_REQUEST_URL_FLAG}
              </Typography.Paragraph>
              表示不会根据"变量"的改变而请求数据。
              <br />
              比如：
              <Typography.Paragraph style={{ marginBottom: 0 }} code>
                /api/request/url?userId={'{{userId}}'}
                {API_CONTAIN_PARAMS_LAZY_REQUEST_URL_FLAG}
              </Typography.Paragraph>
            </div>
          }
        >
          <InfoCircleOutlined className="m-r-4" />
        </IconTooltipBase>
        URL
      </SubTitle>
      <SubForm>
        <CodeEditor language="txt" value={url} onChange={onUrlChange} />
      </SubForm>
      <SubTitle>
        <IconTooltip />
        Headers
      </SubTitle>
      <SubForm>
        <CodeEditor
          value={headers}
          onChange={(value) => {
            onChange?.({
              request: {
                headers: value,
              },
            });
          }}
        />
      </SubForm>
      {method === 'POST' && (
        <>
          <SubTitle>
            <IconTooltip />
            请求参数
          </SubTitle>
          <SubForm>
            <CodeEditor
              value={body}
              onChange={(value) => {
                onChange?.({
                  request: {
                    body: value,
                  },
                });
              }}
            />
          </SubForm>
        </>
      )}
      {!GlobalConfig.IS_STATIC && (
        <SubForm>
          <Checkbox
            checked={!!serviceRequest}
            onChange={(e) => {
              onChange?.({
                request: {
                  serviceRequest: e.target.checked,
                },
              });
            }}
          >
            服务端请求
          </Checkbox>
        </SubForm>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiConfig);
