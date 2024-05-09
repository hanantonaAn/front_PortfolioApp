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
import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { MdClose } from "react-icons/md";
import { useCreateCarouselMutation, useGetSliderByIdQuery } from "@/service/carouselService";
import { ImageUploader } from "@/components/formConstructor/imageUploader/imageUploader";

type Props = {
  id?: string;
}

export const CarouselModal = ({ id }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((cur) => !cur);

  const [images, setImages] = useState<any[]>([]);

  const [createSlider] = useCreateCarouselMutation();

  const createNewSlider = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('pictures', image)
    })
    formData.append('coordinate_x', '0')
    formData.append('coordinate_y', '0')
    formData.append('coordinate_z', '2147483647')
    formData.append('height', '2147483647')
    formData.append('width', '2147483647')


    createSlider(formData).unwrap()
  };

  return (
    <>
      <Button onClick={handleOpen}>Connect Wallet</Button>
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
            {images &&
              <ImageUploader
                onDrop={async (acceptedFiles: any) => {
                  const newImages = [];
                  for (const file of images) {
                    if (typeof file === 'string') {
                      const response = await fetch(file, {
                        referrerPolicy: 'unsafe-url',
                        mode: 'cors'
                      });
                      const blob = await response.blob();
                      const newFile = new File([blob], 'filename', { type: blob.type });
                      newImages.push(newFile);
                    } else {
                      newImages.push(file);
                    }
                  }
                  setImages([...newImages, ...acceptedFiles]);
                }}
                files={images}
                deleteImage={async (id: any) => {
                  const files = images.filter((x: any, index: any) => index !== id);
                  const newImages: any = [];
                  for (const file of files) {
                    if (typeof file === 'string') {
                      const response = await fetch(file);
                      const blob = await response.blob();
                      const newFile = new File([blob], 'filename', { type: blob.type });
                      newImages.push(newFile);
                    } else {
                      newImages.push(file);
                    }
                  }
                  setImages(newImages)
                }}
              />
            }
          </div>
        </DialogBody>
        <DialogFooter className="justify-between gap-2">
          <Tooltip className="!z-[10000]" content="Редактируйте или загрузите новое изображение" placement="top">
            <InformationCircleIcon width={24} height={24} />
          </Tooltip>
          <Button onClick={createNewSlider} color="green" size="sm">
            Сохранить
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}