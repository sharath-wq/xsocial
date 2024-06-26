import { IConversations } from '../../entities/conversations';
import { IConversationRepository } from '../../interface/repository/conversation.repository';
import { GetBySenderAndReceiverIdUseCase } from '../../interface/use-case/conversation/get-by-senderid-and-receiverid.use-case';

export class GetBySenderAndReceiverId implements GetBySenderAndReceiverIdUseCase {
    conversationRepository: IConversationRepository;

    constructor(conversationRepository: IConversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    async execute(firstId: string, secondId: string): Promise<IConversations | null> {
        const existingConversation = await this.conversationRepository.getConversationByBothIds(firstId, secondId);

        if (!existingConversation) {
            const newConversation = await this.conversationRepository.create(firstId, secondId);
            return newConversation;
        }

        return existingConversation;
    }
}
