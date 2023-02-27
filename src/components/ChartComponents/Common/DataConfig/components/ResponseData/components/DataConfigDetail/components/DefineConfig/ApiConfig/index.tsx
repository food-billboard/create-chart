import { useCallback } from 'react';
import { Select } from 'antd';
import { merge } from 'lodash';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useMobxContext } from '@/hooks';
import IconTooltipBase from '@/components/IconTooltip';
import Checkbox from '@/components/ChartComponents/Common/Checkbox';
import FilterDataUtil from '@/utils/Assist/FilterData';
import GlobalConfig from '@/utils/Assist/GlobalConfig';
import CodeEditor from '../SaveCodeEditor';
import SubTitle, { SubForm } from '../../SubTitle';
import { TOnChange } from '../type';

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
};

const ApiConfig = (props: ApiConfigProps) => {
  const { onChange, value } = props;
  const {
    request: { method, url, headers, body, serviceRequest },
  } = value;

  const {
    global: {
      screenData: {
        config: {
          attr: { params, constants },
        },
      },
    },
  } = useMobxContext();

  const onUrlChange = useCallback(
    async (url) => {
      const result: any = await FilterDataUtil.requestData(
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
          className="w-100 c-f-s"
          popupClassName="design-config-select-dropdown"
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
              value: 'POST',
            },
            {
              value: 'GET',
            },
          ]}
        />
      </SubForm>
      <SubTitle>URL</SubTitle>
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

export default ApiConfig;
