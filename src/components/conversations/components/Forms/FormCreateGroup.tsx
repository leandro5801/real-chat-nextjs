import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { User } from "../../domain";
import useLocalStorage from "@/shared/hooks/useLocalStorage";

import { ListboxWrapper } from "./components/ListBoxWrapper";
import ListUserWrapper from "./components/ListUserWrapper";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

/* return (
    <motion.div className="bg-slate-950">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-dark-900 p-4 rounded-lg shadow-md"
      >
        <UserSelect users={users} onSelect={handleUserSelect} />
        <GroupNameInput value={groupName} onChange={handleGroupNameChange} />
        <GroupImageInput value={groupImage} onChange={handleGroupImageChange} />
        <ButtonForm type="submit">Crear grupo</ButtonForm>
      </motion.form>
    </motion.div>
  );
}; */

const FormCreateGroup = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const { get } = useLocalStorage();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    const token = get("token");

    axios
      .get(`${process.env.URL_API}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);

        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupName(event.target.value);
  };

  const handleGroupImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupImage(event.target.files![0]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <Button
        variant="ghost"
        onPress={onOpen}
        className="rounded-lg w-full whitespace-nowrap  px-4 py-2 text-sm font-normal hover:border-green-600 hover:border-2 text-black hover:bg-my-gradient-modal hover:text-white focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25"
      >
        <div className="" data-twe-dropdown-item-ref>
          Create Group
        </div>
      </Button>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        //  isDismissible={true}
        isKeyboardDismissDisabled={false}
        size="md"
        placement="center"
        className=""
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="flex flex-col items-center justify-center dark">
                <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-6">
                  <ModalHeader>
                    <h1 className="text-2xl font-bold text-gray-200 mb-4">
                      Create a Chat Group
                    </h1>
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col  w-full">
                      <Input
                        type="email"
                        variant="bordered"
                        label="Name Group"
                        classNames={{
                          input: "border-green-500",
                        }}
                        className="mb-2"
                      />
                      <legend className="text-xl font-bold mb-2 text-white select-none">
                        Choose Users
                      </legend>
                      <ListUserWrapper users={users} />
                      <ModalFooter>
                        <Button
                          color="default"
                          variant="ghost"
                          onPress={onClose}
                          type="button"
                        >
                          Close
                        </Button>
                        <Button
                          color="success"
                          type="submit"
                          variant="ghost"
                          onPress={onClose}
                        >
                          Create Group
                        </Button>
                      </ModalFooter>
                    </div>
                  </ModalBody>
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormCreateGroup;
