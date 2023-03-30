/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './tableList.scss';

// mui table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// import dummy image
import axios from 'axios';
import book1 from '../../Images/book1.jpg';
import { handleGetFullDateWithTime } from '../../utils/dataModifier';

function TableList() {
    // Replace this data with your own
    const data = [
        {
            _id: 23423343,
            product: 'Room 1',
            image: book1,
            customer: 'Devid John',
            date: '3 October, 2022',
            ammount: 45,
            method: 'Online Payment',
            status: 'Approved',
        },
    ];

    const [currentbookings, setCurrentBooking] = useState([]);

    useEffect(() => {
        const datass = async () => {
            const curRes = await axios.get(
                'http://localhost:3500/api/v1/admin/info/current/reservation'
            );
            setCurrentBooking(curRes.data.response);
        };
        datass();
    }, []);

    return (
        <TableContainer component={Paper} className="table_list">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_cell">Booking Id</TableCell>
                        <TableCell className="table_cell">Booked Space</TableCell>
                        <TableCell className="table_cell">Customer</TableCell>
                        <TableCell className="table_cell">Booking Time</TableCell>
                        <TableCell className="table_cell">Reservation Time</TableCell>
                        <TableCell className="table_cell">Payment Status</TableCell>
                        <TableCell className="table_cell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentbookings.map((row) => (
                        <TableRow key={row?._id}>
                            <TableCell component="th" scope="row" className="table_cell">
                                <div className="product_idd">
                                    {/* <img src={row?.image} alt="product" className="product_img" /> */}
                                    {row?.transactionNumber}
                                </div>
                            </TableCell>
                            <TableCell className="table_cell">{row?.seatID}</TableCell>
                            <TableCell className="table_cell">{row?.userID}</TableCell>
                            <TableCell className="table_cell">
                                {handleGetFullDateWithTime(row?.reservationDate)}
                            </TableCell>
                            <TableCell className="table_cell">
                                {handleGetFullDateWithTime(row?.bookingTime)}
                            </TableCell>
                            <TableCell className="table_cell">Paid</TableCell>
                            <TableCell className="table_cell">
                                <span className={`status ${row?.status}`}>Booked</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableList;
