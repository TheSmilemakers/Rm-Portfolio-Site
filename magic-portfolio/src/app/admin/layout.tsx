import { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";
import { Column, Row } from "@once-ui-system/core";

export const metadata: Metadata = {
  title: "Admin Dashboard - Magic Portfolio",
  description: "Content management system for your portfolio",
  robots: "noindex, nofollow", // Prevent search engines from indexing admin
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Row fillWidth style={{ minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <AdminNav />

      {/* Main Content Area */}
      <Column fillWidth paddingX="l" paddingY="l" gap="l" style={{ flex: 1 }}>
        {children}
      </Column>
    </Row>
  );
}
