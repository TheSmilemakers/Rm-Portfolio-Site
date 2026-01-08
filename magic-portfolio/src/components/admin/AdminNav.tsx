"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Column, Heading, Text, Icon, Flex } from "@once-ui-system/core";

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
}

function NavItem({ href, icon, label, active }: NavItemProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", width: "100%" }}>
      <Flex
        gap="12"
        paddingX="16"
        paddingY="12"
        radius="m"
        className="admin-nav-item"
        style={{
          backgroundColor: active ? "var(--accent-background-medium)" : "transparent",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onBackground="neutral-weak"
      >
        <Icon name={icon} size="m" onBackground={active ? "accent-strong" : "neutral-medium"} />
        <Text variant="label-default-s" onBackground={active ? "accent-strong" : "neutral-strong"}>
          {label}
        </Text>
      </Flex>
    </Link>
  );
}

export function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", icon: "grid", label: "Dashboard" },
    { href: "/admin/blog", icon: "pen", label: "Blog" },
    { href: "/admin/work", icon: "briefcase", label: "Work" },
    { href: "/admin/gallery", icon: "gallery", label: "Gallery" },
    { href: "/admin/images", icon: "image", label: "Images" },
    { href: "/admin/settings", icon: "settings", label: "Settings" },
  ];

  return (
    <Column
      fillHeight
      paddingY="l"
      paddingX="m"
      gap="l"
      style={{
        width: "240px",
        borderRight: "1px solid var(--neutral-border-weak)",
        position: "sticky",
        top: 0,
      }}
      background="neutral-weak"
    >
      {/* Header */}
      <Column gap="4" paddingX="16">
        <Heading variant="heading-strong-m" onBackground="neutral-strong">
          Admin Panel
        </Heading>
        <Text variant="label-default-s" onBackground="neutral-medium">
          Content Management
        </Text>
      </Column>

      {/* Navigation Items */}
      <Column gap="4" fillWidth>
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={pathname === item.href}
          />
        ))}
      </Column>

      {/* Exit to Site */}
      <Column gap="4" fillWidth style={{ marginTop: "auto" }}>
        <Link href="/" style={{ textDecoration: "none", width: "100%" }}>
          <Flex
            gap="12"
            paddingX="16"
            paddingY="12"
            radius="m"
            className="admin-nav-item"
            style={{
              backgroundColor: "transparent",
              cursor: "pointer",
              transition: "background-color 0.2s",
              borderTop: "1px solid var(--neutral-border-weak)",
            }}
          >
            <Icon name="arrowLeft" size="m" onBackground="neutral-medium" />
            <Text variant="label-default-s" onBackground="neutral-strong">
              Exit to Site
            </Text>
          </Flex>
        </Link>
      </Column>
    </Column>
  );
}
