"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
const dropdownItems = [
  {
    name: "My Profile",
    link: "/profile",
  },
  {
    name: "Create Prompt",
    link: "/create-prompt",
  },
];
const Nav = () => {
  const isUserLoggedin = true;
  const [toggleDropdown, setToggleDropDown] = useState(false);
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {isUserLoggedin ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              SignOut
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="baclk_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {isUserLoggedin ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                {dropdownItems.map(({ name, link }) => (
                  <Link
                    key={name}
                    href={link}
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    {name}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="baclk_btn"
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
