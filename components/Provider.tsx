"use client";
import React, { FC, ReactElement } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
interface Props {
  children: ReactElement;
  session: Session;
}
const Provider: FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}> {children}</SessionProvider>;
};

export default Provider;
