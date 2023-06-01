import { useState } from 'react';
import { createStyles, Container } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';

const useStyles = createStyles({
  container: {
    height: '100%',
    backgroundColor: 'gray',
  },
});

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');
  const { classes } = useStyles();

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <Container className={classes.container} fluid>
      <h1>Welcome to Fine Food Dashboard</h1>
    </Container>
  );
}

export default App;
