import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAccountHelper } from 'src/app/helpers/functions/user.helper';
import { IProfile } from 'src/app/interfaces/auth.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    userdata: any;
    selectedFile: File | undefined;
    loading: boolean = false;
    errorMessage: any;

    /**
     * This is used to set the preview of the selected image
     */
    imageSrc: string | undefined;
    profileForm;
    id: any;
    constructor(private activatedRoute: ActivatedRoute, private user: UserService, private fb: FormBuilder) {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log('id', this.id);

        if (!this.id) {
            /**
             * TODO:
             * No id found in params. Resort to the currently logged in user
             * If this is not found, redirect to login
             */
        } else {
            this.getUserData(this.id);
        }

        this.profileForm = this.fb.group({
            photo: [null],
        });
    }

    onFileSelected(event: any) {
        this.selectedFile = <File>event.target.files[0];
        this.previewImage();
        this.profileForm.patchValue({
            photo: this.selectedFile,
        });
        this.profileForm.get('photo')?.updateValueAndValidity();
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('photo', this.profileForm.get('photo')?.value);
        formData.append('_id', this.id);
        this.loading = true;
        this.errorMessage = '';

        /**
         * The form has the adSpaceImage as part of the object.
         * We need the remaining fields to populate.
         * That is why we are "deleting (removing)" the adSpaceImage from the "newdata"
         */
        // const newdata = this.profileForm.value;
        // delete newdata['photo'];
        // we form the ad_space_data by destructuring the "newdata" and adding the userid
        // const ad_space_data = {...newdata, userid: this.userid};

        // now we can append the ad_space data by converting it to a string
        // NOTE: FormData() ONLY accepts strings or Blob
        // the backend will handle converting it back to an object
        // formData.append('ad_space', JSON.stringify(ad_space_data));

        this.user.uploadProfilePicture(formData).subscribe((response) => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'profile photo added succesfully',
                showConfirmButton: false,
                timer: 1500,
            });
            
        }, (err)=> {
            Swal.fire({
                icon: 'error',
                title: `${err.error.message}`
            });
        });
    }

    /**
     * Preview the image selected to be uploaded
     */
    private previewImage() {
        const reader = new FileReader();
        if (this.selectedFile) {
            reader.readAsDataURL(this.selectedFile);
            reader.onload = () => {
                this.imageSrc = reader.result as string;
            };
        }
    }

    ngOnInit(): void {}

    getUserData(id: string) {
        this.user.getUserData(id).subscribe(
            (res) => {
                this.userdata = res.data;
                console.log('this.userdata', this.userdata);
            },
            (err) => {
                console.log(err.error.message);
            },
        );
    }

    fullName(data: any): string {
        const { firstName, otherNames, surname } = data || {};
        return new UserAccountHelper().getFullName({ firstName, otherNames, surname });
    }
}
