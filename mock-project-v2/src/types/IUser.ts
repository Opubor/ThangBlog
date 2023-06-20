import { IProfile } from "."

export interface IUser extends IProfile {
   token: string
}
