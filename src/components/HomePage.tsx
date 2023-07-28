import { useNavigate } from "react-router-dom";
const HomePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>My Address Book</h1>
            <button onClick={() => navigate("/contacts")}> Lets start!</button>
        </>
    );
};

export default HomePage;
