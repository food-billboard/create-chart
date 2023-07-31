import { theme, ConfigProvider } from 'antd';
import { usePrimaryColor } from '@/hooks';

const { useToken } = theme;
const CssVarWrapper = (props: any) => {
  const { Component, ...nextProps } = props;
  const { token } = useToken();
  const { screenXS } = token;
  const primaryColor = usePrimaryColor();
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            verticalItemPadding: '16px 0px',
            titleFontSizeSM: 12,
            verticalItemMargin: '0px',
          },
        },
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: primaryColor,
          colorLink: primaryColor,
          fontSize: 12,
        },
      }}
    >
      <div
        style={{
          // @ts-ignore
          '--primary-color': primaryColor,
          '--border-color-base': '#434343',
          '--layout-header-background': '#1f1f1f',
          '--component-background': '#141414',
          '--menu-dark-highlight-color': '#fff',
          '--screen-xs': `${screenXS}px`,
        }}
      >
        <Component {...nextProps} />
      </div>
    </ConfigProvider>
  );
};
export default CssVarWrapper;
