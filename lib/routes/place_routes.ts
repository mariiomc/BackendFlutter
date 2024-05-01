import { Application, Request, Response, NextFunction } from 'express';
import { PlaceController } from '../controllers/placeController';
import  {authJWT}  from '../middlewares/authJWT';


export class PlaceRoutes {

    private place_controller: PlaceController = new PlaceController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        app.post('/place', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    console.log("Error: " + err)
                    return next(err); // Short-circuit if token verification fails
                }
                this.place_controller.create_place(req, res);
                
            });
        });

        app.get('/place/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.place_controller.get_place(req, res);
            });
        });

        app.get('/place', (req: Request, res: Response, next: NextFunction) => {
            console.log("getPlace")
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.place_controller.get_places(req, res);
            });
            
    

        });

        app.get('/place/admin', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isAdmin(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isAdmin check fails
                    }
                    this.place_controller.get_places_even_deactivated(req, res);
                });
            });
        });

        // Update place by ID
        app.put('/place/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isOwner(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isOwner check fails
                    }
                    this.place_controller.update_place(req, res);
                }, 'Place');
            });
        });

        // Delete place by ID
        app.delete('/place/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isOwner(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isOwner check fails
                    }
                    this.place_controller.deactivate_place(req, res);
                }, 'Place');
            });
        });

    }
}