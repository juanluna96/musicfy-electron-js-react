import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Image } from 'semantic-ui-react';
import firebase from '../../../db/Firebase'
import 'firebase/compat/storage'
import 'firebase/compat/auth'

const avatarUrl = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

const UploadAvatar = ({ user, setReloadApp }) => {
    const [avatar, setAvatar] = useState(user.photoURL);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setAvatar(URL.createObjectURL(file));
        uploadImage(file);
    }, []);

    const uploadImage = file => {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`avatars/${user.uid}`).put(file);
        uploadTask.on('state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            error => {
                console.log(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    user.updateProfile({
                        photoURL: downloadURL
                    }).then(() => {
                        setAvatar(downloadURL);
                        setReloadApp(prevState => !prevState);
                        toast.success('Avatar subido correctamente');
                    }).catch(err => {
                        toast.error(err.message);
                    })
                })
            }
        )
    }

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
                    <p>Arrastra la foto aqui ...</p> :
                    <div className="upload-avatar__image">
                        <Image src={ avatar ? avatar : avatarUrl } size="small" cicular="true" />
                    </div>
            }
        </div>
    )
}

export default UploadAvatar
