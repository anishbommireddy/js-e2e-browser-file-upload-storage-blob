import React from 'react'
const VideoEmbed = (props : any) => (
    <div>
        <video src = {props.blobItem} controls height = "300px" width = "200px" />
    </div>
)
export default VideoEmbed;