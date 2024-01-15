import React, { useState } from 'react';
import { Fab, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MuiModal from './AddTaskModal';

const MuiButton = () => {

    const [isopenModal, setIsOpenModal] = useState(false);
    const openModal = () => { setIsOpenModal(true); };
    const closeModal = () => { setIsOpenModal(false); };

    return (
        <div data-testid="add-button">
        <Stack direction="row" style={{ display: "flow-root" }}>
            <Fab color="primary"
                style={{ float: "right", marginTop: '10px' }}
                onClick={openModal}
            >
                <AddIcon />
            </Fab>
            <div data-testid="modal">
            <MuiModal open={isopenModal} handleClose={closeModal} />
            </div>
            
        </Stack>
        </div>
    )
}
export default MuiButton;