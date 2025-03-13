import { fetchLandingPages } from '@/app/lib/data';

export default async function Page() {
  const landingPages = await fetchLandingPages();
  console.log(landingPages);

  return (
    <div>
      <h1>Landing Pages</h1>
      {landingPages.map((landingPage) => (
        <div key={landingPage.id}>
          <h2>{landingPage.title}</h2>
          <p>{landingPage.description}</p>
        </div>
      ))}
    </div>
  );
}
