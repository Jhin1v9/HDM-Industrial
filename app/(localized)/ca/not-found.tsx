import { NotFoundContent } from "@/components/pages/MiscPages";

const LOCALE = "ca" as const;

export default function NotFound() {
  return <NotFoundContent locale={LOCALE} />;
}
