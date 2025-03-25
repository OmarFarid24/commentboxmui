import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText, } from '@mui/material';

const CommentsApp = () => {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(savedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

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

    setComments([...comments, newComment]);
    setEmail('');
    setContent('');
  };

  const handleDelete = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleEdit = (id) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    const newContent = prompt('Edit your comment:', commentToEdit.content);
    if (newContent) {
      const updatedComments = comments.map((comment) =>
        comment.id === id ? { ...comment, content: newContent } : comment
      );
      setComments(updatedComments);
    }
  };

  return (
    <Box sx={{
        fontFamily: 'Arial, sans-serif',
        margin: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" sx={{
            textAlign: 'center',
            color: '#333',
            mb: 3,
          }}
        >
          Leave comments
        </Typography>

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

        <List sx={{ marginTop: '20px' }}>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                borderBottom: '1px solid #ddd',
                padding: '10px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ListItemText
                primary={<strong>{comment.email}</strong>}
                secondary={comment.content}
              />
              <Box
                sx={{
                  marginTop: '5px',
                }}
              >
                <Button
                  onClick={() => handleEdit(comment.id)}
                  sx={{
                    marginRight: '5px',
                    padding: '5px',
                    backgroundColor: '#888181',
                    color: 'white',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(comment.id)}
                  sx={{
                    padding: '5px',
                    backgroundColor: '#888181',
                    color: 'white',
                    borderRadius: '4px',
                    '&:hover': {
                      backgroundColor: 'black',
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default CommentsApp;