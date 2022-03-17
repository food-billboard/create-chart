import { useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import FetchScreenComponent from '@/components/FetchScreenComponent';
import { NormalPainter } from '../Designer/components/Panel/components/Painter';
import PasswordConfirm, {
  PasswordConfirmRef,
} from './components/PasswordConfirm';
import { mapStateToProps, mapDispatchToProps } from './connect';
import styles from './index.less';

function Share(props: {
  setScreenType: (value: ComponentData.ScreenType) => void;
}) {
  const { setScreenType } = props;

  const [needFetch, setNeedFetch] = useState<boolean>(false);

  const passwordConfirmRef = useRef<PasswordConfirmRef>(null);

  useEffect(() => {
    setScreenType('preview');
  }, [setScreenType]);

  return (
    <>
      <NormalPainter className={styles['page-preview']} />
      <FetchScreenComponent needFetch={needFetch} />
      <PasswordConfirm ref={passwordConfirmRef} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Share);
