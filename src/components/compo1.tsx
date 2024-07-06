import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

//Interface for API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const FirstComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data); //Store data in post interface
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching data:', error); //Throw error if fetching failed
        setLoading(false); 
      });
  }, []);

  //Defining columns for the DataGrid
  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <div style={{ height: 400, width: '80%', margin: '5%'}}>
      <Typography variant="h6">
          Component 1
        </Typography>
      <DataGrid
        rows={posts}
        columns={columns}
        loading={loading} //loading while data is being fetched
        getRowId={(row) => row.id} //Get unique id for each row
      />
    </div>
  );
}