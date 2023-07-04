import PromptChrome from '@/components/PromptChrome';

// 环境判断
const EnvironmentPrompt = (props: any) => {
  const { Component, ...nextProps } = props;
  return (
    <PromptChrome>
      <Component {...nextProps} />
    </PromptChrome>
  );
};

export default EnvironmentPrompt;
