import React from "react"
import ReactDOM from "react-dom"
import { createUser, loadUsers } from "./users-api.js"

ReactDOM.createRoot(document.getElementById("root"))
    .render(<App />)

function App() {
    return (
        <div className="max-w-xl mx-auto py-10">
            <div className="flex flex-row items-center mb-8">
                <h1 className="flex-grow text-4xl font-bold">
                    User Manager
                </h1>
                <div className="flex flex-row gap-1">
                    <span id="username">Admin</span>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
                    </svg>
                </div>
            </div>
            <UsersList />
        </div>
    )
}

function useUsers() {
    const [users, setUsers] = React.useState([]);

    React.useEffect(
        () => {
            loadUsers().then(setUsers)
        },
        []
    )

    return users;
}

function UsersList() {
    const [count, setCount] = React.useState(0);
    const users = useUsers();
    const [showNewUserDialog, setShowNewUserDialog] = React.useState(false);

    return (
        <div>
            <div className="mb-4 text-right">
                <a name="add-user" href="#/users"
                    className="w-full text-sm bg-blue-600 text-white py-1 px-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => setShowNewUserDialog(true)}
                >Add User</a>
            </div>
            <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {users.map(user => (
                    <UsersListItem key={user.id} user={user}
                        onUserSelected={() => setCount(count + 1)}
                    />
                ))}
            </ul>
            {showNewUserDialog && (
                <AddNewUserForm onUserCreated={() => setShowNewUserDialog(false)} />
            )}
            Current Count: {count}
        </div>
    )
}

function UsersListItem({ user, onUserSelected }) {
    return (
        <li className="p-4 cursor-pointer"
            onClick={onUserSelected}
        >
            {user.name}
        </li>
    )
}

function AddNewUserForm({ onUserCreated }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser({ name, email })
            .then((created) => {
                console.log("new user created", created);
                onUserCreated(created);
            });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div className="max-w-lg mx-auto py-10">
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-6">
                        Create a New User
                    </h1>
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-lg font-medium"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-lg font-medium"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Create User
                    </button>
                </div>
            </div>
        </form>
    );
}