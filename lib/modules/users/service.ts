import { IUser } from './model';
import users from './schema';
import { Types } from 'mongoose';

export default class UserService {
    public async register(user_params:IUser): Promise<IUser> {
        try {
            const session = new users(user_params);
            return await session.save();
        }catch(error) {
            throw error;
        }
    }

    public async filterUser(query: any): Promise<IUser | null> {
        try {
            return await users.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async updateUser(user_params: IUser): Promise<void> {
        try {
            const query = { _id: user_params._id };
            await users.findOneAndUpdate(query, user_params);
        } catch (error) {
            throw error;
        }
    }

    public async deleteUser(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await users.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async addPlaceToUser(userId: Types.ObjectId, placeId: Types.ObjectId): Promise<void> {
        try {
            // Retrieve the user document by ID
            const user = await users.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Add the post ID to the user's array of posts
            user.places.push(placeId);

            // Save the updated user document
            await user.save();
        } catch (error) {
            throw error;
        }
    }

    public async addReviewToUser(userId: Types.ObjectId, reviewId: Types.ObjectId): Promise<void> {
        try {
            // Retrieve the user document by ID
            const user = await users.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Add the post ID to the user's array of posts
            user.reviews.push(reviewId);

            // Save the updated user document
            await user.save();
        } catch (error) {
            throw error;
        }
    }

}