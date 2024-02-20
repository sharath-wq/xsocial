import { PostModel, PostRequestModel } from '../../../domain/entities/post';
import { PostDataSource } from '../../interface/data-source/post-data-source';

import { Post } from './schema/post.schema';

export class MongoDBPostDataSource implements PostDataSource {
    async likeAPost(userId: string, postId: string): Promise<void> {
        try {
            const post = await Post.findById(postId);
            if (post) {
                post.likes.push(userId);
                await post.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async disLikeAPost(userIndex: number, postId: string): Promise<void> {
        try {
            const post = await Post.findById(postId);
            if (post) {
                post.likes.splice(userIndex, 1);
                await post.save();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async findByAuthor(authorId: string): Promise<PostModel[] | []> {
        try {
            const results = await Post.find({});
            const userPosts = results.filter((item: any) => item.author.userId === authorId);
            if (userPosts && userPosts.length) {
                return userPosts.map((item) => ({
                    id: item.id,
                    author: {
                        userId: item.author!.userId!,
                        username: item.author!.username!,
                        imageUrl: item.author!.imageUrl!,
                    },
                    caption: item.caption,
                    tags: item.tags,
                    imageUrls: item.imageUrls,
                    likes: item.likes,
                    comments: item.comments,
                    createdAt: item.createdAt,
                }));
            }

            return [];
        } catch (error) {
            console.error('Error finding Posts by author', error);
            throw error;
        }
    }

    async updateOne(id: string, post: PostRequestModel): Promise<PostModel | null> {
        try {
            const result = await Post.findByIdAndUpdate(id, post);

            if (result) {
                return {
                    id: result.id,
                    author: {
                        userId: result.author!.userId!,
                        username: result.author!.username!,
                        imageUrl: result.author!.imageUrl!,
                    },
                    caption: result.caption,
                    tags: result.tags,
                    imageUrls: result.imageUrls,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error updating Post', error);
            return null;
        }
    }

    async create(post: PostRequestModel, authorId: string): Promise<PostModel | null> {
        try {
            const result = await Post.create({
                authorId: authorId,
                ...post,
            });
            if (result) {
                return {
                    id: result.id,
                    author: {
                        userId: result.author!.userId!,
                        username: result.author!.username!,
                        imageUrl: result.author!.imageUrl!,
                    },
                    caption: result.caption,
                    tags: result.tags,
                    imageUrls: result.imageUrls,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error creating Post', error);
            return null;
        }
    }

    async getAll(): Promise<PostModel[] | []> {
        try {
            const result = await Post.find({});

            return result.map((item) => ({
                id: item.id,
                author: {
                    userId: item.author!.userId!,
                    username: item.author!.username!,
                    imageUrl: item.author!.imageUrl!,
                },
                caption: item.caption,
                tags: item.tags,
                imageUrls: item.imageUrls,
                likes: item.likes,
                comments: item.comments,
                createdAt: item.createdAt,
            }));
        } catch (error) {
            console.error('Error getting Post', error);
            return [];
        }
    }

    async deleteOne(id: string): Promise<void> {
        try {
            await Post.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting Post', error);
            throw error;
        }
    }

    async getPostById(id: string): Promise<PostModel | null> {
        try {
            const result = await Post.findById(id);

            if (result) {
                return {
                    id: result.id,
                    author: {
                        userId: result.author!.userId!,
                        username: result.author!.username!,
                        imageUrl: result.author!.imageUrl!,
                    },
                    caption: result.caption,
                    tags: result.tags,
                    imageUrls: result.imageUrls,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting Post', error);
            throw error;
        }
    }

    async getOne(id: string): Promise<PostModel | null> {
        try {
            const result = await Post.findById(id);

            if (result) {
                return {
                    id: result.id,
                    author: {
                        userId: result.author!.userId!,
                        username: result.author!.username!,
                        imageUrl: result.author!.imageUrl!,
                    },
                    caption: result.caption,
                    tags: result.tags,
                    imageUrls: result.imageUrls,
                    likes: result.likes,
                    comments: result.comments,
                    createdAt: result.createdAt,
                };
            }

            return null;
        } catch (error) {
            console.error('Error getting Post', error);
            throw error;
        }
    }
}
