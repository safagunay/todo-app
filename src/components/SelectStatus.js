import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    formControl: {
        minWidth: 120,
    },
    select: {
        color: "primary"
    }
});

export default function SelectStatus(props) {
    const classes = useStyles();
    const [status, setStatus] = React.useState(props.val);
    const [open, setOpen] = React.useState(false);

    function handleChange(event) {
        setStatus(event.target.value);
        props.onChange(event.target.value);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleOpen() {
        setOpen(true);
    }

    return (
        <form autoComplete="off">
            <FormControl className={classes.formControl}>
                <InputLabel>Status</InputLabel>
                <Select className={classes.select}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={status}
                    onChange={handleChange}

                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="complete">Complete</MenuItem>
                    <MenuItem value="incomplete">Incomplete</MenuItem>
                </Select>
            </FormControl>
        </form>
    );
}
