import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import Header from "../../components/Header";

import { useState } from "react";
import supabase from "../../data/supabaseClient";

const Vehicles = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    async function fetchVehicles() {
        let { data: vehicles } = await supabase.from('vehicles').select('*');
        
        return vehicles;
    }
    
    let [ mockDataVehicles, setMockDataVehicles ] = useState([]);

    fetchVehicles().then(res => {
        const mockDataVehicles = [];

        for (let i = 0; i < res.length; i++) {
          mockDataVehicles.push({
            id: i + 1,
            name: res[i].name,
            location: res[i].location,
            rank: res[i].rank,
            count: res[i].total,
          });
        }

        setMockDataVehicles(mockDataVehicles);
      });



    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "rank",
            headerName: "Rank",
            type: "number",
            headerAlign: "left",
            align: "left",
            cellClassName: "rank-column--cell",
        },
        {
            field: "count",
            headerName: "Total",
            flex: 1,
            cellClassName: "total-column--cell",
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
            cellClassName: "location-column--cell",
        },
    ];

    return (
        <Box m="10px 200px 0 0">
            <Header title="Vehicles" subtitle="Cars | Motorcycles | Planes"></Header>
            <Box
                m="40px 0 0 0"
                height="46vh"
                width="165vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .rank-column--cell": {
                        fontSize: '15px',
                    },
                    "& .total-column--cell": {
                        fontSize: '15px',
                    },
                    "& .location-column--cell": {
                        fontSize: '15px',
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                        fontSize: '15px',
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    }
                }}
            >
                <DataGrid
                    rows={mockDataVehicles}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default Vehicles;