import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FaCheckCircle } from 'react-icons/fa'
import { RxCrossCircled } from "react-icons/rx";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const PasswordValidation = () => {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordIndicator, setShowPasswordIndicator] = useState(false);

  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setlowercase] = useState(false);
  const [specChar, setSpecChar] = useState(false);
  const[completePassword, setCompletePassword]=useState(false)

 
  const handleshowPasswordIndicator = () => {
    setShowPasswordIndicator(true)
  }

  useEffect(() => {

    //character length
    if (password.length >= 8) {
      setCharacter(true)
    } else {
      setCharacter(false)
    }


    //check for number
    if (password.match(/[0-9]/)) {
      setNumber(true)
    } else {
      setNumber(false)
    }

    //check lower and uppercase

    if (password.match(/[A-Z]/g)) {
      setUppercase(true);
    } else {
      setUppercase(false);
    }

    //check lowercase
    if (password.match(/[a-z]/g)) {
      setlowercase(true);
    } else {
      setlowercase(false);
    }


    //check for special character
    if (password.match(/[#?!@$%^&*-]/g)) {
      setSpecChar(true)
    } else {
      setSpecChar(false)
    }


    if(character && number && uppercase && lowercase && specChar){
      setCompletePassword(true)
    }else{
      setCompletePassword(false)
    }

  },[password, character, number, uppercase, lowercase, specChar])


  const validation=()=>{
    
    let isValid="";
        if(email ===""){
            // alert("Cant be Blank!!!!!. Enter Valid Email")
            toast.error("Cant be Blank!!!!!. Enter Valid Email", {
              position: toast.POSITION.TOP_CENTER,
            });
            
            
        }else{
            let regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!regex.test(email)){
                // alert("Email is not valid!!!! Enter Valid Username")
                toast.error("Email is not valid!!!! Enter Valid Username", {
                  position: toast.POSITION.TOP_CENTER,
                });
            }else{
              isValid=true;
            }
        }

        if(isValid && completePassword){
          toast.success("Successfully Registered !", {
            position: toast.POSITION.TOP_CENTER,
          });

          setEmail("");
          setPassword("")
        }
  }

  return (

    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& .MuiTextField-root': { width: '35ch' },

        }}

      >
        <div className="hero">
          <h1><span>Password Validation</span></h1>
        </div>

        {/* <TextField label={'Password'} id="margin-normal" margin="normal" type={showPassword ? 'text' : 'password'} value={password}
          onChange={(e) => setPassword(e.target.value)}>
        
          </TextField> */}

        {/* email */}
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel >Email</InputLabel>
          <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" >
              <MailOutlineIcon/>
              </IconButton>
            </InputAdornment>
          }
          />
        </FormControl>


        {/* password */}
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel >Password</InputLabel>
          <Input
            id="margin-normal" margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             onFocus={handleshowPasswordIndicator}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
         
        </FormControl>

        {/* Register button */}
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <Button variant="outlined" startIcon={<HowToRegIcon />} disabled={!completePassword} onClick={validation}>
            Register
          </Button>
          <ToastContainer />
        </FormControl>


        {/* Password Indicator */}
        {showPasswordIndicator ?<List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            
          }}
          
        >
          
          {/* 8 character */}
          <ListItem>
            <ListItemAvatar>
              <Avatar >
                {character ? <FaCheckCircle style={{ color: "green" }} /> : <RxCrossCircled style={{ color: "red" }} />}
              </Avatar>
            </ListItemAvatar>
            {character ? <ListItemText primary="Must be atleast 8 Characters" style={{ color: "green" }} /> : <ListItemText primary="Must be atleast 8 Characters" style={{ color: "red" }} />}
            {/* <ListItemText primary="Must be atleast 8 Characters" secondary="" /> */}
          </ListItem>

          <Divider variant="inset" component="li" />

          {/* number */}
          <ListItem>
            <ListItemAvatar>
              <Avatar >
                {number ? <FaCheckCircle style={{ color: "green" }} /> : <RxCrossCircled style={{ color: "red" }} />}
              </Avatar>
            </ListItemAvatar>
            {character ? <ListItemText primary="Must contain atleast 1 number" style={{ color: "green" }} /> : <ListItemText primary="Must contain atleast 1 number" style={{ color: "red" }} />}
          </ListItem>

          <Divider variant="inset" component="li" />


          {/* uppercase */}
          <ListItem>
            <ListItemAvatar>
              <Avatar >
                {uppercase ? <FaCheckCircle style={{ color: "green" }} /> : <RxCrossCircled style={{ color: "red" }} />}
              </Avatar>
            </ListItemAvatar>
            {uppercase ? <ListItemText primary="Must contain atleast 1 letter in uppercase" style={{ color: "green" }} /> : <ListItemText primary="Must contain atleast 1 letter in uppercase" style={{ color: "red" }} />}
          </ListItem>

          <Divider variant="inset" component="li" />


          {/* lowercase */}
          <ListItem>
            <ListItemAvatar>
              <Avatar >
                {lowercase ? <FaCheckCircle style={{ color: "green" }} /> : <RxCrossCircled style={{ color: "red" }} />}
              </Avatar>
            </ListItemAvatar>
            {lowercase ? <ListItemText primary="Must contain atleast 1 letter in lowercase" style={{ color: "green" }} /> : <ListItemText primary="Must contain atleast 1 letter in lowercase" style={{ color: "red" }} />}
          </ListItem>

          <Divider variant="inset" component="li" />

          {/* special character */}
          <ListItem>
            <ListItemAvatar>
              <Avatar >
                {specChar ? <FaCheckCircle style={{ color: "green" }} /> : <RxCrossCircled style={{ color: "red" }} />}
              </Avatar>
            </ListItemAvatar>
            {specChar ? <ListItemText primary="Must contain atleast 1 special Character" style={{ color: "green" }} /> : <ListItemText primary="Must contain atleast 1 special Character" style={{ color: "red" }} />}
          </ListItem>

        </List>
        
      :""}
        
       


      </Box>

    </>
  )
}
