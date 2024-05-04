export const ProfileWidget = () => {
    return (
        <div className="flex flex-col items-center">
            <img src={'/assets/images/avatar_default.png'} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
            <h1 className="text-xl font-bold">Имя Фамилия</h1>
            <p className="text-gray-700">Software Developer</p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
                <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
            </div>
        </div>
    );
};