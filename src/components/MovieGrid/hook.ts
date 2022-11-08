import React, { MutableRefObject, useEffect, useRef } from "react";
import { throttle } from 'lodash';

export default function useScrollRef() {
  const outer = useRef<HTMLDivElement>();
  const scroll = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const { offsetTop = 0 } = outer.current || {};
      const scrollTop = getScrollPosition() - offsetTop;
      scroll.current && scroll.current.scrollTo({ scrollTop } as any);
    }, 15);
    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      handleWindowScroll.cancel();
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return {
    outer,
    scroll,
    merge: (anyref: MutableRefObject<any>) => (ref: MutableRefObject<any>) => {
      anyref.current = ref;
      scroll.current = ref as any;
    },
  };
}


export const getScrollPosition = () =>
  window['pageYOffset'] ||
  document.documentElement['scrollTop'] ||
  document.body['scrollTop'] ||
  0;
