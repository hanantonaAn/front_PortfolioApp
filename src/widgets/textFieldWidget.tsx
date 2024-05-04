import { QuillFormats, QuillModules } from '@/utils/quillModule';
import { Button } from '@material-tailwind/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const TextFieldWidget = () => {
    const [value, setValue] = useState('');
    return (
        <div className="break-all">
            <ReactQuill
                className="max-w-full mt-2"
                formats={QuillFormats}
                modules={QuillModules}
                value={value}
                onChange={setValue}
                placeholder="Напишите свой текст здесь..."
            />
            <Button color="light-blue" className="mt-6">Сохранить</Button>
        </div>
    );
};