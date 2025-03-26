import React from 'react';
import { List, ListItem, ListItemText, Box, Button } from '@mui/material';

const CommentsList = ({ comments, onDelete, onEdit }) => {
  const handleEdit = (id, currentContent) => {
    const newContent = prompt('Edit your comment:', currentContent);
    if (newContent) {
      onEdit(id, newContent);
    }
  };

  return (
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
              onClick={() => handleEdit(comment.id, comment.content)}
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
              onClick={() => onDelete(comment.id)}
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
  );
};

export default CommentsList;