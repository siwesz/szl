import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
  };

  const createPost = async (content) => {
    const { data, error } = await supabase
      .from('posts')
      .insert({ content, user_id: supabase.auth.user().id });
    if (error) console.error('Error creating post:', error);
    else fetchPosts(); // Refresh posts after creating
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Render your posts here

  return (
    // JSX for rendering posts and a form for creating new posts
  );
};

export default Posts;