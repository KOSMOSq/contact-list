import { useState } from "react";

const useFormData = <TData extends object>(initialValue: TData) => {
    const [formData, setFormData] = useState<TData>(initialValue);
    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return [formData, changeFormData] as const;
};

export { useFormData };
