'use client';

import Post from '@/components/post/Post';
import { Suggetions } from '@/components/user-suggetions/Suggetions';
import React from 'react';

import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { PostData } from '@/types/post';

const Home = async () => {
    const [posts, setPosts] = useState<PostData[]>();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('/api/posts/');
                setPosts(data);
            } catch (e) {
                const error = e as AxiosError;
            }
        })();
    }, []);

    return (
        <div className='w-full flex flex-col gap-10 sm:flex-row'>
            <div className='w-full sm:w-1/2 flex flex-col gap-10'>
                {posts && posts.map((post: PostData) => <Post {...post} />)}
            </div>

            <div className='hidden sm:block p-4'>
                <Suggetions />
            </div>
        </div>
    );
};

export default Home;
