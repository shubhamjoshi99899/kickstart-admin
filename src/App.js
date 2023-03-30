/* eslint-disable react/no-unstable-nested-components */
import { useContext, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './app.scss';
import { ColorContext } from './ColorContext/darkContext';
import Home from './Components/Home/Home';
import { Contexts } from './ContextUser/Contexts';
import AddHotel from './Pages/AddHotel/AddHotel';
import AddNew from './Pages/AddNew/AddNew';
import AddRoom from './Pages/AddRoom/AddRoom';
import BlogDetail from './Pages/BlogDetail/BlogDetail';
import Blogs from './Pages/Blogs/Blogs';
import Detail from './Pages/Detail/Detail';
import Hotels from './Pages/Hotels/Hotels';
import Login from './Pages/Login/Login';
import Rooms from './Pages/Rooms/Rooms';
import Lists from './Pages/UserLists/UserLists';

// Dynamicaly change the data for different pages
const userInpDetails = [
    {
        id: 2,
        name: 'username',
        lable: 'Username',
        type: 'text',
        placeholder: 'John23',
        required: true,
        pattern: '^[A-Za-z0-9]{3,12}$',
        errorMsg: 'Username should be 3-12 characters & should not include any special character!',
    },
];
const productInpDetails = [
    {
        id: 2,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Product title',
        required: true,
        errorMsg: 'Title is required!',
    },
];
const blogInpDetails = [
    {
        id: 1,
        name: 'title',
        lable: 'Title',
        type: 'text',
        placeholder: 'Blog title',
        required: true,
        errorMsg: 'Title is required!',
    },
];
const hotelInpDetails = [
    {
        id: 5,
        name: 'rating',
        lable: 'Rating',
        type: 'number',
        placeholder: 'Rating',
        min: 5,
        max: 10,
        required: true,
        errorMsg: 'Rating should be between 5-10!',
    },
];
const roomInpDetails = [
    {
        id: 4,
        name: 'maxPeople',
        lable: 'Max people',
        type: 'number',
        min: 1,
        max: 5,
        placeholder: 'Total rooms',
        required: true,
        errorMsg: 'Room should be between 1-10!',
    },
];

function App() {
    // color state management using react context
    const { darkMode } = useContext(ColorContext);
    const [state, setState] = useState(false);

    // create protected route
    function ProtectedRoute({ children }) {
        const { token } = useContext(Contexts);
        if (!token) {
            return <Navigate to="/login" />;
        }

        return children;
    }

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="/login" element={<Login />} />
                        <Route
                            index
                            path="/"
                            element={
                                // <ProtectedRoute>
                                <Home />
                                // </ProtectedRoute>
                            }
                        />
                        {/* nested users routes */}
                        <Route path="users">
                            <Route
                                index
                                element={
                                    // <ProtectedRoute>
                                    <Lists type="user" />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":userId"
                                element={
                                    // <ProtectedRoute>
                                    <Detail />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path="addnew"
                                element={
                                    // <ProtectedRoute>
                                    <AddNew
                                        inputs={userInpDetails}
                                        title="Add New User"
                                        type="USER"
                                    />
                                    // </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* nested hotel routes */}
                        <Route path="hotels">
                            <Route
                                index
                                element={
                                    // <ProtectedRoute>
                                    <Hotels type="room" />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":hotelId"
                                element={
                                    // <ProtectedRoute>
                                    <BlogDetail />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path="addnew"
                                element={
                                    // <ProtectedRoute>
                                    <AddHotel
                                        inputs={hotelInpDetails}
                                        title="Add New Hotel"
                                        type="HOTEL"
                                    />
                                    // </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* nested hotel routes */}
                        <Route path="spaces">
                            <Route
                                index
                                element={
                                    // <ProtectedRoute>
                                    <Rooms type="room" />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":roomId"
                                element={
                                    // <ProtectedRoute>
                                    <BlogDetail />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path="addnew"
                                element={
                                    // <ProtectedRoute>
                                    <AddRoom
                                        inputs={roomInpDetails}
                                        title="Add New Room"
                                        type="ROOM"
                                    />
                                    // </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* nested blogs routes */}
                        <Route path="blogs">
                            <Route
                                index
                                element={
                                    // <ProtectedRoute>
                                    <Blogs type="blog" />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":blogId"
                                element={
                                    // <ProtectedRoute>
                                    <BlogDetail />
                                    // </ProtectedRoute>
                                }
                            />
                            <Route
                                path="addnew"
                                element={
                                    // <ProtectedRoute>
                                    <AddNew
                                        inputs={blogInpDetails}
                                        title="Create New Blog"
                                        type="BLOG"
                                    />
                                    // </ProtectedRoute>
                                }
                            />
                        </Route>

                        {/* nested product routes */}
                        <Route path="bookings">
                            <Route
                                index
                                element={
                                    // <ProtectedRoute>
                                    <Lists type="bookings" />
                                    // </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
