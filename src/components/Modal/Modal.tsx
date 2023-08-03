export interface IModalProps {
    setIsOpen: (isOpen: boolean) => void;
    id?: string;
    onConfirm: ((args?: any) => void) | ((id?: string) => void);
    headerText: string;
    activeButton: "Delete" | "Confirm";
}

const Modal: React.FC<IModalProps> = ({
    setIsOpen,
    onConfirm,
    id,
    headerText,
    activeButton
}) => {
    return (
        <div
            className={` absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center h-screen w-screen`}
            onClick={() => setIsOpen(false)}
        >
            <div
                className="bg-white p-6 rounded shadow-lg"
                onClick={e => e.stopPropagation()}
            >
                <p>{headerText}</p>
                <div className="flex justify-center space-x-10">
                    <button
                        onClick={() => {
                            activeButton === "Delete" && id
                                ? onConfirm(id)
                                : onConfirm();
                            setIsOpen(false);
                        }}
                        className="mt-4 bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
                    >
                        {activeButton}
                    </button>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                        }}
                        className="mt-4 bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
