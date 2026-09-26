import type { Metadata } from "next";
import AdminPortalPage from "@/admin/AdminPortalPage";

export const metadata: Metadata = {
  title: "Admin Portal | Dharshini Crackers Tiruvallur",
  description: "Manager dashboard for inventory management, customer order inquiries, and store profile.",
};

export default function AdminPage() {
  return <AdminPortalPage />;
}
