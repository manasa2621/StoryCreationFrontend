import React, { useContext, useEffect, useState } from "react";
import "./StoriesSection.css";
import { SwipToryContext } from "../../../SwipToryContext";
import axios from "axios";
import Edit from "./Assets/Edit.png";
import ReactModal from "react-modal";
import EditStory from "./EditStory";
import Form from "./Form";
import InfinitySlide from "./InfinitySlide";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

export default function StoriesSection(props) {
  const [stories, setStories] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [userStories, setUserStories] = useState([]);
  const [editStory, setEditStory] = useState(false);
  const [editStoryID, setEditStoryID] = useState("");
  const [infinitySlide, setInfinitySlide] = useState(false);
  const [toLogIn, setToLogIn] = useState(false);
  const [bookmarkedSlides, setBookmarkedSlides] = useState([]);
  const { isLoggedIn } = useContext(SwipToryContext);

  useEffect(() => {
    (async () =>
      setStories(await getSelectedStories(props.selectedCategory)))();
  }, []);

  useEffect(() => {
    (async () =>
      setStories(await getSelectedStories(props.selectedCategory)))();
  }, [props.selectedCategory]);

  useEffect(() => {
    (async () => {
      const user = localStorage.getItem("user");
      let stories = await axios.get(
        `https://storycreationbackend.onrender.com/user/story/${user}`
      );
      stories = stories.data;
      setUserStories(stories);
    })();
  }, [isLoggedIn]);

  useEffect(() => {
    if (editStory === true) {
      setInfinitySlide(false);
    }
  }, [editStory]);

  useEffect(() => {
    if (props.selectedCategory === "bookmarks") {
      fetchBookmarkedSlides();
    }
  }, [props.selectedCategory]);

  const fetchBookmarkedSlides = async () => {
    try {
      const user = localStorage.getItem("user");
      const response = await axios.get(
        `https://storycreationbackend.onrender.com/user/bookmarks/${user}`
      );
      setBookmarkedSlides(response.data);
    } catch (error) {
      console.error("Error fetching bookmarked slides:", error);
    }
  };

  return (
    <div className="storiessection">
      {isLoggedIn &&
        showUserStories(
          userStories,
          setEditStory,
          setEditStoryID,
          setInfinitySlide,
          showMore,
          setShowMore
        )}
      {props.selectedCategory === "all" &&
        showAllStories(
          stories,
          props.categories,
          setShowMore,
          showMore,
          setInfinitySlide,
          setEditStoryID
        )}
      {props.selectedCategory !== "all" &&
        props.selectedCategory !== "bookmarks" &&
        showCategoryStories(
          stories,
          props.selectedCategory,
          setInfinitySlide,
          setEditStoryID
        )}
      {props.selectedCategory === "bookmarks" &&
        showBookmarkedStories(
          bookmarkedSlides,
          setInfinitySlide,
          setEditStoryID
        )}
      <ReactModal
        isOpen={editStory}
        onRequestClose={() => setEditStory(false)}
        overlayClassName={"modalOverlay"}
        className={"addstorymodal"}
      >
        <EditStory closeStory={setEditStory} storyID={editStoryID} />
      </ReactModal>
      <ReactModal
        isOpen={infinitySlide}
        overlayClassName={"overlayInfinity"}
        onRequestClose={() => setInfinitySlide(false)}
        className={"infinitySlide"}
      >
        <InfinitySlide
          storyID={editStoryID}
          setClose={setInfinitySlide}
          setToLogIn={setToLogIn}
        />
      </ReactModal>
      <ReactModal
        isOpen={toLogIn}
        onRequestClose={() => setToLogIn(false)}
        className="modal"
        overlayClassName={"modalOverlay"}
      >
        <Form isSignUp={false} isLogIn={true} setIsLogIn={setToLogIn}></Form>
      </ReactModal>
    </div>
  );
}

async function getSelectedStories(category) {
  try {
    let response;
    if (category === "all")
      response = await axios.get(
        "https://storycreationbackend.onrender.com/story/all"
      );
    else
      response = await axios.get(
        `https://storycreationbackend.onrender.com/story/all?category=${category}`
      );
    return response.data;
  } catch (error) {
    console.error("Error fetching selected stories:", error);
  }
}

