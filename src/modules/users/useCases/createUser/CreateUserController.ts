import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {
        //
    }

    handle(request: Request, response: Response): Response {
        const { name, email } = request.body;

        const validateEmailinuse = this.createUserUseCase.validateUserEmailinUse(
            email
        );

        if (!validateEmailinuse) {
            return response
                .status(400)
                .json({ error: "User email is already in use" });
        }

        const user = this.createUserUseCase.execute({ name, email });

        return response.status(201).json(user);
    }
}

export { CreateUserController };
