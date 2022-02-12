import { useCallback } from 'react';
import { Select } from 'antd';
import { merge } from 'lodash';
import { connect } from 'dva';
import FilterDataUtil from '@/utils/Assist/FilterData';
import CodeEditor from '../SaveCodeEditor';
import SubTitle, { SubForm } from '../../SubTitle';
import { TOnChange } from '../type.d';
import { mapStateToProps, mapDispatchToProps } from './connect';

const { Option } = Select;

export type ApiConfigProps = {
  onChange?: TOnChange;
  value: ComponentData.TComponentApiDataConfig;
  params: ComponentData.TParams[];
};

const ApiConfig = (props: ApiConfigProps) => {
  const { onChange, value, params } = props;
  const {
    request: { method, url, headers, body },
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
      );

      onChange?.({
        request: {
          url: url,
          value: result,
        },
      });
    },
    [params],
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
      <SubTitle>Headers</SubTitle>
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
          <SubTitle>POST 请求参数</SubTitle>
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiConfig);
