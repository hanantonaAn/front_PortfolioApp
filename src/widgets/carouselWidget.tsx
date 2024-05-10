import { CarouselModal } from "@/components/modals/carouselModal/carouselModal";
import { useGetImagesBySliderQuery } from "@/service/carouselService";
import { IPortfolioUsername } from "@/types/portfolio";
import { IUser } from "@/types/user";
import { Button, Carousel, Tooltip } from "@material-tailwind/react";
import { useState } from "react";


type Props = {
    slider_id: string;
    user: IUser | null;
    userPortfolio?: IPortfolioUsername;
}

export const CarouselWidget = ({ slider_id, user, userPortfolio }: Props) => {

    const { data } = useGetImagesBySliderQuery(slider_id);

    const [openSlider, setOpenSlider] = useState<boolean>(false);

    const handleOpenSlider = () => setOpenSlider((cur) => !cur);

    return (
        <div className="mt-5">
            {data &&
                <CarouselModal open={openSlider} handleOpen={handleOpenSlider} id={slider_id} allImages={data} />
            }
            {user && user.id === userPortfolio?.user?.id &&
            <Tooltip className="!z-[10000]" content="Изменить слайдер" placement="top">
                <Button color="blue" onClick={handleOpenSlider}>Изменить</Button>
            </Tooltip>
            }
            <Carousel
                className="rounded-lg mt-5"
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                    }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                {data && data.map((item, index) => {
                    return (
                        <img
                            key={index}
                            src={item.image.replace('/', 'http://127.0.0.1:8000/')}
                            alt="image 1"
                            className="h-[500px] w-full object-cover"
                        />
                    )
                })}
            </Carousel>
        </div>
    );
};