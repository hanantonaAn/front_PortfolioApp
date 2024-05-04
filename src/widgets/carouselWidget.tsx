import { ImageUploader } from "@/components/formConstructor/imageUploader";
import { Carousel } from "@material-tailwind/react";
import { useState } from "react";

export const CarouselWidget = () => {
    const [images, setImages] = useState<any>(['https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80']);
    return (
        <Carousel
            className="rounded-xl"
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
            {images && images.map((item: any, index: any) => {
                return (
                    <img
                        key={index}
                        src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                )
            })}
        </Carousel>
    );
};