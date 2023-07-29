import { useAppSelector } from "../store/store";

interface ILoadingWrapperProps {
    children: React.ReactNode;
}

const LoadingWrapper: React.FC<ILoadingWrapperProps> = ({ children }) => {
    const loading = useAppSelector(state => state.contacts.loading);
    const error = useAppSelector(state => state.contacts.error);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {loading && (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-2xl">
                    Loading...
                </div>
            )}
            {error && (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-2xl">
                    Error: {error}
                </div>
            )}
            {children}
        </div>
    );
};

export default LoadingWrapper;
