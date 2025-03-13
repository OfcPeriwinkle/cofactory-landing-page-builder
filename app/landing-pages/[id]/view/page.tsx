import { fetchPageComponents } from '@/app/lib/data';
import { DashboardButton, EditButton } from '@/app/ui/landing-pages/buttons';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const components = await fetchPageComponents(id);

  const initializedPageComponents = await Promise.all(
    components.map(async (component) => {
      const { default: BaseComponent } = await import(
        `@/app/ui/base-components/${component.base_component_name}`
      );
      return <BaseComponent key={component.id} {...JSON.parse(component.props)} />;
    })
  );

  return (
    <>
      <div className="flex justify-between pb-4">
        <DashboardButton />
        <EditButton landingPageId={id} />
      </div>
      {initializedPageComponents}
    </>
  );
}
