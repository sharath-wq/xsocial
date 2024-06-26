import { UpdateUserRequstModel, UserResponseModel } from '../../../entities/user';

export interface UpdateUserUseCase {
    execute(id: string, data: UpdateUserRequstModel): Promise<UserResponseModel | null>;
}
