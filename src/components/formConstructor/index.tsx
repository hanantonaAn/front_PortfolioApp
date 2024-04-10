import { IForm, IFormTagsKey, IFormType } from "@/types/form";
import { Input, Select, Typography, Option } from "@material-tailwind/react";
import { Control, Controller, FieldValues, UseFormRegister } from "react-hook-form";
import { InputByTags } from "./inputByTags";
import { Dispatch, SetStateAction } from "react";

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
    control?: Control<FieldValues>;
    tags?: IFormTagsKey;
    setTags?: Dispatch<SetStateAction<IFormTagsKey>>
}

export function FormConstructor<T extends FieldValues>({
    containerClassName, formClassName, fieldList, 
    onSubmit, register, children, errors, 
    inputClassName, formRef, control, tags, setTags
}: Props<T>) {

    type FieldRenderer<T extends FieldValues> = {
        [K in IFormType]: (item: Extract<IForm<T>, { type: K }>, index: number) => JSX.Element;
    };

    const renderMap: FieldRenderer<T> = {
        input: (item, index) => (
            <div key={index}>
                <Input
                    {...register(item.fieldName)}
                    label={item.label}
                    placeholder={item.placeholder}
                    type={item.inputType ? item.inputType : 'text'}
                    error={item.fieldName && errors && errors[item.fieldName]?.message}
                />
                {item.fieldName && errors && errors[item.fieldName] &&
                    <Typography variant="small" color="red" className="-mb-3">
                        {errors[item.fieldName]?.message}
                    </Typography>
                }
            </div>
        ),
        inputByTags: (item, index) => (
            <InputByTags
                key={index}
                control={control}
                fieldName={item.fieldName}
                placeholder={item.placeholder}
                errors={errors}
                label={item.label}
                tags={tags} 
                setTags={setTags}
            />
        ),
        select: (item, index) => (
            <div key={index}>
                <Controller
                    control={control}
                    name={item.fieldName}
                    render={({ field }) => (
                        <Select
                            label={item.label}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                        >
                            {item.options.map(item => (
                                <Option key={item.value} value={item.value}>{item.label}</Option>
                            ))}
                        </Select>
                    )}
                />
            </div>
        ),
        image: (item, index) => (
            <div key={index}>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Загрузите изображение
                </label>
                <Controller
                    control={control}
                    name={item.fieldName}
                    render={({ field: { onChange, value, ...field } }) => {
                        return (
                            <input
                                {...field}
                                onChange={(e) => {
                                    if (e.target.files)
                                        onChange(e.target.files[0])
                                }}
                                type="file"
                                id="image"
                                name="image"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        )
                    }}
                />
                {item.fieldName && errors && <p className="text-red-500 text-xs">{errors[item.fieldName]?.message}</p>}
            </div>
        ),
        title: (item, index) => (
            <Typography variant="h6" key={index}>{item.label}</Typography>
        ),
    };

    return (
        <div className={containerClassName}>
            <form ref={formRef} className={formClassName} onSubmit={onSubmit}>
                <div className={inputClassName}>
                    {fieldList.map((item, index) => {
                        switch (item.type) {
                            case 'input':
                                return renderMap.input(item, index)
                            case 'image':
                                return renderMap.image(item, index)
                            case 'select':
                                return renderMap.select(item, index)
                            case 'title':
                                return renderMap.title(item, index)
                            case 'inputByTags':
                                return renderMap.inputByTags(item, index)
                        }
                    })}
                </div>
                {children}
            </form>
        </div>
    );
}