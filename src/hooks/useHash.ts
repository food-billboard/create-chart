import queryString from 'query-string';
import { useEffect, useRef } from 'react';
import { isDesignerPage } from '@/utils/tool';

export const useHash = (
  onHashChange?: (hash: string, prevHash: string) => void,
) => {
  const hashData = useRef<string>(location.hash);
  const prevHashData = useRef<string>(location.hash);

  const hashChange = () => {
    const hash = location.hash;
    if (!hashData.current) {
      prevHashData.current = hash;
    } else {
      prevHashData.current = hashData.current;
    }
    hashData.current = hash;
    onHashChange?.(hashData.current, prevHashData.current);
  };

  useEffect(() => {
    window.addEventListener('hashchange', hashChange);
    return () => {
      window.removeEventListener('hashchange', hashChange);
    };
  }, []);

  return {
    hash: hashData.current,
    prevHash: prevHashData.current,
  };
};

export const isModelHash = (hash: string) => {
  return hash.includes('model-');
};

export const useIsModelHash = () => {
  const hash = useHash();
  return isModelHash(hash.hash);
};

export const useHashChangeReload = (reload: any) => {
  const isDesigner = (hash: string) => {
    return isDesignerPage(hash);
  };

  const isPreview = (hash: string) => {
    return [
      '#/preview',
      '#/model-preview',
      '#/viewer',
      '#/static-share',
      '#/share',
    ].some((item) => {
      return hash.startsWith(item);
    });
  };

  const isModel = (hash: string) => {
    return hash.startsWith('#/model');
  };

  const getId = (hash: string) => {
    const query = hash.replace(/#\/.+\?/, '');
    return queryString.parse(query).id;
  };

  useHash((hash, prevHash) => {
    const hashData = {
      isDesigner: isDesigner(hash),
      isPreview: isPreview(hash),
      isModel: isModel(hash),
      id: getId(hash),
    };
    const prevHashData = {
      isDesigner: isDesigner(prevHash),
      isPreview: isPreview(prevHash),
      isModel: isModel(prevHash),
      id: getId(prevHash),
    };

    if (
      (!prevHashData.isDesigner &&
        prevHashData.isModel &&
        hashData.isDesigner) ||
      (!prevHashData.isModel && prevHashData.isDesigner && hashData.isModel) ||
      (!prevHashData.isDesigner && hashData.isDesigner)
    ) {
      window.location.reload();
    } else if (
      hashData.id !== prevHashData.id ||
      hashData.isModel !== prevHashData.isModel ||
      hashData.isDesigner !== prevHashData.isDesigner ||
      hashData.isPreview !== prevHashData.isPreview
    ) {
      reload?.(hashData, prevHashData);
    }
  });
};
