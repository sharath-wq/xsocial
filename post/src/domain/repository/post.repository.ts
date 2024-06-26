import {
    NotificationPostModel,
    PostBulkUpdateRequestModel,
    PostModel,
    PostRequestModel,
    PostUpdateModel,
} from '../entities/post';
import { PostRepository } from '../interfaces/repository/post.repository';
import { PostDataSource } from '../../data/interface/data-source/post-data-source';

export class PostRepositoryImpl implements PostRepository {
    postDataSource: PostDataSource;

    constructor(postDataSource: PostDataSource) {
        this.postDataSource = postDataSource;
    }

    async getPopularPosts(): Promise<[] | PostModel[]> {
        return await this.postDataSource.getPopularPosts();
    }

    async getBatchPost(postIds: string[]): Promise<[] | NotificationPostModel[]> {
        return await this.postDataSource.getBatchPost(postIds);
    }

    async findPostsByUserIdAndUpdate(userId: string, post: PostBulkUpdateRequestModel): Promise<void> {
        await this.postDataSource.updatePostsByUserId(userId, post);
    }

    async getSavedPosts(postIds: string[]): Promise<PostModel[] | []> {
        const results = await this.postDataSource.getSavedPosts(postIds);
        return results;
    }

    async getUserFeeds(userIds: string[]): Promise<[] | PostModel[]> {
        const result = await this.postDataSource.getUserFeed(userIds);
        return result;
    }

    async likePost(userId: string, postId: string): Promise<void> {
        const result = await this.postDataSource.likeAPost(userId, postId);
    }

    async dislikePost(userIndex: number, postId: string): Promise<void> {
        const result = await this.postDataSource.disLikeAPost(userIndex, postId);
    }

    async createPost(post: PostRequestModel, authorId: string): Promise<PostModel | null> {
        const result = await this.postDataSource.create(post, authorId);
        return result;
    }

    async updatePost(id: string, post: PostUpdateModel): Promise<PostModel | null> {
        const result = await this.postDataSource.updateOne(id, post);
        return result;
    }

    async getAllPosts(q: string): Promise<PostModel[] | []> {
        const result = await this.postDataSource.getAll(q);
        return result;
    }

    async deletePost(id: string): Promise<void> {
        await this.postDataSource.deleteOne(id);
    }

    async getOnePost(id: string): Promise<PostModel | null> {
        const result = await this.postDataSource.getOne(id);
        return result;
    }

    async getPostsByUser(authorId: string): Promise<PostModel[] | []> {
        const result = await this.postDataSource.findByAuthor(authorId);
        return result;
    }

    async getPostById(id: string): Promise<PostModel | null> {
        const result = await this.postDataSource.getPostById(id);
        return result;
    }
}
