import { LandingPage } from '@/app/lib/defintions';

export default function LandingPageCard({ landingPage }: { landingPage: LandingPage }) {
  return (
    <div>
      <h2>{landingPage.title}</h2>
      <p>{landingPage.description}</p>
    </div>
  );
}
