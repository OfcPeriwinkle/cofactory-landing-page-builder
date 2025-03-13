import { fetchLandingPages } from '@/app/lib/data';
import LandingPageCard from '../ui/dashboard/landing-page-card';

export default async function Page() {
  const landingPages = await fetchLandingPages();
  console.log(landingPages);

  return (
    <>
      <h1 className="text-4xl mb-12">Landing Pages</h1>
      <div className="flex flex-wrap gap-4">
        {landingPages.map((landingPage) => (
          <LandingPageCard key={landingPage.id} landingPage={landingPage} />
        ))}
      </div>
    </>
  );
}
