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
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { MdClose } from "react-icons/md";
import { useCreateImageBySliderMutation, useDeleteCarouselMutation, useDeleteImageBySliderMutation } from "@/service/carouselService";
import { ImageUploader } from "@/components/formConstructor/imageUploader/imageUploader";
import toast from "react-hot-toast";

type Props = {
  id: string;
  allImages?: { id: string, image: File | string }[];
  open: boolean;
  handleOpen: () => void;
}

export const CarouselModal = ({ id, allImages, open, handleOpen }: Props) => {
  const [createImage] = useCreateImageBySliderMutation();
  const [deleteCarousel] = useDeleteCarouselMutation();
  const [deleteImageBySlider] = useDeleteImageBySliderMutation();

  const createNewImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image)
    formData.append('slider_id', id);

    toast.promise(
      createImage(formData).unwrap(),
      {
        loading: 'Создание...',
        success: () => `Картинка успешно добавлена`,
        error: () => `Произошла ошибка`
      }
    )
  };

  const deleteImage = async (id: string) => {
    toast.promise(
      deleteImageBySlider(id).unwrap(),
      {
        loading: 'Удаление...',
        success: () => `Картинка успешно удалена`,
        error: () => `Произошла ошибка`
      }
    )
  };

  const closeModalWithCreate = () => {
    toast.success('Слайдер изменен')
    handleOpen();
  };

  const deleteCarouselFunc = () => {
    toast.promise(
      deleteCarousel(id).unwrap(),
      {
        loading: 'Удаление...',
        success: () => `Слайдер успешно удален`,
        error: () => `Произошла ошибка`
      }
    ).then(() => {
      handleOpen();
    })
  };

  return (
    <Dialog size="lg" open={open} handler={handleOpen}>
      <DialogHeader className="justify-between">
        <div>
          <Typography variant="h5" color="blue-gray">
            Добавить слайдер
          </Typography>
          <Typography color="gray" variant="paragraph">
            Выберите изображения для загрузуки
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
          <ImageUploader
            onDrop={async (acceptedFiles: any) => {
              createNewImage(acceptedFiles[0])
            }}
            files={allImages || []}
            deleteImage={(id) => {
              deleteImage(id)
            }}
          />
        </div>
      </DialogBody>
      <DialogFooter className="justify-between gap-2">
        <Tooltip className="!z-[10000]" content="Редактируйте или загрузите новое изображение" placement="top">
          <InformationCircleIcon width={24} height={24} />
        </Tooltip>
        <div className="flex items-center gap-2">
        <Tooltip className="!z-[10000]" content="Вы уверены, что хотите удалить слайдер?" placement="top">
          <Button onClick={deleteCarouselFunc} color="red" size="sm">
            Удалить
          </Button>
        </Tooltip>
        <Tooltip className="!z-[10000]" content="Сохранить слайдер" placement="top">
          <Button onClick={closeModalWithCreate} color="green" size="sm">
            Сохранить
          </Button>
        </Tooltip>
        </div>
      </DialogFooter>
    </Dialog>
  );
}