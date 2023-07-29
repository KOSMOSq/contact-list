import { useAppSelector } from "../store/store";

interface ILoadingWrapperProps {
    children: React.ReactNode;
}

const LoadingWrapper: React.FC<ILoadingWrapperProps> = ({ children }) => {
    const loading = useAppSelector(state => state.contacts.loading);
    const error = useAppSelector(state => state.contacts.error);

    if (loading) {
        return (
            <div className="container m-auto p-4 max-w-5xl text-2xl">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 max-w-5xl text-2xl">
                Error: {error}
            </div>
        );
    }

    return <div className="container mx-auto p-4 max-w-5xl flex flex-col bg-red-50 mt-10">{children}</div>;
};

export default LoadingWrapper;
