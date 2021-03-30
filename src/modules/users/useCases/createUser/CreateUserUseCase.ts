import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {
        //
    }

    // Validação de email já em uso para ser usado no Controller!
    validateUserEmailinUse(email: string): boolean {
        const userEmailAlreadyExists = this.usersRepository.findByEmail(email);

        if (userEmailAlreadyExists) {
            return false;
        }

        return true;
    }

    execute({ email, name }: IRequest): User {
        const userEmailAlreadyExists = this.usersRepository.findByEmail(email);

        if (userEmailAlreadyExists) {
            throw new Error("User Email Already Exists!");
        }

        return this.usersRepository.create({ name, email });
    }
}

export { CreateUserUseCase };
