import React from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Selection,
} from "@nextui-org/react";
import { ListboxWrapper } from "./ListBoxWrapper";
import { User } from "@/components/conversations/domain";

interface Props {
  users: User[];
}

export default function ListUserWrapper({ users }: Props) {
  const [values, setValues] = React.useState<Selection>(new Set(["1"]));

  const arrayValues = Array.from(values);

  const topContent = React.useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) =>
          value.toString() !== "1" ? (
            <Chip key={value} className="bg-myColor-400">
              {
                users
                  .find((user) => `${user.id}` === `${value}`)
                  ?.fullName.split(" ")[0]
              }
            </Chip>
          ) : (
            ""
          )
        )}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <ListboxWrapper>
      <Listbox
        topContent={topContent}
        classNames={{
          base: "max-w-full",
          list: "max-h-[150px] w-full overflow-scroll",
        }}
        defaultSelectedKeys={["1"]}
        items={users}
        label="Assigned to"
        selectionMode="multiple"
        onSelectionChange={setValues}
        variant="shadow"
      >
        {(item) => (
          <ListboxItem key={item.id} textValue={item.fullName}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={item.fullName}
                className="flex-shrink-0"
                size="sm"
                src={"/images/1486564400-account_81513 (1).png"}
              />
              <div className="flex flex-col">
                <span className="text-small">{item.fullName}</span>
                <span className="text-tiny text-default-400">
                  {item.username}
                </span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </ListboxWrapper>
  );
}
