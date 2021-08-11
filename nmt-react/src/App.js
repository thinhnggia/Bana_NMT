import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import axios from 'axios';

function App() {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if(value!== ""){
      axios.post("http://ec2-18-224-66-44.us-east-2.compute.amazonaws.com:5000/translate", {"sentence": value})
      .then((response) => {
        console.log(response);
        document.getElementsByClassName("sentiment-text")[0].innerText = response["data"]["result"];
      })
      .catch((err) => {
        console.log(err);
        document.getElementsByClassName("sentiment-text")[0].innerText = "Error"
      });
    }
  }

  const onClickReset = () => {
    console.log("Reset data");
    setValue("");
    document.getElementsByClassName("sentiment-text")[0].innerText = "Empty answer"
  }

  const handleValueChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div style={{height:"100vh", width:"100vw", alignItems:"center", justifyContent:"center", textAlign:"center", backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display:"table-cell", verticalAlign: "middle", horizontalAlign:"middle"}}>
        {/* <IconButton color="default" aria-label="upload picture" component="span" style={{"left": "25px"}} onClick={onClickReset}>
            <ReplayIcon fontSize="large"/>
        </IconButton> */}
        <Input transparent onChange={handleValueChange} action={{color: 'teal', onClick: () => handleClick(), content: "TRANSLATE"}} placeholder='Write...' style={{border:"1px solid #fff", padding:"10px", borderRadius: "5px"}} />
        <p className="sentiment-text" style={{marginTop: "20px", color: "white"}}>Empty answer</p>
    </div>
  );
}

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


export default App;
