import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

class ShowUserProfileUseCase {
    constructor(private usersRepository: IUsersRepository) {
        //
    }

    validateUserExists(user_id: string): boolean {
        const user = this.usersRepository.findById(user_id);

        if (!user) {
            return false;
        }

        return true;
    }

    execute({ user_id }: IRequest): User {
        const user = this.usersRepository.findById(user_id);

        if (!user) {
            throw new Error("User Does not Exists!");
        }

        return user;
    }
}

export { ShowUserProfileUseCase };
