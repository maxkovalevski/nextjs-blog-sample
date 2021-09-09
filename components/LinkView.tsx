import Link from 'next/link';
import React, { FC, ReactNode } from 'react';

interface Props {
    to: string;
    children?: ReactNode;
    className?: string;
}

export const LinkView: FC<Props> = ({ to, children, className }) => {
  return <Link href={to}><a className={className}>{children}</a></Link>;
}

