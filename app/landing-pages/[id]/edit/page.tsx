import { fetchBaseComponents, fetchPageComponents } from '@/app/lib/data';
import AddComponentModal from '@/app/ui/landing-pages/edit/add-component-modal';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const baseComponents = await fetchBaseComponents();
  console.log('Base components:', baseComponents);

  console.log('Page components for id:', id);
  const pageComponents = await fetchPageComponents(id);
  console.log(pageComponents);

  // Get the max order index so we can add a new component to the end
  const maxOrderIndex = pageComponents.reduce((max, component) => {
    return Math.max(max, component.order_index);
  }, 0);

  const initializedPageComponents = pageComponents.map(async (pageComponent) => {
    const { default: BaseComponent } = await import(
      `@/app/ui/base-components/${pageComponent.base_component_name}`
    );
    return <BaseComponent {...JSON.parse(pageComponent.props)} />;
  });

  return (
    <>
      {initializedPageComponents}
      <AddComponentModal baseComponents={baseComponents} index={maxOrderIndex + 1} />
    </>
  );
}
