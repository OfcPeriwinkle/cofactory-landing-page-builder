import { fetchLandingPages } from '@/app/lib/data';
import LandingPageCard from '../ui/dashboard/landing-page-card';

export default async function Page() {
  const landingPages = await fetchLandingPages();
  console.log(landingPages);

  return (
    <div>
      <h1>Landing Pages</h1>
      {landingPages.map((landingPage) => (
        <LandingPageCard key={landingPage.id} landingPage={landingPage} />
      ))}
    </div>
  );
}
