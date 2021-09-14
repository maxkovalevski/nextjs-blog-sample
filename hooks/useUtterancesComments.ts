import { useEffect, useRef } from "react";

export interface UtterancesConfig {
  repo: string;
  issueTerm: string;
  label: string;
  id: string;
}

export interface UseUtterancesCommentsParams {
  options: UtterancesConfig;
}

export const useUtterancesComments = ({
  options,
}: UseUtterancesCommentsParams) => {
  const commentBlockRef = useRef<HTMLDivElement>(null);

  const setAttributes = (scriptTag: HTMLScriptElement) => {
    const { issueTerm, ...attrubutes } = options;
    const attrubutesNames = Object.keys(
      attrubutes
    ) as (keyof typeof attrubutes)[];
    attrubutesNames.forEach((key) => {
      scriptTag.setAttribute(key, options[key]);
    });
    scriptTag.setAttribute("issue-term", issueTerm);
    scriptTag.setAttribute("theme", `github-dark`);
    scriptTag.setAttribute("crossorigin", "anonymous");
    scriptTag.setAttribute("async", "");
  };

  const createScriptTag = () => {
    const scriptTag = document.createElement("script");
    scriptTag.async = true;
    scriptTag.src = "https://utteranc.es/client.js";

    setAttributes(scriptTag);

    if (commentBlockRef && commentBlockRef.current) {
      const prevCommentBlock = document.querySelector(".utterances");

      if (prevCommentBlock) {
        commentBlockRef.current?.removeChild(prevCommentBlock);
      }

      commentBlockRef.current.appendChild(scriptTag);
    } else {
      console.error(`Error: ${commentBlockRef} does not exist.`);
    }
  };

  useEffect(() => {
    createScriptTag();
  }, []);

  return {
    commentBlockRef,
  };
};

