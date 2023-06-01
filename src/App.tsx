import { useState } from 'react';
import { Button } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';

function App() {
  const [greetMsg, setGreetMsg] = useState('');
  const [name, setName] = useState('');

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke('greet', { name }));
  }

  return (
    <div className='container'>
      <h1>Welcome to Fine Food Dashboard</h1>
      <Button>Hello</Button>
    </div>
  );
}

export default App;
