import { IFormTagsKey } from "@/types/form";
import { Button, Input } from "@material-tailwind/react";
import { Dispatch, SetStateAction } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";


type InputByTagsProps<T extends FieldValues> = {
    fieldName: Path<T>;
    control?: Control<FieldValues>;
    placeholder?: string;
    errors?: Record<string, any>;
    label?: string;
    tags?: IFormTagsKey;
    setTags?: Dispatch<SetStateAction<IFormTagsKey>>
}

export function InputByTags<T extends FieldValues>({
    control, fieldName, placeholder, errors, label,
    tags, setTags
}: InputByTagsProps<T>) {

    const addTag = (field: Path<T>, tag: string) => {
        if (setTags)
            setTags((prev) => ({
                ...prev || {},
                [field]: [...(prev[field] || []), tag]
            }));
    };

    const deleteTag = (field: Path<T>, tagToDelete: number) => {
        if (setTags)
            setTags((prev) => ({
                ...prev || {},
                [field]: prev[field].filter((_, index) => index !== tagToDelete)
            }));
    };

    return (
        <div>
            <Controller
                control={control}
                name={fieldName}
                render={({ field }) => (
                    <div className="relative flex">
                        <Input
                            {...field}
                            label={label}
                            placeholder={placeholder}
                            type='text'
                            error={fieldName && errors && errors[fieldName]?.message}
                        />
                        <Button
                            className="!absolute right-1 top-1 rounded"
                            size="sm"
                            onClick={() => { addTag(fieldName, field.value); field.onChange('') }}
                            color={field.value ? "gray" : "blue-gray"}
                            disabled={!field.value}
                        >
                            Добавить
                        </Button>
                    </div>
                )}
            />
            {
                tags && tags[fieldName]?.length > 0 &&
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                    {tags[fieldName].map((item, id) => {
                        return (
                            <div className="flex break-all gap-4 rounded-2xl bg-blue-500 text-white px-3 py-2" key={id}>
                                #{item}
                                <span onClick={() => deleteTag(fieldName, id)} className="text-red-500 cursor-pointer hover:text-red-500/50 transition-all duration-150">x</span>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
}