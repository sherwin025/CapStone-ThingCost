import React, { useEffect, useState } from "react"
import { UserContext } from "../profile/UserProvider"
import { useContext } from "react/cjs/react.development"
import { UserPostContext } from "./postProvider"
import "./community.css"
export const Community = () => {
    const { getUsers, users } = useContext(UserContext)
    const { allposts, getallposts, getallpostscomments, postcomments } = useContext(UserPostContext)
    const [searchuser, setsearchuser] = useState(false)
    const [usersearch, setusersearch] = useState("")
    const [searchitem, setsearchitem] = useState(false)
    const [postsearch, setpostsearch] = useState("")
    const [newpost, setnewpost] = useState(false)
    const [newpostcontent, setnewpostcontent] = useState("")
    const [viewcomments, setviewcomments] = useState(false)
    const [commentid, setcommentid] = useState(0)
    const [newcomment, setnewcomment] = useState(false)
    const [newcommentcontent, setnewcommentcontent] = useState("")
    const [currentuser, setcurrentuser] = useState(0)

    useEffect(() => {
        getUsers()
            .then(getallposts)
            .then(getallpostscomments)
            .then(setcurrentuser(parseInt(localStorage.getItem("ThingCost_customer"))))
    }, [])

    const numberofuserpost = (userid) => {
        const userpost = allposts.filter(each => each.userId === parseInt(userid))
        return userpost.length
    }

    const userlists = () => {
        if (usersearch !== "") {
            const filteredusers = users.filter(item => item.name.toLowerCase().includes(usersearch))
            return filteredusers
        } else {
            return users
        }
    }

    const postlists = () => {
        if (postsearch !== "") {
            const filteredusers = allposts.filter(item => item.post.toLowerCase().includes(postsearch) || item.user.name.toLowerCase().includes(postsearch))
            const filteredposts = filteredusers.reverse()
            return filteredposts
        } else {
            const copy = [...allposts]
            const reversepost = copy.reverse()
            return reversepost
        }
    }

    const handleToggle = () => {
        searchuser ? setsearchuser(false) : setsearchuser(true)
        setusersearch("")
    }

    const handleToggle2 = () => {
        searchitem ? setsearchitem(false) : setsearchitem(true)
        setpostsearch("")
    }

    const handleToggle3 = () => {
        newpost ? setnewpost(false) : setnewpost(true)
    }

    const handleToggle4 = (each) => {
        viewcomments ? setviewcomments(false) : setviewcomments(true)
        setcommentid(parseInt(each))
    }

    const handleToggle5 = () => {
        setnewcomment(true)
        setviewcomments(false)
    }

    const posttoapi = () => {
        const objectposted = {
            "userId": parseInt(localStorage.getItem("ThingCost_customer")),
            "post": newpostcontent
        }
        if (newpostcontent !== "") {
            return fetch("http://localhost:8088/userPosts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objectposted)
            })
                .then(res => res.json())
                .then(getallposts)
                .then(setnewpost(false))
        } else {
            window.alert("Post cannot be empty")
        }
    }

    const postcommenttoapi = () => {
        const objectposted = {
            "userId": parseInt(localStorage.getItem("ThingCost_customer")),
            "comment": newcommentcontent,
            "userPostsId": commentid
        }

        if (newcommentcontent !== "") {
            return fetch("http://localhost:8088/userPostsComments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objectposted)
            })
                .then(res => res.json())
                .then(getallposts)
                .then(getallpostscomments)
                .then(setnewcomment(false))
        } else {
            window.alert("Comment cannot be empty")
        }
    }

    const filteredComments = (id) => {
        const constfilteredcomments = postcomments.filter(each => each.userPostsId === parseInt(id))
        return constfilteredcomments
    }

    const Viewcommentbutton = (id) => {
        return (<>
            {
                viewcomments ?
                    <div className="popup">
                        <div className="popup-inner">
                            <div className="div1">
                                <div><button className="close-btn" onClick={() => setviewcomments(false)}>close</button></div>
                                <div className="div2">
                                    {
                                        filteredComments(id).map(each => <div><div>{each.comment} {each.userId === parseInt(localStorage.getItem("ThingCost_customer")) ? <button onClick={() => deleteComment(each.id)}>x</button> : ""} </div><div>sent by {each.user.name}</div></div>)
                                    }
                                </div>
                            </div>
                            <button onClick={handleToggle5} >New Comment</button>
                        </div>
                    </div> : ""
            }
        </>)
    }

    const Popup = () => {
        return (<>
            {
                newpost ?
                    <div className="popup">
                        <div className="popup-inner">
                            <div className="div1">
                                <div><button className="close-btn" onClick={() => setnewpost(false)}>close</button></div>
                                <div className="div2">New Post:
                                    <div><input className="newpostfield" type="text"
                                        placeholder="whats on your mind"
                                        onChange={(event) => setnewpostcontent(event.target.value)}
                                    ></input> </div>
                                </div>
                            </div>
                            <button onClick={posttoapi}>Post</button>
                        </div>
                    </div> : ""
            }
        </>)
    }

    const anewcomment = () => {
        return (<>
            {
                newcomment ?
                    <div className="popup">
                        <div className="popup-inner">
                            <div className="div1">
                                <div><button className="close-btn" onClick={() => setnewcomment(false)}>close</button></div>
                                <div className="div2">New comment
                                    <div><input className="newpostfield" type="text"
                                        placeholder="whats on your mind"
                                        onChange={(event) => setnewcommentcontent(event.target.value)}
                                    ></input> </div>
                                </div>
                            </div>
                            <button onClick={postcommenttoapi}>Post</button>
                        </div>
                    </div> : ""
            }
        </>)
    }

    const deleteComment = (id) => {
        return fetch(`http://localhost:8088/userPostsComments/${id}`, {
            method: "DELETE"
        })
            .then(getallpostscomments)
    }

    const deletePost = (id) => {
        return fetch(`http://localhost:8088/userPosts/${id}`, {
            method: "DELETE"
        })
            .then(
                () => {
                    for (const comment of postcomments){
                        if (comment.userPostsId === id){
                            return fetch(`http://localhost:8088/userPostsComments/${comment.id}`, {
                            method: "DELETE"
                        })
                        }
                    }
                })
            .then(getallposts)
    }


    return (
        <>
            <div className="communitycontainer">
                <div className="userlist">
                    <div className="usertitle"> Users</div>
                    <button onClick={handleToggle}>Search users</button>
                    {
                        searchuser ?
                            <div><input className="input-field searchterfield" type="text"
                                placeholder="search user names"
                                id="name"
                                onChange={(event) => setusersearch(event.target.value.toLowerCase())}
                            ></input> </div>
                            :
                            ""
                    }
                    {
                        userlists().map((each) => {
                            return <div key={each.id}
                                className="userCard">
                                <div className="userinfo">{each.name}</div>
                                <div className="userinfo">Posts: {numberofuserpost(each.id)} </div>
                            </div>
                        })
                    }
                </div>
                <div className="postlist">
                    <div className="usertitle">Community Posts</div>
                    <div className="postbutton">
                        <button onClick={handleToggle3}>New Post</button>
                        <button onClick={handleToggle2}>Search Posts</button>
                        {
                            searchitem ?
                                <div><input className="input-field searchterfield" type="text"
                                    placeholder="input search terms"
                                    id="name"
                                    onChange={(event) => setpostsearch(event.target.value.toLowerCase())}
                                ></input> </div>
                                :
                                ""
                        }
                    </div>
                    {
                        postlists().map((each) => {
                            return <div key={each.id}
                                className="postCard">
                                {
                                    currentuser === each.user.id ? <button onClick={()=>{deletePost(each.id)}}>x</button> : ""
                                }
                                <div className="postcontent">{each.post}</div>
                                <div>
                                    <button onClick={() => { handleToggle4(each.id) }}>view comments</button>
                                    <button onClick={handleToggle5}>comment</button>
                                </div>
                                <div className="postedname">
                                    posted by {each.user.name}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            {
                Popup()
            }
            {
                Viewcommentbutton(commentid)
            }
            {
                anewcomment()
            }
        </>
    )
}
