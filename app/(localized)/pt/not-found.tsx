import { NotFoundContent } from "@/components/pages/MiscPages";

const LOCALE = "pt" as const;

export default function NotFound() {
  return <NotFoundContent locale={LOCALE} />;
}
