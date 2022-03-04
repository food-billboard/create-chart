import { InfoCircleOutlined } from '@ant-design/icons';
import IconTooltip from '@/components/IconTooltip';
import { ECHARTS_URL } from '@/utils/constants';
import ConfigList from '../Structure/ConfigList';
import Input from '../Input';
import FullForm from '../Structure/FullForm';

const { Item } = ConfigList;

const FormatterSelect = (props: {
  value?: string;
  onChange?: (value: any) => void;
}) => {
  return (
    <Item
      label="内容格式"
      placeholder={
        <IconTooltip
          title={
            <div>
              内容格式的语法可以参照
              <a target="_blank" href={ECHARTS_URL}>
                echarts
              </a>
              官网
            </div>
          }
        >
          <InfoCircleOutlined />
        </IconTooltip>
      }
    >
      <FullForm>
        <Input {...props} />
      </FullForm>
    </Item>
  );
};

export default FormatterSelect;
