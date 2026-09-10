import { NotFoundContent } from "@/components/pages/MiscPages";

const LOCALE = "es" as const;

export default function NotFound() {
  return <NotFoundContent locale={LOCALE} />;
}
