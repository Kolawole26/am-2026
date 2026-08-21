import { SectionHeading } from '@/components/common/SectionHeading';
import { DetailCard } from './DetailCard';
import { FamilyInfo } from './FamilyInfo';
import { weddingDetails } from '@/data/details';
import { wedding } from '@/data/wedding';

export function WeddingDetails() {
  return (
    <section id="the-wedding" className="bg-warm-white py-24 sm:py-32">
      <div className="container-editorial">
        <SectionHeading eyebrow="The Day" title={wedding.date} supporting="Everything you need to know to join us." />
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {weddingDetails.map((detail, i) => (
            <DetailCard key={detail.id} detail={detail} delay={i * 0.08} />
          ))}
        </div>
        <FamilyInfo />
      </div>
    </section>
  );
}
