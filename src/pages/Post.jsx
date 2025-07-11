import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/dataservice";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";



import { getBlog, deleteBlog } from "../backendConnect/blog.js";



export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.authReducer.userData);

    useEffect(() => {
        
        if (slug) {
            getBlog({_id:slug}).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const isAuthor = post && userData ? post.owner === userData.data._id : false;

    const deletePost = () => {
        deleteBlog(post._id).then((status) => {
            if (status) {
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 text-white">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}