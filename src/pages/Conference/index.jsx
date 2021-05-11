import React, { useEffect, useState } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import Host from './Host'
import Participant from './Participant'
import MediaPlayer from '../../components/MediaPlayer';
import useAgora from '../../hooks/useAgora';
import { APP_ID, TOKEN } from '../../lib/config';
import CallEndIcon from '@material-ui/icons/CallEnd';
import { IconButton } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

const queryString = require('query-string');

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

const Conference = (props) => {
    const query = queryString.parse(window?.location?.search)
    const token = query?.token || TOKEN;
    const {
        remoteUsers,
        join, 
        joinState, 
        leave,
        localAudioTrack, 
        localVideoTrack,
        removeLocalVideoTracks,
        removeLocalAudioTracks,
        joinLocalVideoTrack,
        joinLocalAudioTrack
    } = useAgora(client)
    const [localMedia, setLocalMedia] = useState({audio: false, video: false});
    const [gridSize, setGridSize] = useState()

    React.useEffect(()=>{
        setGridSize(()=>{
            const containerWidth = document.getElementById("large_video_container")?.offsetWidth;
            const containerHeight = document.getElementById("large_video_container")?.offsetHeight;
            const size = parseInt(containerWidth/(remoteUsers?.length||1) -5);
            if(containerHeight < size && remoteUsers?.length == 1){
                return parseInt(containerHeight)
            }
            return size
        })
        const options = {...localMedia}
        join(APP_ID, "Fanzly", token, null, options).then(res=>{
            // console.log(res);
        })
    },[])

    React.useEffect(()=>{
        setGridSize(()=>{
            const containerWidth = document.getElementById("large_video_container")?.offsetWidth;
            const containerHeight = document.getElementById("large_video_container")?.offsetHeight;
            const size = parseInt(containerWidth/(remoteUsers?.length||1) -5);
            if(containerHeight < size && remoteUsers?.length == 1){
                return parseInt(containerHeight)
            }
            return size
        })
    },[remoteUsers])

    const handleAudioClick = () => {
        if(!localMedia.audio){
            setLocalMedia(prev=>({...prev, audio: true}));
            joinLocalAudioTrack()
        }else{
            removeLocalAudioTracks();
            setLocalMedia(prev=>({...prev, audio: false}));
        }
    }

    const handleVideoClick = () => {
        if(!localMedia.video){
            setLocalMedia(prev=>({...prev, video: true}));
            joinLocalVideoTrack()
        }else{
            removeLocalVideoTracks();
            setLocalMedia(prev=>({...prev, video: false}));
        }
    }


    return (
        <React.Fragment>
            <div id="large_video_container" className="container row col-12 m-0 p-0 vh-100 vw-100 player-container d-flex justify-content-center">
                
                <div className="d-flex flex-wrap remote-player-wrapper">
                    {remoteUsers.map((user, index) => {
                            // console.log('user', user)
                            return (
                                <div id={`participant_grid_${index+1}`} className="participant participant_grid border" key={user.uid}>
                                    <Participant 
                                        videoTrack={user.videoTrack} 
                                        audioTrack={user.audioTrack}
                                    ></Participant>
                                </div>
                            )
                        })
                    }

                    {!remoteUsers?.length ? (
                        <div className="empty_room d-flex align-items-center text-muted">
                            <h2 className="empty_room_text">
                                You are the only one in the room!
                            </h2>
                        </div>
                    ):<></>}
                </div>
                <div className="local-player-wrapper ml-auto">
                    <Host client={client} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack}></Host>
                </div>

                <div className="controller_icons">
                    <IconButton 
                        className="p-2 m-2" 
                        onClick={handleAudioClick} 
                        style={{background: localMedia.audio ? "#4dcef7" : "#808080"}}>
                        {localMedia.audio ? (
                            <MicIcon color="primary" style={{color: '#fff'}}/>
                        ) : (
                            <MicOffIcon color="primary" style={{color: '#fff'}}/>
                        )}
                    </IconButton>
                    <IconButton 
                        onClick={handleVideoClick} 
                        className="p-2 m-2" 
                        style={{background: localMedia.video ? '#40ad40d9': "#808080"}}>
                        {localMedia.video ? (
                            <VideocamIcon style={{color: '#fff'}}/>
                        ) : (
                            <VideocamOffIcon style={{color: '#fff'}}/>
                        )}
                    </IconButton>
                    <IconButton onClick={leave} className="p-2 m-2" style={{background: 'red'}}>
                        <CallEndIcon style={{color: '#fff'}}/>
                    </IconButton>
                </div>

            </div>
            <style jsx="true">{`
                .local-player-wrapper{
                    height: 150px;
                    width: 150px;
                    position: absolute;
                    bottom: 0;
                    right: 10px;
                }
                .remote-player-wrapper{
                    height: calc(100vh - (70px + 40px + 60px));
                    width: 100%;
                    justify-content: center;
                    overflow: auto;
                }
                .participant_grid{
                    height: ${gridSize}px;
                    width: ${gridSize}px;
                    min-width: 20vw;
                    min-height: 20vw; 
                    // flex-grow: 1;
                    // height: ${document.getElementById("large_video_container")?.offsetWidth}px;
                }
                .controller_icons{
                    height: fit-content;
                    position: absolute;
                    bottom: 0;
                    display: flex;
                }
                .empty_room_text{
                    font-size: 2rem;
                }
            `}</style>
        </React.Fragment>
    )
}

export default Conference
