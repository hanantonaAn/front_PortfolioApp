import { Path } from "react-hook-form";

export type IFormType = 'input' | 'title' | 'image';

export type IFormArea<T, U extends IFormType>  = {
    fieldName?: U extends 'input' | 'image' ? Path<T> : never;
    type: U;
    label?: string;
    placeholder?: string;
};

export type IForm<T> = IFormArea<T, "input"> | IFormArea<T, "title"> | IFormArea<T, "image">;