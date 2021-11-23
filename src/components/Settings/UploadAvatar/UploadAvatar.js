import React, { useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react'

const avatarUrl = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

const UploadAvatar = ({ user }) => {
    const [avatar, setAvatar] = useState(user.photoURL);
    return (
        <div className="upload-avatar">
            <Image src={ avatar ? avatar : avatarUrl } size="small" circular />
        </div>
    )
}

export default UploadAvatar
