import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Messages.scss";
import moment from "moment";
import { useSelector } from "react-redux";
import NewRequest from "../message/newRequest";

const Messages = () => {
 const { user } = useSelector((e) => e.user);
  const [db, setDb] = useState([])
  
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      NewRequest.get(`/conversations`).then((res) => {
       console.log(res)
        setDb(res.data)
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return NewRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{user?.isActiveUser? "Receiver" : "Sender"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((c) => {
              return (
                <>
                  {" "}
                  {
                    <tr
                      className={
                        ((user?.isActiveUser && !c.readBySender) ||
                          (!user?.isActiveUser && !c.readByReceiver)) &&
                        "active"
                      }
                      key={c.id}
                    >
                      <td>{user?.isActiveUser ? c.receiverId : c.senderId}</td>
                      <td>
                        <Link to={`/message/${c.id}`} className="link">
                          {c?.lastMessage?.substring(0, 100)}...
                        </Link>
                      </td>
                      <td>{moment(c.updatedAt).fromNow()}</td>
                      <td>
                        {((user?.isActiveUser && !c.readBySender) || (!user?.isActiveUser
                        && !c.readByReceiver)) && (
                        <button onClick={() => handleRead(c.id)}>Mark as Read</button>
                        )}
                      </td>
                    </tr>
                  }
                </>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
