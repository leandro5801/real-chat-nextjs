import { ChangeEvent } from "react";

export default interface HeaderProps {
  handleInputFIlter(e: ChangeEvent<HTMLInputElement>): void;
}
