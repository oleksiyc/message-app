import React from 'react';
import logo from './logo.svg';
import './App.css';
import mockMessageData from './data/messages.json';
import Grid from "@mui/material/Grid";
import Layout from "./components/Layout";
import MessageApp from "./components/MessageApp";
import Background from "./components/Background";
import {Typography} from "@mui/material";

function App() {
  return (
    <div className="App">
      <Background></Background>
      <Layout>
          <Grid item container flexDirection="column" direction="column" spacing={6}>
          <Grid item>
              <Typography style={{fontFamily: "Literata", fontSize: 40}}>Messaging app</Typography>
              <Typography style={{fontFamily: "Literata", fontSize: 20, opacity: .5}}>Oleksiy Chornobay</Typography>
          </Grid>
          <Grid item>
              <MessageApp conversations={mockMessageData}/>
          </Grid>
          </Grid>
      </Layout>
    </div>
  );
}

export default App;
