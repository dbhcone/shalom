import { NextFunction, Request, Response } from 'express';
import Account from '../models/account.model';
import Users from '../models/user.model';
import { mongoidValidation } from '../validators/shared.validations';
// import config from 'config';
// import fs from 'fs';

// import { Dropbox, files } from 'dropbox';

const GetUserDetails = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        const validation = await mongoidValidation.validateAsync(data);

        const useraccount = await Account.findById(data._id);

        if (!useraccount) {
            return res.status(404).json({ error: 'User does not exist', code: 404, status: 'error' });
        }

        /**
         * TODO: return user data except password
         */

        return res.status(200).json({ status: 'ok', message: 'User data fetched successfully', data: useraccount });
    } catch (error) {
        return res.status(404).json({ error: error.message, code: 404, status: 'error' });
    }
};

const UploadProfilePhoto = async (req: any, res: Response, next: NextFunction) => {
    try {
        const validation = await mongoidValidation.validateAsync(req.body);
        
        if (!req.file) {
            console.log('no file at the moment');
            return res.status(400).json({ message: 'Select a file to be uploaded', status: 'error', code: 400 });
        } else {
            const { buffer, ...fileOtherDetails } = req.file;
            console.log('we have a file excl. buffer', fileOtherDetails);

            // find the account
            const account = await Account.findById(req.body._id);

            if (!account) {
                return res.status(404).json({message: "Account does not exist", status: 'error', code: 404})
            }

            const updateProfile = await Users.findOneAndUpdate({accountOwner: account._id}, {$set : {profilePhoto: {...fileOtherDetails}}});

            if (!updateProfile) {
                return res.status(404).json({message: "Could not find user to update", status: 'error', code: 404})
            }

            return res.status(200).json({data: updateProfile, status: 'ok', code: 200, message: 'Profile photo updated successfully'})

            //#region ========== Dropbox upload (TODO) ===========
            /*
        try {
            const accessToken = <string>config.get('DROPBOX_ACCESS_TOKEN');
            const clientSecret = <string>config.get('DROPBOX_APP_SECRET');
            const dbx = new Dropbox({ accessToken, clientSecret });
            let upload = await dbx.filesUpload({
                path: `/${req.file.filename}`,
                mute: false,
                strict_conflict: false,
                autorename: false,
            });
            return res.status(201).json({ code: 201, data: upload, message: 'Upload successful' });
        } catch (error) {
            // console.log(error.code);
            return res.status(404).json({ status: 'error', message: error.message, code: 404 });
        }
        */
            //#endregion
        }
    } catch (error) {
        return res.status(404).json({ status: 'error', message: error.message, code: 404 });
    }
};

export { GetUserDetails, UploadProfilePhoto };