function showAllStories(
  stories,
  categories,
  setShowMore,
  showMore,
  setInfinitySlide,
  setEditStoryID
) {
  const uniqueStoryIDs = new Set();
  const uniqueStories = [];
  for (const obj of stories) {
    if (!uniqueStoryIDs.has(obj.storyID)) {
      uniqueStoryIDs.add(obj.storyID);
      uniqueStories.push(obj);
    }
  }
  return categories.map((item, key) => {
    if (key !== 0)
      return (
        <div className="storybycategory" key={key}>
          <p>Top stories about {item[0]}</p>
          <div
            className={
              showMore === item[0]
                ? "categorystoriesShowMore"
                : "categorystories"
            }
          >
            {uniqueStories?.map((story, key) => {
              if (story.category === item[0])
                return (
                  <div
                    className="story"
                    key={key}
                    onClick={() => {
                      setInfinitySlide(true);
                      setEditStoryID(story.storyID);
                    }}
                  >
                    <p>
                      {story.heading}
                      <br />
                      <span className="storydescription">
                        {story.description}
                      </span>
                    </p>
                    <img src={story.imageURL} />
                  </div>
                );
            })}
          </div>
          {key > 0 && (
            <button
              onClick={() => {
                setShowMore(showMore === item[0] ? false : item[0]);
              }}
            >
              {showMore === item[0] ? "See less" : "See more"}
            </button>
          )}
        </div>
      );
  });
}

function showCategoryStories(
  stories,
  category,
  setInfinitySlide,
  setEditStoryID
) {
  const uniqueStoryIDs = new Set();
  const uniqueStories = [];
  for (const obj of stories) {
    if (!uniqueStoryIDs.has(obj.storyID)) {
      uniqueStoryIDs.add(obj.storyID);
      uniqueStories.push(obj);
    }
  }
  return (
    <div className="storybycategory">
      <p>Top stories about {category}</p>
      <div className="categorystoriesShowMore">
        {uniqueStories.map((story, key) => (
          <div
            className="story"
            key={key}
            onClick={() => {
              setInfinitySlide(true);
              setEditStoryID(story.storyID);
            }}
          >
            <p>
              {story.heading}
              <br />
              <span className="storydescription">{story.description}</span>
            </p>
            <img src={story.imageURL} />
          </div>
        ))}
      </div>
    </div>
  );
}

function showUserStories(
  stories,
  setEditStory,
  setEditStoryID,
  setInfinitySlide,
  showMore,
  setShowMore
) {
  const uniqueStoryIDs = new Set();
  const uniqueStories = [];
  if (!stories.error) {
    for (const obj of stories) {
      if (!uniqueStoryIDs.has(obj.storyID)) {
        uniqueStoryIDs.add(obj.storyID);
        uniqueStories.push(obj);
      }
    }
  }
  if (!stories.error)
    return (
      <div className="storybycategory">
        <p>Your Stories</p>
        <div
          className={
            showMore ? "categorystoriesShowMore" : "categorystoriesUSER"
          }
        >
          {uniqueStories.map((story, key) => (
            <div
              className="story"
              key={key}
              onClick={() => {
                setInfinitySlide(true);
                setEditStoryID(story.storyID);
              }}
            >
              <p>
                {story.heading}
                <br />
                <span className="storydescription">{story.description}</span>
              </p>
              <img src={story.imageURL} />
              <button
                onClick={() => {
                  setEditStory(true);
                  setEditStoryID(story.storyID);
                }}
              >
                <img src={Edit} alt="" />
                <p>Edit</p>
              </button>
            </div>
          ))}
        </div>
        {uniqueStories?.length > 6 && (
          <button
            onClick={() => {
              if (showMore === false) setShowMore(true);
              else setShowMore(false);
            }}
          >
            See more
          </button>
        )}
      </div>
    );
  return (
    <div className="storybycategory">
      <p>Please create stories to view your stories.</p>
    </div>
  );
}

function showBookmarkedStories(
  bookmarkedSlides,
  setInfinitySlide,
  setEditStoryID
) {
  return (
    <div className="storybycategory">
      <p>Your Bookmarks</p>
      <div className="categorystoriesShowMore">
        {bookmarkedSlides.map((slideID, key) => (
          <div
            className="story"
            key={key}
            onClick={() => {
              setInfinitySlide(true);
              setEditStoryID(slideID);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
