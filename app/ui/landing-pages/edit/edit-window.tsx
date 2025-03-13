import EditComponentModal from '@/app/ui/landing-pages/edit/edit-component-modal';

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
            <div className="w-3/4 ">{component}</div>
            <div className="flex justify-center items-center w-1/4 ">
              <EditComponentModal pageComponentForm={pageComponentForms[index]} />
            </div>
          </div>
        );
      })}
    </>
  );
}
