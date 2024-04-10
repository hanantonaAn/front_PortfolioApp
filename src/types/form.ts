import { Path } from "react-hook-form";

export type IFormType = 'input' | 'title' | 'image' | 'select' | 'inputByTags';

export type IFormArea<T, U extends IFormType>  = {
    fieldName: Path<T>;
    type: U;
    label?: string;
    inputType?: 'password' | 'date';
    placeholder?: string;
};

export type ISelect = {
    value: string;
    label: string;
}

export type IFormSelect<T, U extends IFormType> = {
    fieldName: Path<T>;
    type: U;
    label?: string;
    options: ISelect[];
}

export type IFormTitle<U extends IFormType> = {
    type: U;
    label?: string;
}

export type IFormTagsKey = { [key: string]: string[] }

export type IForm<T> = IFormArea<T, "input"> | IFormTitle<"title"> | IFormArea<T, "image"> | IFormSelect<T, "select"> | IFormArea<T, "inputByTags">;