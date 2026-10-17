import type { Metadata } from "next"
import { isAdmin } from "@/lib/prospects/auth"
import { AdminLogin } from "@/components/prospects/admin-login"
import { ProspectList } from "@/components/prospects/prospect-list"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Prospects · admin", robots: { index: false, follow: false } }

export default async function AdminProspectsPage() {
  if (!(await isAdmin())) return <AdminLogin />
  return <ProspectList />
}
