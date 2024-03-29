import { StopOutlined } from '@ant-design/icons';
import RadioGroup, {
  Radio,
} from '@/components/ChartComponents/Common/IconRadio';
import Tooltip from '@/components/Tooltip';
import IconFont from '@/components/ChartComponents/Common/Icon';

export const ScaleConfig = (props: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { value, onChange } = props;

  return (
    <RadioGroup value={value} onChange={onChange}>
      {[
        {
          type: 'icon-quanping-copy',
          value: 'full',
          title: '全屏铺满',
        },
        {
          type: 'icon-fit-width-copy',
          value: 'fit-width',
          title: '等比缩放宽度铺满',
        },
        {
          type: 'icon-fit-height',
          value: 'fit-height',
          title: '等比缩放高度铺满',
        },
        {
          type: 'icon-quanping1',
          value: 'fit-height-scroll',
          title: '等比缩放高度铺满（可滚动）',
        },
        {
          type: <StopOutlined />,
          value: 'none',
          title: '不缩放',
        },
      ].map((item) => {
        const { title, type, value } = item;
        return (
          <Radio
            key={value}
            icon={
              <Tooltip title={title}>
                {typeof type === 'string' ? <IconFont type={type} /> : type}
              </Tooltip>
            }
            value={value}
          ></Radio>
        );
      })}
    </RadioGroup>
  );
};

export default ScaleConfig;
