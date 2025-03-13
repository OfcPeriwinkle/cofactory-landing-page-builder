'use client';

import { BaseComponent, ActionState } from '@/app/lib/defintions';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Form,
} from '@heroui/react';
import ComponentSelect from './component-select';

import { usePathname } from 'next/navigation';
import { addPageComponent } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function AddComponentModal({
  baseComponents,
  index,
}: {
  baseComponents: BaseComponent[];
  index: number;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const pathname = usePathname();
  const pageId = pathname.split('/')[2];
  const addPageComponentWithIdAndIndex = addPageComponent.bind(null, pageId, index);

  const [state, formAction] = useActionState(addPageComponentWithIdAndIndex, {
    message: '',
    error: {},
  });

  return (
    <>
      <div className="flex justify-center">
        <Button color="primary" onPress={onOpen}>
          Add a Component
        </Button>
      </div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Form className="flex flex-col gap-4 justify-start w-full" action={formAction}>
                <ModalHeader className="flex flex-col gap-1">Add a Component</ModalHeader>
                <ModalBody className="w-full">
                  <ComponentSelect baseComponents={baseComponents} />
                </ModalBody>
                <ModalFooter className="flex justify-between w-full">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Create Component
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
