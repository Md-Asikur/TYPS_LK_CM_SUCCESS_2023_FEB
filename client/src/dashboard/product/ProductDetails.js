import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";
import "./productDetails.css"
import Carousel from "react-material-ui-carousel";
import { getPostReacts, getPostReactsUnauth, reactPost } from "../../actions/reactActions";
import { createComment, getComments } from "../../actions/commentAction";
import Pagination from "../comments/Pagination";
import Comments from "../comments/Comments";
import ProductCard from "./ProductCard";
import Input from "../comments/Input";
import ReactsPopup from "../react/ReactPopups";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Button } from "@mui/material";
import Table from "react-bootstrap/esm/Table";

import CloseIcon from "@mui/icons-material/Close";
import NewRequest from "../../components/message/newRequest";
import { addItemsToCart } from "../../actions/cartAction";
import { toast } from "react-toastify";

export const ProductDetails = () => {
  const comments = useSelector((state) => state.comments);
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState([]);
  const [loadings, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { product: products } = useSelector((state) => state.productDetails);
  // const { product: products } = product;
  const procat = products?.category;
  const id = useParams().id;
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);
  //react post
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [allNameR, setAllNameR] = useState();
  const [checkSaved, setCheckSaved] = useState();
  useEffect(() => {
    if (user) {
      getReactsPost();
    } else {
      getReactsPostUnauth();
    }
  }, [dispatch, products, user]);

  const getReactsPost = async () => {
    const res = await getPostReacts(products?._id);
    //console.log("reacsst", res.all);
    setAllNameR(res.all);
    setReacts(res.reacts);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };
  //un auth
  const getReactsPostUnauth = async () => {
    const res = await getPostReactsUnauth(products?._id);
    setAllNameR(res?.all);
    setReacts(res.reacts);

    setTotal(res.total);
  };
  const reactHandler = async (type) => {
    reactPost(products?._id, type);
    if (check == type) {
      setCheck();
      let index = reacts?.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = --reacts[index].count)]);
        setTotal((prev) => --prev);
      }
    } else {
      setCheck(type);
      let index = reacts?.findIndex((x) => x.react == type);
      let index1 = reacts?.findIndex((x) => x.react == check);
      if (index !== -1) {
        setReacts([...reacts, (reacts[index].count = ++reacts[index].count)]);
        setTotal((prev) => ++prev);
        console.log("reacts", reacts);
      }
      if (index1 !== -1) {
        setReacts([...reacts, (reacts[index1].count = --reacts[index1].count)]);
        setTotal((prev) => --prev);
        console.log(reacts);
      }
    }
  };
  //react part end
  const handleComment = (body,file) => {
    if (!user) return;

    const data = {
      content: body,
      image:file,
      user: user,
      blog_id: products?._id,
      blog_user_id: products?.user,

      replyCM: [],
      createdAt: new Date().toISOString(),
    };

    setShowComments([data, ...showComments]);
    dispatch(createComment(data));
  };

  useEffect(() => {
    //if (comments?.data?.length === 0) return;
    setShowComments(comments?.data);
  }, [comments?.data]);
  console.log(showComments);
  const fetchComments = useCallback(async (id, num = 1) => {
    setLoading(true);
    dispatch(getComments(id, num));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!products?._id) return;
    const num = navigate?.location?.search.slice(6) || 1;
    fetchComments(products?._id, num);
  }, [products?._id, fetchComments, navigate]);

  const handlePagination = (num) => {
    if (!products?._id) return;
    fetchComments(products?._id, num);
  };
  //reactions menus
  const onClose = (e) => {
    setShowMenu(false);
  };
  const menuref = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  //converstaions create

  const handleContact = async (order) => {
    const id = user?._id + order?._id || order?._id + user?._id;

    try {
      const res = await NewRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await NewRequest.post(`/conversations`, {
          to: user?.isActiveUser ? user?._id : order?._id,
        });
        navigate(`/message/${res.data?.id}`);
      }
    }
  };
  //cart
  //react part end
  const increaseQuantity = () => {
    if (products?.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
    navigate("/cart")
  };

  return (
    <>
      <div className="productDetails">
        <Carousel className="CarouselImage" style={{ width: "500px" }}>
          {products?.images &&
            products?.images.map((item, i) => (
              <img
                key={i}
                style={{ height: "400px", width: "100%" }}
                src={item?.url}
                alt={`${i} Slide`}
              />
            ))}
        </Carousel>

        <div>
          <h4>
            <b>productId:</b> {products?._id}
          </h4>
          <h4>
            <b>productName:</b> {products?.name}
          </h4>
          <h4>
            <b>productDesc:</b>
            {products?.description}
          </h4>

          <h4>
            <b>product-category:</b>
            {products?.category}
          </h4>
          <h4>
            <b>product-stock:</b>
            {products?.stock}
          </h4>
          <h4>
            <b>product-price:</b>
            {products?.price}
          </h4>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
              <button onClick={decreaseQuantity}>-</button>
              <input readOnly type="number" value={quantity} />
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button
              disabled={products?.stock < 1 ? true : false}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* React */}
      <div
        ref={menuref}
        className="post_infos"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        onClick={() => {
                          setShowMenu(!showMenu);
                        }}
                        src={`../../reacts/${react.react}.svg`}
                        alt=""
                        key={i}
                      />
                    )
                )}
            {showMenu && (
              <div className="rc_dropdown">
                <Button
                  onClick={onClose}
                  variant="outlined"
                  color="error"
                  style={{ float: "right", margin: "2px 15px" }}
                >
                  {" "}
                  <CloseIcon />
                </Button>

                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Reactions(7)</th>

                      <th>Send Messages</th>
                    </tr>
                  </thead>

                  {allNameR?.map((re, i) => {
                    return (
                      <>
                        {/* <img src={re?.reactBy?.avatar?.url} />
                              <p>{re?.reactBy?.name}</p>
                              <img src={`../../reacts/${re.react}.svg`} alt="" key={i} /> */}
                        <tbody>
                          <tr>
                            <td>
                              <Link to={`/account/${re?.reactBy?._id}`}>
                                <img
                                  className="tdimg"
                                  src={re?.reactBy?.avatar?.url}
                                  style={{ height: "30px", width: "30px" }}
                                />
                              </Link>
                            </td>
                            <td>{re?.reactBy?.name}</td>
                            <td>
                              {" "}
                              <img src={`../../reacts/${re.react}.svg`} alt="" key={i} />
                            </td>
                            <td>
                              <Button
                                variant="outlined"
                                onClick={() => handleContact(re?.reactBy)}
                              >
                                Send Message
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
                </Table>
              </div>
            )}
          </div>
          <div className="reacts_count_num">{total > 0 && total}</div>
          <div className="post_actions">
            <ReactsPopup
              visible={visible}
              setVisible={setVisible}
              reactHandler={reactHandler}
            />
            <div
              className="post_action hover1"
              onMouseOver={() => {
                setTimeout(() => {
                  setVisible(true);
                }, 500);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  setVisible(false);
                }, 500);
              }}
              onClick={() => reactHandler(check ? check : "like")}
            >
              {check ? (
                <img
                  src={`../../reacts/${check}.svg`}
                  alt=""
                  className="small_react"
                  style={{ width: "18px" }}
                />
              ) : (
                user && <ThumbUpOffAltIcon style={{ display: "block" }} />
              )}
              <span
                style={{
                  color: `
          
          ${
            check === "like"
              ? "#4267b2"
              : check === "love"
              ? "#f63459"
              : check === "haha"
              ? "#f7b125"
              : check === "sad"
              ? "#f7b125"
              : check === "wow"
              ? "#f7b125"
              : check === "angry"
              ? "#e4605a"
              : ""
          }
          `,
                }}
              >
                {check ? check : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ padding: "13px" }}>
        {user ? (
          <Input callback={handleComment} />
        ) : (
          <h5>
            Please <Link to={`/login?product/${products?._id}`}>login</Link> to comment.
          </h5>
        )}

        {loadings ? (
          <h1>Loading...</h1>
        ) : (
          showComments?.map((comment, index) => (
            <Comments key={index} comment={comment} />
          ))
        )}

        {comments?.total > 1 && (
          <Pagination total={comments?.total} callback={handlePagination} />
        )}
      </div>
    </>
  );
};
