export interface IUserInformation {
    jwt: string | null;
}
export class UserInformation implements IUserInformation {
    constructor(
        public jwt: string | null = null
    ) { }
}
