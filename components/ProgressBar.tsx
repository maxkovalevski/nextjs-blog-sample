import React, { FC, useEffect } from 'react';
import NProgress, { NProgressOptions } from 'nprogress';
import { useRouter } from "next/router";

interface Props {
  color: string;
  startPosition: number;
  stopDelayMs: number;
  height: number;
  showOnShallow: boolean;
  options?: Partial<NProgressOptions>;
}

export const ProgressBar: FC<Props> = ({
    color = '#29D',
    startPosition = 0.3,
    stopDelayMs = 200,
    height = 3,
    showOnShallow = true,
    options,
}) => {
  let timer: NodeJS.Timeout | null = null;

  const { events } = useRouter();

  const routeChangeStart = (_: unknown, { shallow }: { shallow: boolean }) => {
    if (!shallow || showOnShallow) {
      NProgress.set(startPosition);
      NProgress.start();
    }
  };

  const routeChangeEnd = (_: unknown, { shallow }: { shallow: boolean }) => {
    if (!shallow || showOnShallow) {

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    }
  };

  useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }

    events.on('routeChangeStart', routeChangeStart);
    events.on('routeChangeComplete', routeChangeEnd);
    events.on('routeChangeError', routeChangeEnd);

    return () => {
      events.off('routeChangeStart', routeChangeStart);
      events.off('routeChangeComplete', routeChangeEnd);
      events.off('routeChangeError', routeChangeEnd);
    }
  }, []);

  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner {
        display: none;
        position: fixed;
        z-index: 1031;
        top: 15px;
        right: 15px;
      }
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: ${color};
        border-left-color: ${color};
        border-radius: 50%;
        -webkit-animation: nprogresss-spinner 400ms linear infinite;
        animation: nprogress-spinner 400ms linear infinite;
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .spinner,
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
      @-webkit-keyframes nprogress-spinner {
        0% {
          -webkit-transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
        }
      }
      @keyframes nprogress-spinner {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>);
}

