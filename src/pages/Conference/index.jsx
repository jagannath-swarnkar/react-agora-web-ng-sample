import React, { useEffect, useState } from 'react'
import AgoraRTC from "agora-rtc-sdk-ng"
import Host from './Host'
import Participant from './Participant'
import MediaPlayer from '../../components/MediaPlayer';
import useAgora from '../../hooks/useAgora';
import { APP_ID, TOKEN } from '../../lib/config';


const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

const Conference = (props) => {
    const {localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers} = useAgora(client)
    useEffect(()=>{
        // setClient(clientInst)
        // Join(APP_ID, "Fanzly", TOKEN);
        
    },[])
    // client.on('user-published', (user, userType)=>{
    //     console.log('onPublish', user)
    // })
    return (
        <React.Fragment>
            <div className="container row col-12 m-0 p-0 vh-100 vw-100 player-container">
                
                <div className="d-flex flex-wrap remote-player-wrapper">
                    {remoteUsers.map(user => {
                            console.log('user', user)
                            return (
                                <div className="participant p-2 participant_grid border" key={user.uid}>
                                    <Participant 
                                        videoTrack={user.videoTrack} 
                                        audioTrack={user.audioTrack}
                                    ></Participant>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="local-player-wrapper ml-auto">
                    <Host client={client}></Host>
                </div>

            </div>
            <style jsx="true">{`
                .local-player-wrapper{
                    height: 200px;
                    width: 200px;
                    position: sticky;
                    top: 0;
                }
                .remote-player-wrapper{
                    height: 100vh;
                    width: calc(100% - 200px);
                }
                .participant_grid{
                    height: ${parseInt(100 / (remoteUsers?.length || 1))}%;
                    width: ${parseInt(100 / (remoteUsers?.length || 1))}%;
                    min-width: 40vw;
                    min-height: 40vw;
                }
            `}</style>
        </React.Fragment>
    )
}

export default Conference
