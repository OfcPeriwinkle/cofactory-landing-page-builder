'use client';

import { Form, Input, Button } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { editPageComponent, removePageComponent } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function FooterForm({
  title = 'Enter a Title',
  subtitle = 'Enter a Subtitle',
  pageComponentId,
}: {
  title: string;
  subtitle: string;
  pageComponentId: string;
}) {
  const pathname = usePathname();
  const pageId = pathname.split('/')[2];
  const updatePageComponentWithIds = editPageComponent.bind(null, pageId, pageComponentId);

  const [state, formAction] = useActionState(updatePageComponentWithIds, {
    message: '',
    error: {},
  });

  const removePageComponentWithIds = removePageComponent.bind(null, pageId, pageComponentId);

  return (
    <>
      <Form className="w-full justify-center items-center space-y-4" action={formAction}>
        <div className="flex flex-col gap-4 w-full p-4">
          <Input label="Title" labelPlacement="outside" name="title" placeholder={title} />
          <Input label="Subtitle" labelPlacement="outside" name="subtitle" placeholder={subtitle} />
          <div className="flex gap-4">
            <Button color="danger" onPress={removePageComponentWithIds}>
              Delete
            </Button>
            <Button className="w-full" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
