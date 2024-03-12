import { IPlace } from './model';
import places from './schema';

export default class PostService {
    
    public async createPlace(post_params: IPlace): Promise<IPlace> {
        try {
            const session = new places(post_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterPlace(query: any): Promise<IPlace | null> {
        try {
            return await places.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async deletePlace(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await places.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }
}