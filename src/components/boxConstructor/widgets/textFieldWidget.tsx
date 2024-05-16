import { QuillTextModules, QuillTextWidgetFormats } from '@/utils/quillModule';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button, Card } from '@material-tailwind/react';
import { useGetTextFieldByIdQuery, useUpdateTextFieldByIdMutation } from '@/service/textFieldService';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import parse from 'html-react-parser';


type Props = {
    textFieldId: string;
    openEditor: boolean;
}

export default function TextFieldWidget({ textFieldId, openEditor }: Props) {

    const { data } = useGetTextFieldByIdQuery(textFieldId);

    const [updateText] = useUpdateTextFieldByIdMutation();

    const [value, setValue] = useState('');

    useEffect(() => {
        if (data) {
            setValue(data.value)
        }
    }, [data])

    const textCreateUpdate = () => {
        toast.promise(
            updateText({
                id: textFieldId,
                data: {
                    value: value
                }
            }).unwrap(),
            {
                loading: 'Обновление...',
                success: () => `Текстовое поле успешно обновлено`,
                error: () => `Произошла ошибка`
            }
        )
    };

    return (
        <div className="break-all">
            {openEditor
                ?
                <>
                    <ReactQuill
                        className="max-w-full"
                        formats={QuillTextWidgetFormats}
                        modules={QuillTextModules}
                        value={value}
                        onChange={setValue}
                        placeholder="Напишите свой текст здесь..."
                    />
                    <Button onClick={textCreateUpdate} color="light-blue" className="absolute right-2 bottom-2">Сохранить</Button>
                </>
                :
                data && data.value &&
                <Card className="mt-12 w-full p-6 ql-img">
                    {parse(data.value)}
                </Card>
}
        </div>
    );
}