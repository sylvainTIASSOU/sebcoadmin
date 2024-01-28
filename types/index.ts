import { FormEvent, MouseEventHandler } from "react";

export interface ButtonProps {
  title: string,
  type?: "submit",
  style?: string,
  action?:  FormEvent<HTMLFormElement>
}
/**MouseEventHandler<HTMLButtonElement>| FormEvent<HTMLFormElement> */