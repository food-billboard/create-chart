import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export type CodeViewProps = Partial<SyntaxHighlighterProps> & {
  children?: string;
};

const CodeView = (props: CodeViewProps) => {
  const { language = 'js', children = '', ...nextProps } = props;

  return (
    <SyntaxHighlighter
      showLineNumbers={true}
      startingLineNumber={0}
      language={language}
      style={dark}
      wrapLines={true}
      customStyle={{
        backgroundColor: 'transparent',
        borderWidth: '0.1em',
      }}
      {...nextProps}
    >
      {/* {children.replace(/^\s+|\s+$/g, '')} */}
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeView;
