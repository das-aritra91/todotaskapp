import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const MuiTab = () => {
    const [value, setValue] = useState("home");
    const handleChange = (event, newValue) => { setValue(newValue) }

    return (
        <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary" centered
            >
                <Tab value="home" label={<Link to="/" style={{ textDecoration: "none" }}>Home</Link>}></Tab>
                <Tab value="complete" label={<Link to="/complete" style={{ textDecoration: "none" }}>Completed</Link>}></Tab>
                <Tab value="trash" label={<Link to="/trash" style={{ textDecoration: "none" }}>Trash</Link>}></Tab>
            </Tabs>
        </Box>
    )
}

export default MuiTab;