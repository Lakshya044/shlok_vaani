import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import {
  Card,
  CircularProgress,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Collapse,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import {
  Favorite,
  Share,
  Bookmark,
  Comment,
  Language,
} from "@mui/icons-material";
import "./styles.css";

const ShlokaCard = ({ uid }) => {
  const [shlokaData, setShlokaData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [meaning, setMeaning] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // When shlokaData is fetched, initialize local comments.
  useEffect(() => {
    if (shlokaData && Array.isArray(shlokaData.comments)) {
      setComments(shlokaData.comments);
    }
  }, [shlokaData]);

  // Fetch shloka info (including comments, likes, etc.)
  useEffect(() => {
    const fetchShlokaInfo = async () => {
      try {
        const response = await fetch(`/api/fetch/info/${uid}`);
        const { bookData } = await response.json();
        setShlokaData(bookData);
      } catch (error) {
        console.error("Error fetching shloka info:", error);
      }
    };
    fetchShlokaInfo();
  }, [uid]);
  useEffect(() => {
    getSession().then((session) => {
      if (session && session.user) {
        setUserId(session.user.id);
        setUserName(session.user.name);
      }
    });
  }, []);

  // Open the comments dialog by using the comments from shlokaData
  const handleOpenComments = () => {
    setOpen(true);
  };

  // Submit a new comment.
  // On success, update both the local comments state and shlokaData.
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`/api/create/comment/${uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userName,
          text: newComment,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        // Append the new comment locally
        const updatedComments = [...comments, result.comment];
        setComments(updatedComments);
        // Also update shlokaData: increment commentCount and update comments array
        setShlokaData((prev) => ({
          ...prev,
          commentCount: prev.commentCount + 1,
          comments: [...(prev.comments || []), result.comment],
        }));
        setNewComment("");
      } else {
        console.error("Comment creation failed:", result.message);
      }
    } catch (err) {
      console.error("Error creating comment", err);
    }
  };

  const handleExpandClick = () => setExpanded(!expanded);

  const handleExplain = async () => {
    handleExpandClick();
    try {
      console.log("Request send for translation", shlokaData.text);
      const res = await fetch("/api/model", {
        method: "POST",
        body: JSON.stringify({ text: shlokaData.text }),
      });

      const data = await res.json();
      console.log("Response from translation API", data);
      if (data?.translation) {
        setMeaning(data.translation);
      } else {
        setMeaning("Error explaining shloka.");
      }
    } catch (err) {
      console.error(err);
      setMeaning("Error explaining shloka.");
    }
  };

  // Handle liking the shloka
  const handleLike = async () => {
    if (!userId) {
      alert("Please log in to like the shloka.");
      return;
    }
    try {
      const response = await fetch(`/api/create/like/${uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        setShlokaData((prev) => {
          const currentData = prev && typeof prev === "object" ? prev : {};
          const likesArr = Array.isArray(currentData.likes)
            ? currentData.likes
            : [];
          const alreadyLiked = likesArr.includes(userId);
          return {
            ...currentData,
            likes: alreadyLiked
              ? likesArr.filter((id) => id !== userId)
              : [...likesArr, userId],
          };
        });
      }
    } catch (error) {
      console.error("Error liking shloka:", error);
    }
  };

  if (!shlokaData) return <p className="flex justify-center">Loading...</p>;

  const isLikedByCurrentUser =
    userId &&
    Array.isArray(shlokaData.likes) &&
    shlokaData.likes.includes(userId);

  return (
    <div>
      <Card
        sx={{
          width: { xs: "95vw", sm: "85vw", md: "70vw", lg: "60vw" },
          margin: "auto",
          position: "relative",
          backgroundImage: "url(/bg-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          borderRadius: 3,
          boxShadow: "0px 10px 25px rgba(255, 215, 0, 0.3)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            boxShadow: "0px 15px 35px rgba(255, 215, 0, 0.5)",
            transform: "scale(1.03)",
          },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9))",
            zIndex: 1,
          }}
        />
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: "gold",
                width: 50,
                height: 50,
                position: "relative",
                zIndex: 2,
              }}
            >
              {shlokaData.scripture[0]}
            </Avatar>
          }
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "gold",
                textShadow: "2px 2px 6px rgba(255, 215, 0, 0.7)",
              }}
            >
              {`Scripture: ${shlokaData.scripture}`}
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: "#ddd" }}>
              {`Book No: ${shlokaData.bookNo} | Chapter No: ${shlokaData.chapterNo} | Shloka: ${shlokaData.shlokaNo}`}
            </Typography>
          }
          sx={{ position: "relative", zIndex: 2 }}
        />
        <CardContent sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h5"
            sx={{
              padding: "2rem",
              border: "1px solid gold",
              maxHeight: "14rem",
              overflowY: "auto",
              fontWeight: "bold",
              color: "#FFD700",
              textAlign: "center",
              textShadow: "3px 3px 10px rgba(255, 215, 0, 0.8)",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" },
            }}
          >
            {shlokaData.text}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 16px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleLike}
              sx={{ color: isLikedByCurrentUser ? "red" : "gold" }}
            >
              <Favorite />
            </IconButton>
            <Typography
              sx={{
                marginRight: 2,
                color: isLikedByCurrentUser ? "red" : "gold",
              }}
            >
              {Array.isArray(shlokaData.likes) ? shlokaData.likes.length : 0}
            </Typography>
            <IconButton onClick={handleOpenComments} sx={{ color: "gold" }}>
              <Comment />
            </IconButton>
            <Typography sx={{ marginRight: 2, color: "gold" }}>
              {shlokaData.commentCount}
            </Typography>
            {/* <IconButton sx={{ color: "gold" }}>
              <Bookmark />
            </IconButton>
            <IconButton sx={{ color: "gold" }}>
              <Share />
            </IconButton> */}
          </Box>
          <Box>
            <button className="expand-button" onClick={handleExplain}>
              <div className="button-content">
                <img src="/ai.png" alt="AI" className="button-icon" />
                <span className="button-text">Explain it</span>
              </div>
            </button>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            sx={{
              position: "relative",
              zIndex: 2,
              background:
                "linear-gradient(135deg, rgba(10,10,10,0.85), rgba(40,40,40,0.85))",
              padding: 3,
              borderRadius: 3,
              boxShadow: "0 4px 30px rgba(255, 215, 0, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              transition: "all 0.3s ease-in-out",
              maxHeight: "200px", // Limit height
              overflowY: "auto", // Enable scroll
              scrollbarWidth: "thin",
              scrollbarColor: "#FFD700 rgba(255, 255, 255, 0.1)",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#FFD700",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "1.25rem",
                color: "#FFD700",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: 2,
                borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
                paddingBottom: 1,
              }}
            >
              <SmartToyIcon sx={{ color: "#FFD700" }} />
              Shloka Meaning
            </Typography>

            {meaning ? (
              <Typography
                sx={{
                  fontSize: "1.15rem",
                  color: "#FFF8DC",
                  textShadow: "1px 1px 4px rgba(255, 215, 0, 0.5)",
                  lineHeight: 1.6,
                  animation: "fadeIn 0.6s ease-in-out",
                  whiteSpace: "pre-wrap",
                }}
              >
                {meaning}
              </Typography>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "#FFD700" }} />
                <Typography sx={{ color: "#FFD700", fontSize: "1rem" }}>
                  Generating meaning using AI...
                </Typography>
              </Box>
            )}
          </CardContent>
        </Collapse>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.9)",
            color: "white",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "yellow",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Comments
        </DialogTitle>

        <DialogContent dividers sx={{ color: "white" }}>
          <List>
            {comments.map((comment, index) => (
              <ListItem key={comment._id || index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    src={
                      comment.avatar ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.userName || comment.userId}
                  secondary={comment.text}
                  primaryTypographyProps={{
                    sx: { fontWeight: "bold", color: "yellow" },
                  }}
                  secondaryTypographyProps={{ sx: { color: "#ccc" } }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions
          sx={{
            flexDirection: "column",
            alignItems: "stretch",
            gap: 1,
            padding: 2,
            backgroundColor: "rgba(20,20,20,0.95)",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "yellow",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleCommentSubmit}
              sx={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#b30000",
                },
              }}
            >
              Submit
            </Button>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{
                color: "yellow",
                borderColor: "yellow",
                "&:hover": {
                  borderColor: "red",
                  color: "red",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShlokaCard;
