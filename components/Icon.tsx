import React, { FC } from "react";

interface IconProps {
  src: string;
  widthSize?: string;
  indentRight?: string;
  indentLeft?: string;
}

export const Icon: FC<IconProps> = ({
  src,
  widthSize = "initial",
  indentRight,
  indentLeft,
}) => {
  return (
    <img
      src={src}
      alt=""
      style={{
        width: widthSize,
        marginRight: indentRight,
        marginLeft: indentLeft,
      }}
    />
  );
};

