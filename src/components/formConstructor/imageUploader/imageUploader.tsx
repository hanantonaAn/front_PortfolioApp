import Image from "next/image";
import React from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { Tooltip, Typography } from "@material-tailwind/react";
import { MdClose } from "react-icons/md";
import { createSvgShimmer } from "@/utils/getBase64";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    files: File[] | string[];
    onDrop: (<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void) | undefined;
    deleteImage: (e: any) => void;
    error?: any;
}

export const ImageUploader = ({ files, onDrop, deleteImage, error }: Props) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpg', '.jpeg', '.png', '.bmp', '.gif', '.svg'],
        },
        onDrop
    });

    const thumbs = files && files.map((file, index) => (
        <div className="relative" key={index}>
            <Image placeholder="blur"
                blurDataURL={createSvgShimmer(1280, 720)} className="w-[100px] h-[100px] object-cover" width={100} height={100} alt="" src={typeof file === 'string' ? file : URL.createObjectURL(file)} />
            <Tooltip className="!z-[10000]" content="Удалить изображение" placement="top">
                <div
                    className="absolute top-0 w-6 h-6 right-0 flex items-center justify-center rounded-2xl bg-red-500 text-white cursor-pointer hover:opacity-50 transition-all duration-150"
                    onClick={() => deleteImage(index)}
                >
                    <MdClose
                        size={16}
                    />
                </div>
            </Tooltip>
        </div>
    ));

    return (
        <div className="mt-5">
            <div {...getRootProps({ className: "dropzone group w-full flex justify-center flex-col items-center h-20 border-2 border-gray rounded-2xl" })}>
                <input {...getInputProps()} />
                <Typography variant="paragraph" className="cursor-pointer text-center group-hover:opacity-50 duration-150 rounded-2xl p-1">Нажмите или перетащите изображения для загрузки</Typography>
            </div>
            {error &&
                <p className="text-xs text-red-500">{error}</p>
            }
            <div className="mt-5">
                {thumbs && thumbs.length > 0 &&
                    <>
                        <h4 className="text-textGray text-2xl">Изображения:</h4>
                        <div className="flex flex-wrap mt-2 gap-5 items-center w-full">
                            {thumbs}
                        </div>
                    </>
                }
            </div>
        </div>
    );
}