import {} from 'react';
import { Select } from 'antd';
import CodeEditor from '../SaveCodeEditor';
import SubTitle, { SubForm } from '../../SubTitle';
import { TOnChange } from '../type.d';

const { Option } = Select;

export type ApiConfigProps = Partial<
  Pick<
    ComponentData.TComponentApiDataConfig['request'],
    'method' | 'url' | 'headers' | 'body'
  >
> & {
  onChange?: TOnChange;
};

const ApiConfig = (props: ApiConfigProps) => {
  const { method, onChange, url, headers, body } = props;

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
        <CodeEditor
          language="txt"
          value={url}
          onChange={(value) => {
            onChange?.({
              request: {
                url: value,
              },
            });
          }}
        />
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

export default ApiConfig;
