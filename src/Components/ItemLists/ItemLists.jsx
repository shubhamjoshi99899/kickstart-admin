import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import './itemlists.scss';

function ItemLists({ type }) {
    // store the data
    const [currentBooking, setCurrentBooking] = useState([]);
    const [oldBookings, setOldBookings] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const datass = async () => {
            const curRes = await axios.get(
                'http://localhost:3500/api/v1/admin/info/current/reservation'
            );
            console.log(curRes);
            const oldRes = await axios.get(
                'http://localhost:3500/api/v1/admin/info/old/reservation'
            );
            const allusers = await axios.get('http://localhost:3500/api/v1/admin/info/user/all');
            setCurrentBooking(curRes.data.response);
            setOldBookings(oldRes.data.response);
            setUserData(allusers.data.result);
        };
        datass();
    }, []);

    let data;

    // Dynamicaly change the ui content
    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                count: <CountUp end={userData.length} duration={1} />,
                icon: (
                    <PermIdentityIcon
                        style={{
                            color: '#FF74B1',
                            backgroundColor: '#FFD6EC',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all users',
                linkto: '/users',
            };
            break;
        case 'order':
            data = {
                title: 'SPACES',
                isMoney: false,
                count: <CountUp end={5} duration={1} />,

                icon: (
                    <LocalGroceryStoreOutlinedIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#FFF38C',
                        }}
                        className="icon"
                    />
                ),
                link: 'View all spaces',
                linkto: '/hotels',
            };
            break;
        case 'earning':
            data = {
                title: 'CURRENT BOOKINGS',
                count: <CountUp end={currentBooking?.length} duration={1} />,
                icon: (
                    <AttachMoneyOutlinedIcon
                        style={{
                            color: '#367E18',
                            backgroundColor: '#A7FFE4',
                        }}
                        className="icon"
                    />
                ),
                link: 'See All Bookings',
                linkto: '/blogs',
            };
            break;
        case 'balance':
            data = {
                title: 'OLD Bookings',
                count: <CountUp end={oldBookings?.length} duration={1} />,
                isMoney: false,
                icon: (
                    <PaidOutlinedIcon
                        style={{
                            color: '#AC7088',
                            backgroundColor: '#B1B2FF',
                        }}
                        className="icon"
                    />
                ),
                link: 'See all details',
                linkto: '/',
            };
            break;
        default:
            break;
    }

    return (
        <div className="item_listss">
            <div className="name">
                <p>{data.title}</p>
                <span className="persentage positive">
                    <KeyboardArrowUpIcon />
                    20 %
                </span>
            </div>

            <div className="counts">
                {data.isMoney && <AttachMoneyOutlinedIcon />}
                {data.count}
            </div>

            <div className="see_item">
                <Link to={data.linkto}>
                    <p>{data.link}</p>
                </Link>
                {data.icon}
            </div>
        </div>
    );
}

export default ItemLists;
