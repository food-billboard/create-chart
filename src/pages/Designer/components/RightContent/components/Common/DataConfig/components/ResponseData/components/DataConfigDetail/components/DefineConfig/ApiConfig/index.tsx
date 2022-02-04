import {} from 'react';
import { Select } from 'antd';
import CodeEditor from '@/components/CodeEditor';
import SubTitle, { SubForm } from '../../SubTitle';

const { Option } = Select;

const ApiConfig = () => {
  return (
    <div>
      <SubTitle>请求方式</SubTitle>
      <SubForm>
        <Select
          className="w-100 c-f-s"
          dropdownClassName="design-config-select-dropdown"
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
        <CodeEditor language="txt" width={454} height={138} bordered />
      </SubForm>
      <SubTitle>Headers</SubTitle>
      <SubForm>
        <CodeEditor language="json" width={454} height={138} bordered />
      </SubForm>
      {true && ( // post请求显示请求body
        <>
          <SubTitle>POST 请求参数</SubTitle>
          <SubForm>
            <CodeEditor language="json" width={454} height={138} bordered />
          </SubForm>
        </>
      )}
    </div>
  );
};

export default ApiConfig;
