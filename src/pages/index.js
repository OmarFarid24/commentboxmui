import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CommentForm from '@/pages/commentform.js';
import CommentsList from '@/pages/commentlist.js';

const CommentsApp = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(savedComments);
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  };

  const handleEditComment = (id, newContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === id ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
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
          Leave comments:
        </Typography>
        
        <CommentForm onAddComment={handleAddComment} />
        <CommentsList 
          comments={comments} 
          onDelete={handleDeleteComment} 
          onEdit={handleEditComment} 
        />
      </Container>
    </Box>
  );
};

export default CommentsApp;