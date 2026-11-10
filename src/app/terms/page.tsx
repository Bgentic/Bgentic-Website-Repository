import type { Metadata } from "next"
import { LegalDocument } from "@/components/legal/legal-document"
import { TERMS } from "@/content/legal"

export const metadata: Metadata = {
  title: TERMS.title,
  description: TERMS.description,
}

// /terms: the Terms of Service (content/legal.ts), set by the shared legal layout
export default function TermsPage() {
  return <LegalDocument doc={TERMS} />
}
