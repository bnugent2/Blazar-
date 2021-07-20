import React,{useContext} from 'react'
import './addteam.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useForm} from 'react-hook-form'
import firebase from 'firebase';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography';
import { AuthContext } from "../Authentication";
import departments from '../Departments'
function Addteam() {
    const {currentUser} = useContext(AuthContext);
    const {register, handleSubmit, control} = useForm()
    const [personName, setPersonName] = React.useState([]);


      const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8; 
      const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

      const handleChange = (event) => {
        setPersonName(event.target.value);
      };
    

    return (
        <div className='window'>
            <Typography component="h1" variant="h5">
         Add Team Member
        </Typography>
            <form noValidate onSubmit={handleSubmit((data)=> firebase.firestore().collection('team').add({
            Name: data.name,
            tm_num: data.team_number,
            Contract: data.contract,
            departments: personName,
            author: currentUser.uid 
}))}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="team_number"
            label="Team Number"
            id="team_number"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="contract"
            label="Contract"
            id="contract"
          />
          <InputLabel id="demo-mutiple-chip-label">Department</InputLabel>
          <Select
          label="Departments"
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {departments.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
          </form>
        </div>
    )
}

export default Addteam
