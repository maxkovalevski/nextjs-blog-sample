import React, { FC } from "react";
import Image from "next/image";

export const Welcome: FC = () => {
  return (
    <section>
      <div>
        <Image
          src="/images/avatar.jpeg"
          alt="This is an avatar"
          width={200}
          height={200}
        />
      </div>
      <h1>Hi! I am Max</h1>
      <p>Hi! Sint exercitation minim velit sunt eu commodo dolore.</p>
    </section>
  );
};
