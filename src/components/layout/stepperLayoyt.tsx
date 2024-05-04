import React, { Dispatch } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

type StepperProps = {
    children: React.ReactNode;
    activeStep: number;
    handleNext: () => void;
    handlePrev: () => void;
}

export const StepperComponent = ({
    children, activeStep, handleNext,
    handlePrev,
}: StepperProps) => {
    return (
        <div className="w-full my-10">
            <div className="max-w-4xl mx-auto">
                <Stepper
                    activeStep={activeStep}
                >
                    <Step placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <UserIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center">
                            <Typography
                                variant="h6"
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                            >
                                Шаг 1
                            </Typography>
                            <Typography
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                                className="font-normal"
                            >
                                Создайте свой профиль
                            </Typography>
                        </div>
                    </Step>
                    <Step placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <CogIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center">
                            <Typography
                                variant="h6"
                                color={activeStep === 1 ? "blue-gray" : "gray"}
                            >
                                Шаг 2
                            </Typography>
                            <Typography
                                color={activeStep === 1 ? "blue-gray" : "gray"}
                                className="font-normal"
                            >
                                Укажите свой опыт
                            </Typography>
                        </div>
                    </Step>
                    <Step placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <BuildingLibraryIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center">
                            <Typography
                                variant="h6"
                                color={activeStep === 2 ? "blue-gray" : "gray"}
                            >
                                Шаг 3
                            </Typography>
                            <Typography
                                color={activeStep === 2 ? "blue-gray" : "gray"}
                                className="font-normal"
                            >
                                Укажите свои умения
                            </Typography>
                        </div>
                    </Step>
                </Stepper>
                <div className="mt-32 flex justify-between">
                    <Button onClick={handlePrev} disabled={activeStep === 0}>
                        Назад
                    </Button>
                    <Button onClick={handleNext} disabled={activeStep === 2}>
                        Вперед
                    </Button>
                </div>
            </div>
            <div className="mt-8 px-5 lg:px-20 mx-auto max-w-xl">{children}</div>
        </div>
    );
};