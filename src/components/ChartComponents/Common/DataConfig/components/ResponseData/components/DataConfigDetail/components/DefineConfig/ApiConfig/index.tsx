import { useCallback } from 'react';
import { Checkbox, Select } from 'antd';
import { merge } from 'lodash';
import { connect } from 'dva';
import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltipBase from '@/components/IconTooltip';
import FilterDataUtil from '@/utils/Assist/FilterData';
import CodeEditor from '../SaveCodeEditor';
import SubTitle, { SubForm } from '../../SubTitle';
import { TOnChange } from '../type';
import { mapStateToProps, mapDispatchToProps } from './connect';

const { Option } = Select;

const IconTooltip = () => {
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
};

const ApiConfig = (props: ApiConfigProps) => {
  const { onChange, value, params, constants } = props;
  const {
    request: { method, url, headers, body, serviceRequest },
  } = value;

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
    [params, constants],
  );

  return (
    <div>
      <SubTitle>请求方式</SubTitle>
      <SubForm>
        <Select
          className="w-100 c-f-s"
          dropdownClassName="design-config-select-dropdown"
          defaultValue="POST"
          value={method}
          onChange={(value) => {
            onChange?.({
              request: {
                method: value as any,
              },
            });
          }}
        >
          <Option key="POST" value="POST">
            POST
          </Option>
          <Option key="GET" value="GET">
            GET
          </Option>
        </Select>
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
            POST 请求参数
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiConfig);
