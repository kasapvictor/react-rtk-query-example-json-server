import { useState } from 'react';
import { useImmer } from 'use-immer';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemText, Select, MenuItem, FormControl, InputLabel, TextField, FormGroup, Button } from '@mui/material';

import { useGetPostsQuery, useAppPostMutation, useDeleteProductMutation } from '@app/api';

import { postProps } from './types';

const capitalize = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1);
};

const initialStateNewPost = {
  done: false,
  body: '',
  title: '',
  userId: 1,
};

export const Posts = () => {
  const [count, setCount] = useState(0);
  const [newPost, setNewPost] = useImmer(initialStateNewPost);
  const [deleteProduct] = useDeleteProductMutation();

  // @ts-ignore
  const { data = [], error, status, isError, isLoading } = useGetPostsQuery(count);

  // @ts-ignore
  const [addPost, { isLoading: isLoadingAdd, isError: isErrorAdd }] = useAppPostMutation();

  // @ts-ignore
  const handleAddPostData = (e) => {
    const { name, value } = e.target;

    setNewPost((draft) => {
      // @ts-ignore
      draft[name] = value.trim();
      // @ts-ignore
      draft.done = !!draft.title && !!draft.body;
    });
  };

  const handleAddPost = async () => {
    const { done, ...newPostData } = newPost;

    if (done) {
      await addPost({ ...newPostData }).unwrap();

      setNewPost((draft) => {
        draft.done = false;
        draft.title = '';
        draft.body = '';
      });

      toast.success(`New post added "${newPost.title}"`, { theme: 'dark', type: 'success' });

      // eslint-disable-next-line no-console
      console.log('isLoadingAdd', isLoadingAdd);
      // eslint-disable-next-line no-console
      console.log('isErrorAdd', isErrorAdd);
    }

    if (!done) {
      toast.success(`Empty data for new post`, { theme: 'dark', type: 'error' });
    }
  };

  // eslint-disable-next-line no-console
  console.log('isError', isError);

  // @ts-ignore
  const handleSelect = (e) => {
    const { value } = e.target;
    setCount(value);
  };

  // @ts-ignore
  const handleDeletePost = (data) => () => {
    const { id, title } = data;

    deleteProduct(id);
    toast.success(`Post ${title} deleted`, { theme: 'dark', type: 'info' });
  };

  return (
    <>
      {isLoading && <Typography variant="h4">Loading ...</Typography>}

      {status === 'fulfilled' && (
        <>
          <FormGroup sx={{ width: 620, mb: 5, '& .MuiTextField-root': { m: 1 } }}>
            <FormControl>
              <TextField id="post-title" label="Title" name="title" value={newPost.title} onChange={handleAddPostData} />
            </FormControl>
            <FormControl>
              <TextField id="post-body" label="Body" multiline rows={4} name="body" value={newPost.body} onChange={handleAddPostData} />
            </FormControl>
            <FormControl>
              <Button type="submit" variant="contained" onClick={handleAddPost} sx={{ py: 2 }}>
                Add new post
              </Button>
            </FormControl>
          </FormGroup>

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="view-count">Count</InputLabel>
            <Select labelId="view-count" id="view-count" value={count} label="Count" onChange={handleSelect}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <List>
            {data.map((post: postProps) => (
              <ListItem key={post.id}>
                {/* @ts-ignore */}
                <ListItemText>{capitalize(post.title)}</ListItemText>
                <Button type="button" variant="outlined" onClick={handleDeletePost({ id: post.id, title: post.title })}>
                  Delete Post
                </Button>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* @ts-ignore */}
      {status === 'rejected' && <Typography variant="body2">{error}</Typography>}
    </>
  );
};
