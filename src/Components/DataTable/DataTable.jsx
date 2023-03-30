/* eslint-disable jsx-a11y/img-redundant-alt */
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import noImage from '../../Images/user.png';
import './datatable.scss';

// Replace this data with your own

function DataTable() {
    const [data, setData] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const dataCall = async () => {
            const res = await axios.get(`http://localhost:3500/api/v1/admin/info/user/all`);
            setData(res.data.result);
        };
        dataCall();
    }, [data]);

    const columns = [
        {
            field: 'userID',
            headerName: 'USER ID',
            width: 310,
            renderCell: (param) => (
                <div className="userr">
                    <img
                        src={param.row.image ? param.row.image : noImage}
                        alt="User"
                        className="userr_image"
                    />
                    {param?.row.userID}
                </div>
            ),
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            width: 160,
        },
        { field: `firstName`, headerName: 'Name', width: 170 },

        { field: 'mailID', headerName: 'Email', width: 170 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <div className="actionn">
                    <Link to={params?.row._id}>
                        <button type="button" className="view_btn">
                            View
                        </button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className="data_table">
            <DataGrid
                className="data_grid"
                rows={data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                getRowId={(row) => row.userID}
            />
        </div>
    );
}

export default DataTable;
