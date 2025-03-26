import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CommentForm = ({ onAddComment }) => {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!content) {
      alert('Comment content cannot be empty.');
      return;
    }

    const newComment = {
      id: Math.floor(Math.random() * 100000),
      email,
      content,
    };

    onAddComment(newComment);
    setEmail('');
    setContent('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
          },
        }}
      />
      <TextField
        fullWidth
        label="Add a comment..."
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#007BFF',
          color: 'white',
          borderRadius: '4px',
          padding: '10px',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        }}
      >
        Comment
      </Button>
    </Box>
  );
};

export default CommentForm;