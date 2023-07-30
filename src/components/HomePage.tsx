import { useNavigate } from "react-router-dom";
const HomePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen rounded">
                <div className="container mx-auto p-4 max-w-5xl flex flex-col bg-red-50 py-10">
                    <h1 className="text-center font-bold text-2xl">
                        Contact List
                    </h1>
                    <div className="flex justify-center items-center py-2 text-red-700 ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                    <h2 className="px-10">
                        In this project, a dynamic web application was developed
                        using <b>TypeScript</b>, <b>React</b> and{" "}
                        <b>Tailwind CSS</b>. The main functional components of
                        the application are two forms:
                        <li>Contacts List</li>
                        <li>New/Edit Contact</li>
                        <p className=" pl-2 font-bold">
                            What was accomplished?
                        </p>
                        <p className=" pl-4 font-bold">
                            1. Two primary forms were created:
                        </p>
                        <li>Contacts List</li> In this form, users can view and
                        manage their list of contacts. Contact information is
                        displayed in a user-friendly and easily readable format.
                        <li>New/Edit Contact</li> This form allows users to add
                        new contacts or edit existing ones. Email field
                        validation is included to ensure the accuracy of data
                        input.
                        <p className=" pl-4 font-bold">
                            2. Security and authentication:
                        </p>
                        Due to the simplified structure of the project, the
                        implementation of authentication and{" "}
                        <b>authorization systems was not included</b>. However,
                        this can be added in the future to enhance application
                        security.
                        <p className=" pl-4 font-bold">3. Hosted on Vercel:</p>
                        The static content of the application has been
                        successfully hosted on <b>Vercel</b>, providing users
                        with quick and easy access to the application.
                        <p className=" pl-4 font-bold">
                            4. Backend using Firebase:
                        </p>
                        <b>Firebase</b> was chosen as the backend to store
                        contact data. Functionality for adding, editing, and
                        deleting contacts has been implemented. Interaction with
                        Firebase ensures stable data storage without automatic
                        synchronization of remote data changes.
                        <p className=" pl-4 font-bold">5. State manager:</p>
                        <b>Redux</b> has been integrated into the project to
                        efficiently manage the application's state. This
                        enhances the project's stability and scalability,
                        providing users with a smoother interaction experience.
                    </h2>
                    <button
                        onClick={() => navigate("/contacts")}
                        className="bg-yellow-300 m-10 mb-0 rounded hover:dark:bg-yellow-400 text-xl"
                    >
                        Lets start!
                    </button>
                </div>
            </div>
        </>
    );
};

export default HomePage;
