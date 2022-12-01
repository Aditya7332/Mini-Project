  
import { useContext } from 'react';
import {Dialog,Box,Typography,List,ListItem,styled} from '@mui/material';
import { qrCodeImage } from '../../constants/data'; 
import{GoogleLogin} from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import{addUser} from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';

const Component=styled(Box)`
display:flex;
`;
const Container=styled(Box)`
 padding:56px 0 56px 56px;
 `;
 const QRCode =styled('img')({
  height:264,
  width:264,
  margin:'50px 0 0 50px'
 });
 const Title=styled(Typography)`
 font-size:25px;
 colour:#525252;
 font-weight:350;
 font-family:inherit;
 margin-bottom:20;
 `;
 const StyledList=styled(List)`
 & >li
 {
  padding:0;
  margin-top:15px;
  font-size:19px;
  line-height:30px;
  color:#4a4a4a;
 }`

const dialogstyle={
  height:'96%',
  marginTop:'12%',
  width:'90%',
  maxwidth:'100%',
  maxHeight:'100%',
  boxShadow:'none',
  borderRadius:0,
  overflow:'hidden'
}

  const LoginDialog =() => {
    const{setAccount,showloginButton,setShowloginButton,setShowlogoutButton}=useContext(AccountContext);
    
    const onLoginSuccess=async(res)=>{
      let decoded = jwt_decode(res.credential);
      setAccount(decoded);
      setShowloginButton(false);
      setShowlogoutButton(true);
      await addUser(decoded);
    };

    const onLoginError=(res)=>
    {
      console.log('Login Failed:', res);
    };
    return (
        <Dialog 
        open={true}
        BackdropProps={{style: {backgroundColor: 'unset'}}}
            maxWidth={'md'}
        PaperProps={{sx:dialogstyle}}
        >
          <Component>
            <Container>
              <Title>To use WhatsApp on your computer:</Title>
              <StyledList>
                <ListItem>1.Open WhatsApp on your phone</ListItem>
                <ListItem>2.Tap Menu or Settings and select Linked Devices</ListItem>
                <ListItem>3.Point your phone to this screen to capture the code</ListItem>
              </StyledList>
              </Container>
              <Box style ={{position:'relative'}}>
              <QRCode src={qrCodeImage} alt="QR Code"/>
              < Box style={{position:'absolute',top:'50%',transform:'translateX(25%) translate(-25%)'}}>
              {showloginButton ?
              <GoogleLogin
              buttonText=""
               onSuccess={onLoginSuccess}
               onError={onLoginError}
              />:null}
            </Box>
           </Box> 
          </Component>
            
        </Dialog>
    )
  }
  export default LoginDialog;