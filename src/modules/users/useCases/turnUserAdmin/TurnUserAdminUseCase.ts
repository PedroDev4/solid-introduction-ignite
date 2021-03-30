import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

// O que iremos receber da nossa requisição
interface IRequest {
    user_id: string;
}

class TurnUserAdminUseCase {
    constructor(private usersRepository: IUsersRepository) {
        //
    }

    validateUserExists(user_id: string): boolean {
        const userExists = this.usersRepository.findById(user_id);

        if (!userExists) {
            return false;
        }

        return true;
    }

    execute({ user_id }: IRequest): User {
        const user = this.usersRepository.findById(user_id);
        this.usersRepository.turnAdmin(user);
        return user;
    }
}

export { TurnUserAdminUseCase };
