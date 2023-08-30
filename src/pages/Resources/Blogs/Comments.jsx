import React, { useEffect, useState } from 'react'
import './Comments.css'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
const Comments = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePicture, setProfilePicture] = useState('');
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const location = useLocation()
    const [commentauthor, setCommentauthor] = useState("")
    const [commentpic, setCommentpic] = useState("")
    const [instruction, setInstruction] = useState(true)
    const [commentslist, setCommentslist] = useState([]);
    const [disable, setDisable] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [isComment,setIsComment] = useState(false)
    const currentURL = decodeURIComponent(location.pathname);
    const postId = currentURL.split('/blog/')[1];
    // console.log(postId);

    const handleLoginPage = () => {
        navigate("/login")
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_REACT_APP_FETCHPROFILE, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setProfilePicture(response.data.userimg);
                setCommentpic(response.data.userimg);
                setName(response.data.name)
                setCommentauthor(response.data.name)
                setIsLoggedIn(true);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (localStorage.getItem('token')) {
            fetchUserProfile();
        }
    }, []);

    const isCommentFilled = () => {
        return (
            comment !== "" && commentpic !== "" && commentauthor !== ""
        )
    }

    /* Add comment button onClick function*/
    const handleComment = async (e) => {
        e.preventDefault()

        if (!token) {
            navigate("/login")
            return
        }

        setDisable(true)
        setSubmit(true)
        try {
            const response = await axios.get(import.meta.env.VITE_REACT_APP_ACCEPTEDBLOGS_RENDER);
            const publishedBlogIds = response.data.map(blog => blog._id);
            // console.log(publishedBlogIds)
            if (!publishedBlogIds.includes(postId)) {
                alert("Blog needs to be published to add comment.");
                return
            }
            setComment('');
        } catch (error) {
            console.log('Error fetching blogs:', error);
        } finally {
            setDisable(false)
            setSubmit(false)
            setComment('');
        }

        setDisable(true)
        setSubmit(true)
        try {
            const response = await axios.post(
                // `http://localhost:2226/api/comment/${postId}`,
                `${import.meta.env.VITE_REACT_APP_APIMAIN}/api/comment/${postId}`,
                { text: comment, commentauthor: commentauthor, commentpic: commentpic },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setComment('');
            alert('Comment added!');
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Something went wrong');
            setComment('');
        } finally {
            setDisable(false)
            setSubmit(false)
        }
    }

    const handleCancel = () => {
        setComment("")
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const handleCommentAuthorChange = (event) => {
        setCommentauthor(event.target.value)
    }

    const handleCommentAuthorPic = (event) => {
        setCommentpic(event.target.value)
    }

    /* fetching comments to display */
    useEffect(() => {
        const fetchComments = async () => {
            try {
                // const response = await axios.get(`http://localhost:2226/api/comment/${postId}`, {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_APIMAIN}/api/comment/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setCommentslist(response.data);
                // setCommentslist((prevComments) => [...prevComments, response.data]);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    useEffect(() => {
        if (token) {
            setInstruction(false);
        } else {
            setInstruction(true);
        }
    }, [token]);

    const handleGoToDashbaord = () => {
        navigate("/dashboard")
    }

    useEffect(()=>{
        if(commentslist.length!==0){
            setIsComment(false)
        }else{
            setIsComment(true)
        }
    },[commentslist])

    return (
        <>
            <div className="comment-main">
                <div className="photoandnamediv">
                    <div className="phtopfploggedin">
                        {isLoggedIn ? (
                            <div className='imgactivehlder-mop'>
                                <img src={profilePicture} alt="Profile Pic" />
                            </div>
                        ) : (
                            <div className='imgactivehlder-mop'>
                                <img src="https://www.alchinlong.com/wp-content/uploads/2015/09/sample-profile.png" alt="Profile Pic" />
                            </div>
                        )}
                    </div>

                    <div className="name-holder-loggedin">
                        {isLoggedIn ? (
                            <h2 onClick={handleGoToDashbaord} className='classofnameloggedin'>{name}</h2>
                        ) : (
                            <h2 onClick={handleGoToDashbaord} className='classofnameloggedin'>Author</h2>
                        )}
                    </div>
                </div>

                <textarea className='place-ka-holder-commnt' placeholder='What are your thoughts today?' name="" id="" cols="10" rows="5" value={comment} onChange={handleCommentChange}></textarea>
                <textarea style={{ display: "none" }} placeholder='' name="" id="" cols="10" rows="5" value={commentauthor} onChange={handleCommentAuthorChange}></textarea>
                <input style={{ display: "none" }} type="text" value={commentpic} onChange={handleCommentAuthorPic} />


                <div className="btnscommentandcancel">
                    <button id='nhilikhnabhaicomment' onClick={handleCancel} disabled={!isCommentFilled() || disable} style={{ cursor: !isCommentFilled() || disable ? "not-allowed" : "pointer" }}>Cancel</button>

                    <button id='commentkardebhai' onClick={handleComment} disabled={!isCommentFilled() || disable} style={{ cursor: !isCommentFilled() || disable ? "not-allowed" : "pointer", opacity: !isCommentFilled() || disable ? 0.5 : 1 }}>{submit ? "Submitting..." : "Comment"}</button>
                </div>


            </div>

            <div className="inctructionhbhaipadhlo">
                {instruction && <span id='strict-instruction'>You must be <span onClick={handleLoginPage} style={{ cursor: "pointer" }}>logged in</span> to comment.</span>}
                <span id='strict-instruction'>{" "}Please be respectful and avoid usage of any offensive words.</span>
            </div>

            {/*  displaying comments*/}
            <p className='total-comments-innutshell'>{commentslist[0]?.comments.length} Comments</p>

            <div className="single-bodycomt-starts">
                {isComment && <p className='nocomtnsyet'>no comments yet.</p>}
                {commentslist[0]?.comments.map((comment) => {
                    return (
                        <div key={comment._id} id='indi-comnt-putin'>
                            <div className="firsthoridivforcmt">
                                <div id='img-of-comt-author'>
                                    <img src={comment.commentpic} alt="" />
                                </div>

                                <h2 className='name-of-author-created-comnt'>{comment.commentauthor}</h2>
                            </div>

                            <div className="message-by-author-in-comnt">
                                {comment.text.split('\n').map((paragraph, index) => (
                                    <p key={index} style={{ whiteSpace: "pre-line" }} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default Comments
