import { useAppSelector } from "../store/store";

interface ILoadingWrapperProps {
    children: React.ReactNode;
}

const LoadingWrapper: React.FC<ILoadingWrapperProps> = ({ children }) => {
    const loading = useAppSelector(state => state.contacts.loading);
    const error = useAppSelector(state => state.contacts.error);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <>{children}</>;
};

export default LoadingWrapper;
