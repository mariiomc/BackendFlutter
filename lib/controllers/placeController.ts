import { Request, Response } from 'express';
import { IPlace } from '../modules/places/model';
import PlaceService from '../modules/places/service';
import UserService from '../modules/users/service';
import e = require('express');

export class PlaceController {

    private place_service: PlaceService = new PlaceService();
    private user_service: UserService = new UserService();

    public async createPlace(req: Request, res: Response) {
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.title && req.body.content && req.body.author && req.body.rating && req.body.cords
                && req.body.photo && req.body.location && req.body.type && req.body.schedule
                && req.body.date){
                const place_params:IPlace = {
                    title: req.body.title,
                    content: req.body.content,
                    author: req.body.author,
                    rating: req.body.rating,
                    coords: req.body.cords,
                    photo: req.body.photo,
                    location: req.body.location,
                    type: req.body.type,
                    schedule: req.body.schedule,
                    date: req.body.date
                };
                const place_data = await this.place_service.createPlace(place_params);
                 // Now, you may want to add the created post's ID to the user's array of posts
                await this.user_service.addPlaceToUser(req.body.author, place_data._id); //
                return res.status(201).json({ message: 'Post created successfully', place: place_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getPlace(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const place_filter = { _id: req.params.id };
                // Fetch user
                const place_data = await this.place_service.filterPlace(place_filter);
                // Send success response
                return res.status(200).json({ data: place_data, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deletePlace(req: Request, res: Response) {
        try {
            if (req.params.id) {
                // Delete post
                const delete_details = await this.place_service.deletePlace(req.params.id);
                if (delete_details.deletedCount !== 0) {
                    // Send success response if user deleted
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'Post not found' });
                }
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing Id' });
            }
        } catch (error) {
            // Catch and handle any errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}