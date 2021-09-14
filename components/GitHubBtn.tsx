import React, { AnchorHTMLAttributes, DetailedHTMLProps, FC, useEffect, useRef } from 'react';

export const GitHubBtn: FC<
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement>
  > = (props) => {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const paint = () => {
    if (!window) {
      return;
    }

    const spanEl = spanRef.current?.appendChild(document.createElement('span'));

    if (spanRef.current !== null && linkRef.current !== null) {
      const linkEl = spanEl?.appendChild(linkRef.current);

      if (linkEl) {
        import('github-buttons').then(({ render }) => {
          render(linkEl, (el) => {
            try {
              spanEl?.parentNode?.replaceChild(el, spanEl);
            } catch (_) {}
          });
        });
      }
    }
  }

  const reset = () => {
    if (linkRef?.current === null || spanRef?.current === null || spanRef?.current.lastChild === null) {
      return;
    }

    spanRef?.current?.replaceChild(linkRef?.current, spanRef?.current.lastChild);
  }

  useEffect(() => {
    paint();

    return () => {
      reset();
    }
  }, []);

  return <span ref={spanRef}>
    <a {...props} ref={linkRef}>{props.children}</a>
  </span>
}


