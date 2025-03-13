'use client';

import { Modal, ModalContent, Button, useDisclosure } from '@heroui/react';

export default function EditComponentModal({
  pageComponentForm,
}: {
  pageComponentForm: React.ReactElement;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex justify-center">
        <Button color="primary" onPress={onOpen}>
          Edit Component
        </Button>
      </div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>{(onClose) => <>{pageComponentForm}</>}</ModalContent>
      </Modal>
    </>
  );
}
