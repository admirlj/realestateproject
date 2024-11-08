"use client";
import FileInput from "@/app/components/FileUpload";
import { UpdateUserAvatar } from "@/app/lib/actions/user";
import UploadAvatarFn from "@/app/lib/UploadAvatarFn";
import { PencilIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UploadAvatar = ({ userId }: { userId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [image, setImage] = useState<File>();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div>
      <Button onPress={onOpen} className="bg-white">
        <PencilIcon className="w-6 text-slate-400 hover:text-primary transition-colors" />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <FileInput
                  onChange={(e) => setImage((e as any).target.files[0])}
                />
                {image && (
                  <Image
                    alt={"profile image"}
                    src={URL.createObjectURL(image)}
                    width={200}
                    height={200}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  isLoading={isSubmiting}
                  color="primary"
                  onPress={async () => {
                    setIsSubmiting(true);
                    if (!image) {
                      onClose();
                      return;
                    }
                    const urlData = await UploadAvatarFn(image);
                    const result = await UpdateUserAvatar(urlData, userId);

                    router.refresh();
                    setIsSubmiting(false);
                    onClose();
                  }}
                >
                  Change Avatar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UploadAvatar;
