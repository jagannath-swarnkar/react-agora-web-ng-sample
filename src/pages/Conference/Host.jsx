import React, { useEffect } from 'react'
import MediaPlayer from '../../components/MediaPlayer';
import useAgora from '../../hooks/useAgora'
import { APP_ID, TOKEN } from '../../lib/config';
import CallEndIcon from '@material-ui/icons/CallEnd';
import { IconButton } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
const queryString = require('query-string');

const Host = (props) => {
    const query = queryString.parse(window?.location?.search)
    const {client} = props;
    const token = query?.token || TOKEN;
    const {
        localAudioTrack, 
        localVideoTrack,
        join, 
        joinState, 
        leave
    } = useAgora(client);
    
    useEffect(()=>{
        handleClickHost() 
    },[]);


    const handleClickHost = async() => {
        join(APP_ID, "Fanzly", token).then(res=>{
            console.log(res)
        })


    }
    return (
        <React.Fragment>

            <div className="border h-100">
                <MediaPlayer
                    audoTrack={localAudioTrack}
                    videoTrack={localVideoTrack}
                ></MediaPlayer>
            </div>
            <IconButton disabled className="p-2 m-2" style={{background: "#4dcef7"}}>
                <MicIcon disabled color="primary" style={{color: '#fff'}}/>
            </IconButton>
            <IconButton onClick={handleClickHost} className="p-2 m-2" style={{background: '#40ad40d9'}}>
                <CallIcon style={{color: '#fff'}}/>
            </IconButton>
            <IconButton onClick={leave} className="p-2 m-2" style={{background: 'red'}}>
                <CallEndIcon style={{color: '#fff'}}/>
            </IconButton>
        </React.Fragment>
    )
}

export default Host
