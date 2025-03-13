import { fetchBaseComponents, fetchPageComponents } from '@/app/lib/data';
import { DashboardButton, ViewButton } from '@/app/ui/landing-pages/buttons';
import AddComponentModal from '@/app/ui/landing-pages/edit/add-component-modal';
import EditWindow from '@/app/ui/landing-pages/edit/edit-window';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const baseComponents = await fetchBaseComponents();
  const pageComponents = await fetchPageComponents(id);

  // Get the max order index so we can add a new component to the end
  const maxOrderIndex = pageComponents.reduce((max, component) => {
    return Math.max(max, component.order_index);
  }, 0);

  const initializedPageComponents = await Promise.all(
    pageComponents.map(async (pageComponent) => {
      const { default: BaseComponent } = await import(
        `@/app/ui/base-components/${pageComponent.base_component_name}`
      );
      return <BaseComponent {...JSON.parse(pageComponent.props)} />;
    })
  );

  const initializedPageComponentForms = await Promise.all(
    pageComponents.map(async (component) => {
      const { default: FormComponent } = await import(
        `@/app/ui/base-components/forms/${component.base_component_name}`
      );
      return (
        <FormComponent
          key={component.id}
          pageComponentId={component.id}
          {...JSON.parse(component.props)}
        />
      );
    })
  );

  return (
    <>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between pb-4">
          <DashboardButton />
          <ViewButton landingPageId={id} />
        </div>
        <EditWindow
          pageComponents={initializedPageComponents}
          pageComponentForms={initializedPageComponentForms}
        />
        <AddComponentModal baseComponents={baseComponents} index={maxOrderIndex + 1} />
      </section>
    </>
  );
}
