// material-tailwind.d.ts
import { } from "@material-tailwind/react";

type EventCapture = {
    onPointerEnterCapture?: unknown;
    onPointerLeaveCapture?: unknown;
    placeholder?: unknown;
};

declare module "@material-tailwind/react" {
    export interface ButtonProps extends EventCapture {
        placeholder?: unknown;
    }
    export interface InputProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface SelectProps extends EventCapture {
        placeholder?: unknown;
    }
    export interface TypographyProps extends EventCapture {
        placeholder?: unknown;
    }
    export interface CardProps extends EventCapture {
        placeholder?: unknown;
    }
    export interface IconButtonProps extends EventCapture {
        placeholder?: unknown;
    }
    export interface NavbarProps extends EventCapture {
        placeholder?: unknown;
    }
    export interface CheckboxProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface AvatarProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface MenuListProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface MenuItemProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface CardBodyProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface CardHeaderProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface CardFooterProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface ListProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface ListItemProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface ListItemPrefixProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface ListItemSuffixProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface StepperProps extends EventCapture {
        crossOrigin?: unknown;
    }
    export interface StepProps extends EventCapture {
        crossOrigin?: unknown;
        onPointerEnterCapture?: undefined;
        onPointerLeaveCapture?: undefined;
        placeholder?: undefined
    }
    export interface ButtonGroupProps extends EventCapture {
        placeholder?: undefined
    }
    export interface CarouselProps extends EventCapture {
        placeholder?: undefined
    }
    export interface PopoverContentProps extends EventCapture {
        placeholder?: undefined
    }
    export interface DialogProps extends EventCapture {
        placeholder?: undefined
    }
    export interface DialogHeaderProps extends EventCapture {
        placeholder?: undefined
    }
    export interface DialogBodyProps extends EventCapture {
        placeholder?: undefined
    }
    export interface DialogFooterProps extends EventCapture {
        placeholder?: undefined
    }
    export interface SwitchProps extends EventCapture {
        crossOrigin?: undefined
    }
}