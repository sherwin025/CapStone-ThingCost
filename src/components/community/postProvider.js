import React, {createContext, useState} from "react";

export const UserPostContext = createContext()

export const UserPostProvider = (props) => {
    const [allposts, setallposts] = useState([])
    const [postcomments, setpostcomments] = useState([])

    const getallposts = () => {
        return fetch("http://localhost:8088/userPosts?_expand=user")
            .then(res => res.json())
            .then(setallposts)
    }

    const getallpostscomments = () => {
        return fetch("http://localhost:8088/userPostsComments?_expand=user")
            .then(res => res.json())
            .then(setpostcomments)
    }



    return ( 
        <UserPostContext.Provider value={{
            allposts, getallposts, postcomments, getallpostscomments
        }}>
            {props.children}
        </UserPostContext.Provider>
    )
}