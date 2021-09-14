import React, { FC } from "react";
import { useUtterancesComments } from "../hooks";
import { icons } from "../icons";
import { UtterancesConfig } from "../hooks";
import { Icon } from "../components/Icon";

interface CommentsProps {
  utterancesConfig: UtterancesConfig;
}

export const Comments: FC<CommentsProps> = ({ utterancesConfig }) => {
  const { commentBlockRef } = useUtterancesComments({
    options: {
      ...utterancesConfig,
    },
  });

  return (
    <>
      <h3 className="monospace text-center bold">
        Comments <Icon src={icons.emojiSpeechBalloon.src} widthSize="25px" />
      </h3>
      <div ref={commentBlockRef} />
    </>
  );
};

