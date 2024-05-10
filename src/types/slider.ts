export type ISlider = {
    id: string;
    coordinate_x: number;
    coordinate_y: number;
    coordinate_z: number;
    height: number;
    width: number;
    pictures: string[];
}

export type ISliderImage = {
    id: string;
    image: string;
    slider_id: string;
}