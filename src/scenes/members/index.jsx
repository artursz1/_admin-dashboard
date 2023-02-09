import { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { RetrieveMembersContext, UserContext } from "../../App";

const Members = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { memberList } = useContext(RetrieveMembersContext);
  const { loggedInUsername } = useContext(UserContext);

  const mockDataMembers = memberList
    .filter((member) => member.username !== "Guest")
    .map((member) => ({
      id: member.id,
      username: member.username,
      rank: member.rank,
      rankName: member.rank_name,
    }));

  const columns = [
    { field: "id", headerName: "ID" },
    {
      // headerName: "ID" -> represents the column name || field: "id" -> represents member id
      field: "username",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "rank",
      headerName: "Rank",
      type: "number",
      headerAlign: "left",
      cellClassName: "rank-column--cell",
      align: "left",
    },
    {
      field: "rankName",
      headerName: "Rank Name",
      flex: 1,
      cellClassName: "rank-name-column--cell",
      renderCell: ({ row: { rankName } }) => {
        return (
          <Typography
            color={
              rankName === "Founder"
                ? "#ee0202"
                : rankName === "Psycho"
                ? "#fce306"
                : rankName === "Dangerous"
                ? "#1009d1"
                : rankName === "Scareless"
                ? "#946f09"
                : rankName === "Kamikaze"
                ? "#0c9e1a"
                : rankName === "Reckless"
                ? "#851280"
                : rankName === "Crazy"
                ? "#43756b"
                : rankName === "Visitor"
                ? "#b67f9e"
                : null
            }
            fontSize={"15px"}
          >
            {rankName}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box m="20px 0 0 20px">
      <Header title="MEMBERS" subtitle="Informations | Ranks | ETC"></Header>
      <strong>
        <span style={{ color: "#FD6A02" }}>Note:</span>
      </strong>{" "}
      Displaying only the clan members that are registered on our site.
      <Box
        m="40px 0 0 0"
        height="46vh"
        width="165vh"
        rows={mockDataMembers}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            opacity: "90%",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[900],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[900],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[900],
          },
          "& .name-column--cell": {
            color: colors.greenAccent[500],
            fontSize: "15px",
          },
          "& .rank-column--cell": {
            fontSize: "15px",
          },
        }}
      >
        {loggedInUsername !== "Guest" ? (
          <DataGrid rows={mockDataMembers} columns={columns} />
        ) : (
          <p>
            <strong>
              <span style={{ color: "#FD6A02" }}>Note:</span>
            </strong>{" "}
            Informations about clan members are confidential. You can view the
            total members of the clan by navigating to the
            <strong>
              <span style={{ color: "#79797c" }}> Informations</span>
            </strong>{" "}
            page.
          </p>
        )}
      </Box>
    </Box>
  );
};

export default Members;
