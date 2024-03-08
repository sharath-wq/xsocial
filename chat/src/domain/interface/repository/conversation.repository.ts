import { IConversations } from '../../entities/conversations';

export interface IConversationRepository {
    create(senderId: string, receiverId: string): Promise<IConversations | null>;
    getConversationByUserId(userId: string): Promise<IConversations[] | []>;
    getConversationByBothIds(firstId: string, secondId: string): Promise<IConversations | null>;
}
