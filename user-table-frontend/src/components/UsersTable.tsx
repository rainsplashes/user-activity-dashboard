import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, CircularProgress,
  Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent
} from '@mui/material';

//Type definition matching the Go server's JSON response for each user.
interface RawUser {
  name: string;                  //Name of the user
  create_date: string;           //ISO date string "YYYY-MM-DD"
  password_changed_date: string; //ISO date string
  last_access_date: string;      //ISO date string
  mfa_enabled: boolean;          //If Multi-Factor Authentication is enabled
}

//Extended type including live-computed fields on the client only.
interface User extends RawUser {
  daysSincePwdChange: number;
  daysSinceLastAccess: number;
}

//Possible filter options for MFA status
type MfaFilter = 'all' | 'enabled' | 'disabled';

const UsersTable: React.FC = () => {
  //React state to store and process user data in an array, starting off empty. Note that it is type User and not RawUser, as explained later
  const [users, setUsers] = useState<User[]>([]);
  //React state to track whether the page is "loading", starting off true.
  const [loading, setLoading] = useState<boolean>(true);
  //React state for storing MFA filter selection
  const [filter, setFilter] = useState<MfaFilter>('all');

  //useEffect runs after initial render to load data
  useEffect(() => {
    //Fetch raw user data from the Go API. Proxy has been added to localhost:8080 in package.json to connect to Go Server.
    axios.get<RawUser[]>('/api/users')
      .then((res) => {
        //Get current time for calculations later
        const now = new Date();
        //Map data from "RawUser" type to "User" type
        const data = res.data.map(u => {
          //parse ISO time strings into JavaScript's Date objects
          const pwdDate = new Date(u.password_changed_date);
          const lastAccDate = new Date(u.last_access_date);
          return {
            //Spread existing fields
            ...u,
            //Live compute extra data not given by server
            daysSincePwdChange: Math.floor((now.getTime() - pwdDate.getTime()) / (1000 * 60 * 60 * 24)),
            daysSinceLastAccess: Math.floor((now.getTime() - lastAccDate.getTime()) / (1000 * 60 * 60 * 24)),
          };
        });
        //set Users array after the processing
        setUsers(data);
      })
      .catch(err => console.error('Error fetching users:', err))
      //Stop displaying loading screen and instead display table, by setting state with React
      .finally(() => setLoading(false));
  }, []);

  //Display a spinning circle while data is loading from server
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  //React handler for changing the MFA filter selection
  const handleFilterChange = (event: SelectChangeEvent<MfaFilter>) => {
    setFilter(event.target.value as MfaFilter);
  };

  //Apply MFA filter to the Users array, which will be used by the table renderer below.
  const filteredUsers = users.filter(u => {
    if (filter === 'all') return true;
    return filter === 'enabled' ? u.mfa_enabled : !u.mfa_enabled;
  });

  //Display table when not loading (Using Material-UI)
  return (
    <Box>
      {/* Filter control above the table */}
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel id="mfa-filter-label">MFA Status</InputLabel>
        <Select
          labelId="mfa-filter-label"
          value={filter}
          label="MFA Status"
          onChange={handleFilterChange}
        >
          <MenuItem value="all">All Users</MenuItem>
          <MenuItem value="enabled">MFA Enabled</MenuItem>
          <MenuItem value="disabled">MFA Disabled</MenuItem>
        </Select>
      </FormControl>

    
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Create Date</TableCell>
            <TableCell>Password Changed</TableCell>
            <TableCell>Days Since Password Change</TableCell>
            <TableCell>Last Access</TableCell>
            <TableCell>Days Since Last Access</TableCell>
            <TableCell>MFA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*Use the filtered Users list*/}
          {filteredUsers.map((u, idx) => (
            <TableRow key={idx} hover>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.create_date}</TableCell>
              <TableCell>{u.password_changed_date}</TableCell>
              {/*Highlight stale passwords in red (>365 days)*/}
              <TableCell>
                <Chip
                  label={u.daysSincePwdChange}
                  color={u.daysSincePwdChange > 365 ? 'error' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>{u.last_access_date}</TableCell>
              {/*Highlight inactivity in orange (>90 days)*/}
              <TableCell>
                <Chip
                  label={u.daysSinceLastAccess}
                  color={u.daysSinceLastAccess > 90 ? 'warning' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {/*MFA enabled will be highlighted in green*/}
                {u.mfa_enabled ? (
                  <Chip label="Enabled" color="success" size="small" />
                ) : (
                  <Chip label="Disabled" size="small" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
};

export default UsersTable;
