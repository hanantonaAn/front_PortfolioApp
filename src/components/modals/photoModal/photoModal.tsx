import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { MdClose } from "react-icons/md";
import { useCreatePhotoMutation } from "@/service/photoService";
import toast from "react-hot-toast";

type Props = {
    id?: string;
    open: boolean;
    handleOpen: () => void;
}

export const PhotoModal = ({ id, open, handleOpen }: Props) => {
    
    const [photo, setPhoto] = useState<File | null>(null);

    const [createPhoto] = useCreatePhotoMutation();

    useEffect(() => {
        setPhoto(null)
    }, [open])

    const createNewPhoto = async () => {
        const formData = new FormData();
        photo && formData.append('picture', photo);
        formData.append('coordinate_x', '1.0');
        formData.append('coordinate_y', '1.0');
        formData.append('coordinate_z', '2147483647');
        formData.append('height', '2147483647');
        formData.append('width', '2147483647');
        id && formData.append('portfolio_id', id);

        toast.promise(
            createPhoto(formData).unwrap(),
            {
                loading: 'Новая фотография загружается',
                success: () => `Фотография успешно добавлена`,
                error: () => `Произошла ошибка`
            }
        ).then(() => {
            handleOpen()
        })
    };

    return (
        <>
      <Button onClick={handleOpen}>Connect Wallet</Button>

        <Dialog size="lg" open={open} handler={handleOpen}>
            <DialogHeader className="justify-between">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Добавить фото
                    </Typography>
                    <Typography color="gray" variant="paragraph">
                        Выберите изображение для загрузуки
                    </Typography>
                </div>
                <IconButton
                    color="blue-gray"
                    size="sm"
                    variant="text"
                    onClick={handleOpen}
                >
                    <MdClose size={28} />
                </IconButton>
            </DialogHeader>
            <DialogBody className="!px-5">
                <div className="mb-6">
                    <input
                        onChange={(e) => {
                            if (e.target.files)
                                setPhoto(e.target.files[0])
                        }}
                        type="file"
                        id="image"
                        name="image"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </DialogBody>
            <DialogFooter className="justify-between gap-2">
                <Tooltip className="!z-[10000]" content="Редактируйте или загрузите новое изображение" placement="top">
                    <InformationCircleIcon width={24} height={24} />
                </Tooltip>
                <Button onClick={createNewPhoto} color="green" size="sm">
                    Сохранить
                </Button>
            </DialogFooter>
        </Dialog>
        </>
    );
}