import { QuillFormats, QuillModules } from '@/utils/quillModule';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import { Dispatch, SetStateAction } from 'react';
Quill.register('modules/imageResize', ImageResize);

type Props = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function TextEditor ({ value, setValue }: Props) {
    return (
        <ReactQuill
            className="max-w-full mt-2"
            formats={QuillFormats}
            modules={QuillModules}
            value={value}
            onChange={setValue}
            placeholder="Напишите свой текст здесь..."
        />
    );
}