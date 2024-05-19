import Image from "next/image";

type Props = {
    picture?: string;
}

export const PhotoWidget = ({ picture }: Props) => {
    return (
        <div className="h-[85%]">
            {picture &&
                <Image
                    className="w-full h-full object-cover"
                    width={1024}
                    height={500}
                    src={picture.replace('/', 'http://127.0.0.1:8000/')}
                    alt=""
                />
            }
        </div>
    );
};