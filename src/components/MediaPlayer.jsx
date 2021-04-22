import React, { useEffect } from 'react'

/**
 * @description use thic component for Media playing
 * @author jagannath
 * @date 22/04/2021
 * @param videoTrack:any
 * @param audioTrack:any
 */
const MediaPlayer = (props) => {
    const {videoTrack, audioTrack} = props;
    const container = React.useRef(null);

    useEffect(() => {
        if(!container.current) return;

        videoTrack?.play?.(container?.current)
        return () => {
            videoTrack?.stop?.()
        }
    }, [container, videoTrack])

    useEffect(()=>{
        audioTrack?.play?.();
        return ()=>{
            audioTrack?.stop?.()
        }
    },[audioTrack])


    return (
        // <div ref={container}  className="video-player" style={{ width: "320px", height: "240px"}}></div>
        <div ref={container}  className="video-player" style={{ width: "100%", height: "100%"}}></div>
    )
}

export default MediaPlayer
