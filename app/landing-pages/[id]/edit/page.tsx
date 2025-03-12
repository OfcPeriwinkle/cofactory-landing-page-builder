import { fetchPageComponents } from '@/app/lib/data';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  console.log('Page components for id:', id);
  const pageComponents = await fetchPageComponents(id);
  console.log(pageComponents);
}
