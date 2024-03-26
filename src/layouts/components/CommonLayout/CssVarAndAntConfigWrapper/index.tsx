import { theme, ConfigProvider, App } from 'antd';
import Message from '@/components/Message';
import { DEFAULT_THEME_COLOR } from '@/utils/Assist/Theme';

const { useToken } = theme;
const CssVarWrapper = (props: any) => {
  const { Component, ...nextProps } = props;
  const { token } = useToken();
  const { screenXS } = token;
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
          colorPrimary: DEFAULT_THEME_COLOR,
          colorLink: DEFAULT_THEME_COLOR,
          fontSize: 12,
        },
      }}
    >
      <App>
        <div
          style={{
            // @ts-ignore
            '--primary-color': DEFAULT_THEME_COLOR,
            '--border-color-base': '#434343',
            '--layout-header-background': '#1f1f1f',
            '--component-background': '#141414',
            '--layout-header-background-active': '#14161a',
            '--menu-dark-highlight-color': '#fff',
            '--screen-xs': `${screenXS}px`,
          }}
        >
          <Message />
          <Component {...nextProps} />
        </div>
      </App>
    </ConfigProvider>
  );
};
export default CssVarWrapper;
