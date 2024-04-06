// Wrapper

type WrapperProps = {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const Container = "mx-auto max-w-full lg:max-w-[1620px] lg:px-16 px-3 w-screen";
    return (
        <div className={Container}>
            {children}
        </div>
    );
};
