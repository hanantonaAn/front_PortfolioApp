import { IForm, IFormType } from "@/types/form";
import { Input, Typography } from "@material-tailwind/react";
import { FieldValues, UseFormRegister } from "react-hook-form";



type Props<T extends FieldValues> = {
    containerClassName?: string;
    formClassName?: string;
    fieldList: IForm<T>[];
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    register: UseFormRegister<T>;
    children?: React.ReactNode;
    errors?: Record<string, any>;
    inputClassName?: string;
    formRef?: React.RefObject<HTMLFormElement>;
}

export function FormConstructor<T extends FieldValues>({
    containerClassName, formClassName, fieldList, onSubmit, register, children, errors, inputClassName, formRef
}: Props<T>) {

    const renderMap: Record<IFormType, (item: IForm<T>, index: number) => JSX.Element> = {
        input: (item: IForm<T>, index: number) => (
            <div key={index}>
                <Input
                    {...register(item.fieldName!)}
                    label={item.label}
                    placeholder={item.placeholder}
                    type={item.password ? 'password' : 'text'}
                    error={item.fieldName && errors && errors[item.fieldName]?.message}
                />
                {item.fieldName && errors && errors[item.fieldName] && 
                <Typography variant="small" color="red" className="-mb-3">
                    {errors[item.fieldName]?.message}
                </Typography>
                }
            </div>
        ),
        image: (item: IForm<T>, index: number) => (
            <div key={index}>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Загрузите изображение
                </label>
                <input
                    {...register(item.fieldName!)}
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {item.fieldName && errors && <p className="text-red-500 text-xs">{errors[item.fieldName]?.message}</p>}
            </div>
        ),
        title: (item: IForm<T>, index: number) => (
            <Typography key={index}>{item.label}</Typography>
        ),
    };
    return (
        <div className={containerClassName}>
            <form ref={formRef} className={formClassName} onSubmit={onSubmit}>
                <div className={inputClassName}>
                    {fieldList.map((item, index) => {
                        return renderMap[item.type](item, index)
                    })}
                </div>
                {children}
            </form>
        </div>
    );
}