import React from 'react'
import Conference from './Conference'

const Home = () => {
    console.log('Conference',Conference)
    return (
        <>
        <div id="Home">
            <div className="chat_cont">
                <div className="header font-weight-bold text-center d-flex align-items-center justify-content-center text-white">
                    Main Header
                </div>
                <div className="col-12 d-flex m-0 p-0">
                    <div id="user_list">
                        Sidebar | Userslist
                    </div>
                    <div id="chat_window">
                        <div className="chat_header font-weight-bold text-center d-flex align-items-center justify-content-center">
                            Chat Header
                        </div>
                        <Conference ></Conference>
                        <div className="chat_input_container">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style jsx="true">{`
            #user_list{
                width: 30%;
                background: whitesmoke;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            #chat_window{
                width: -webkit-fill-available;
                min-width: 800px;
            }
            .chat_cont{
                height: 100vh;
            }
            .header {
                height: 70px;
                width: 100%;
                background: deeppink;
            }
            .chat_header{
                height: 60px;
                background: whitesmoke;
            }
            .chat_input_container{
                height: 40px;
                background: whitesmoke;
            }
        `}</style>
        </>
    )
}

export default Home
