import { ReviewsSection } from "@/features/reviews/ReviewsSection";
import { ReviewsGallery } from "@/features/reviews/ReviewsGallery";
import { ReviewsForm } from "@/features/reviews/ReviewsForm";
import { Section, SectionHeader, Container } from "@/components/ui/layout";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/domain/types";

export function ResenasPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <>
      <Section tone="paper">
        <SectionHeader
          as="h1"
          eyebrow={dict.reviews.badge}
          title={dict.reviews.title}
          lead={dict.reviews.description}
        />
        <ReviewsGallery locale={locale} dict={dict} />
      </Section>

      <Section id="escribir" tone="paper-100">
        <Container narrow>
          <ReviewsForm locale={locale} dict={dict} />
        </Container>
      </Section>
    </>
  );
}

/** Re-export for HomePage insertion. */
export { ReviewsSection };
