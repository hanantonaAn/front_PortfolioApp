// Wrapper

type WrapperProps = {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const Container = "mx-auto h-full max-w-full lg:max-w-[1920px] lg:px-8 px-3 w-screen";
    return (
        <div className={Container}>
            {children}
        </div>
    );
};
