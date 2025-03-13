'use client';

import { addLandingPage } from '@/app/lib/actions';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Form,
} from '@heroui/react';
import { useActionState } from 'react';

export default function AddLandingPageModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, formAction] = useActionState(addLandingPage, { message: '', error: {} });

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add a Page
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Form action={formAction}>
                <ModalHeader className="flex flex-col gap-1">Create a New Landing Page</ModalHeader>
                <ModalBody className="w-full">
                  <Input
                    label="Title"
                    placeholder="Enter a title for the page"
                    variant="bordered"
                    name="title"
                  />
                  <Input
                    label="Description"
                    placeholder="Enter a description for the page"
                    variant="bordered"
                    name="description"
                  />
                </ModalBody>
                <ModalFooter className="flex justify-between w-full">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Create
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
