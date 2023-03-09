import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";

import "./Message.scss";
import NewRequest from "./newRequest";
import {useSelector}from "react-redux"
const Message = () => {
  const { id } = useParams();
  const {user} =useSelector((e)=>e.user)

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["message"],
    queryFn: () =>
      NewRequest.get(`/message/${id}`).then((res) => {
        console.log(res.data)
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return NewRequest.post(`/message`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["message"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/message">Message</Link> /{user?.name} /
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === user?._id ? "owner item" : "item"} key={m._id}>
                {m.userId === user?._id ? (
                  <img src={user?.avatar?.url} alt="" />
                ) : (
                  <img src={m.user} alt="other user" />
                )}

                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
