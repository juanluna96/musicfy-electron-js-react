import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Image } from 'semantic-ui-react';
import firebase from '../../../db/Firebase'
import 'firebase/compat/storage'
import 'firebase/compat/auth'

const avatarUrl = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

const UploadAvatar = ({ user }) => {
    const [avatar, setAvatar] = useState(user.photoURL);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const storageRef = firebase.storage().ref(`/avatars/${file.name}`);
        const task = storageRef.put(file);
        task.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
            },
            (error) => {
                console.log(error);
            },
            () => {
                task.snapshot.ref.getDownloadURL().then(downloadURL => {
                    setAvatar(downloadURL);
                    firebase.auth().currentUser.updateProfile({
                        photoURL: downloadURL
                    }).then(() => {
                        toast.success("Avatar updated successfully");
                    }).catch(error => {
                        toast.error(error.message);
                    });
                });
            }
        )
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" { ...getRootProps() }>
            <input { ...getInputProps() } />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <div className="upload-avatar__image">
                        <Image src={ avatar ? avatar : avatarUrl } size="small" circular />
                    </div>
            }
        </div>
    )
}

export default UploadAvatar
