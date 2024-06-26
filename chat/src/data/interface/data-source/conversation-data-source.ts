import { IConversations, IConversationsRes, IConversationsUpdate } from '../../../domain/entities/conversations';

export interface IConversationDataSource {
    create(senderId: string, receiverId: string): Promise<IConversationsRes | null>;
    getConversationByUserId(userId: string): Promise<IConversationsRes[] | []>;
    getConversationByBothIds(firstId: string, secondId: string): Promise<IConversationsRes | null>;
    update(cid: string, data: IConversationsUpdate): Promise<IConversationsRes | null>;
}
