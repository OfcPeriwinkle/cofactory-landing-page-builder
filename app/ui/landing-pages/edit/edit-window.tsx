import { PageComponent } from '@/app/lib/defintions';

export default function EditWindow({
  pageComponents,
  pageComponentForms,
}: {
  pageComponents: any[];
  pageComponentForms: any[];
}) {
  return (
    <>
      {pageComponents.map((component, index) => {
        return (
          <div key={index} className="flex justify-between gap-4">
            <div className="w-3/4 bg-blue-200">{component}</div>
            <div className="flex justify-center items-center w-1/4 bg-green-200">
              {/* <ComponentEditModal componentForm={pageComponentForms[index]} /> */}
            </div>
          </div>
        );
      })}
    </>
  );
}
