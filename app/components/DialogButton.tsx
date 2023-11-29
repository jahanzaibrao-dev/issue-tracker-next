import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";

interface dialogButtonProps {
  children?: any;
  title: string;
  description: string;
  buttonContent: any;
  cancelButtonText: string;
  confirmButtonText: string;
  onConfirm: CallableFunction;
}

const DialogButton = ({
  children,
  title,
  description,
  buttonContent,
  cancelButtonText,
  confirmButtonText,
  onConfirm,
}: dialogButtonProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>{buttonContent}</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>
        {children}
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              {cancelButtonText}
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={() => onConfirm()}>{confirmButtonText}</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogButton;
