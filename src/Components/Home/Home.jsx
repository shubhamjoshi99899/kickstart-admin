import axios from 'axios';
import React, { useEffect } from 'react';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../TableList/TableList';
import './Home.scss';

function Home() {
    const getUser = () => {
        axios.get('http://localhost:3500/api/v1/admin/info/user/all').then((response) => {
            console.log(response.json());
        });
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className="home">
            <Sidebar />

            <div className="home_main">
                <Navbar />

                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="user" />
                    <ItemLists type="order" />
                    <ItemLists type="earning" />
                    <ItemLists type="balance" />
                </div>

                <div className="chart_sec">
                    <ProgressBar />
                    <Chart height={450} title="Revenue" />
                </div>

                <div className="table">
                    <div className="title">Latest Transactions</div>
                    <TableList />
                </div>
            </div>
        </div>
    );
}

export default Home;
