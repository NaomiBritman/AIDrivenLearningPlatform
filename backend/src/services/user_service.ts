import { User, IUser} from '../models/users';
export class UserService {
    async createUser(userData: IUser): Promise<IUser> {
        const user = new User(userData);
        await user.save();
        return await User.findOne({ id: userData.id }).select('-_id -__v').exec() as IUser;
    }
    
    async getAllUsers(): Promise<IUser[]> {
        return await User.find().select('-_id -__v').exec();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await User.findOne({ id }).select('-_id -__v').exec();
    }
}