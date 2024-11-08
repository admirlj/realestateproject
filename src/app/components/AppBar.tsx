"use client";
import { HomeModernIcon } from "@heroicons/react/16/solid";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

const AppBar = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Profile",
      href: "/user/profile",
    },
    {
      label: "Properties",
      href: "/user/properties",
    },
    {
      label: "Log Out",
      href: "#",
    },
  ];

  return (
    <Navbar className="shadow-md" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            href={"/"}
            className="flex items-center text:primary-400 hover:text-primary-600"
          >
            <HomeModernIcon className="w-8" />
            <p className="font-bold text-inherit">Ado Real Estate</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">{children}</NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ label, href }, index) => (
          <NavbarMenuItem key={`${label}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={href}
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default AppBar;
