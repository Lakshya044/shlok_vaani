import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Collapse,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import {
  Favorite,
  Share,
  Bookmark,
  Comment,
  ExpandMore,
  Language,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import "./styles.css";
const ExpandMoreIcon = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
  transition: "0.3s ease",
  backgroundColor: expand ? "rgba(0, 0, 0, 0.7)" : "transparent", // Dark background when expanded
  "&:hover": {
    backgroundColor: expand ? "rgba(0, 0, 0, 0.8)" : "transparent", // Darker on hover when expanded
  },
}));

const ShlokaCard = ({ uid }) => {
  const [shlokaData, setShlokaData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    const fetchShlokaInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/fetch/info/${uid}`
        );
        const { bookData } = await response.json();
        setShlokaData(bookData);
      } catch (error) {
        console.error("Error fetching shloka info:", error);
      }
    };
    fetchShlokaInfo();
  }, [uid]);

  const handleExpandClick = () => setExpanded(!expanded);
  const handleClickLanguage = (event) => setAnchorEl(event.currentTarget);
  const handleCloseLanguageMenu = () => setAnchorEl(null);

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    handleCloseLanguageMenu();
    const meanings = {
      English: "This is the English meaning of the Shloka.",
      Hindi: "यह श्लोक का हिंदी अर्थ है।",
      Sanskrit: "एष श्लोकस्य संस्कृतार्थः अस्ति।",
    };
    setMeaning(meanings[language]);
  };

  if (!shlokaData) return <p>Loading...</p>;

  return (
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
          >{`Scripture: ${shlokaData.scripture}`}</Typography>
        }
        subheader={
          <Typography variant="body2" sx={{ color: "#ddd" }}>{`Book No: ${
            shlokaData.bookNo
          } | Chapter No: ${shlokaData.chapterNo} | Shloka: ${
            shlokaData.shlokaNo
          }`}</Typography>
        }
        sx={{ position: "relative", zIndex: 2 }}
      />

      <CardContent sx={{ position: "relative", zIndex: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#FFD700",
            textAlign: "center",
            textShadow: "3px 3px 10px rgba(255, 215, 0, 0.8)",
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
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
          <IconButton sx={{ color: "gold" }}>
            <Favorite />
          </IconButton>
          <Typography sx={{ marginRight: 2, color: "gold" }}>
            {shlokaData.likes.length}
          </Typography>
          <IconButton sx={{ color: "gold" }}>
            <Comment />
          </IconButton>
          <Typography sx={{ marginRight: 2, color: "gold" }}>
            {shlokaData.commentCount}
          </Typography>
          <IconButton sx={{ color: "gold" }}>
            <Bookmark />
          </IconButton>
          <IconButton sx={{ color: "gold" }}>
            <Share />
          </IconButton>
        </Box>
        <Box>
          <button className="expand-button" onClick={handleExpandClick}>
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
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background for the meaning section
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{
              marginBottom: 2,
              fontSize: "1.1rem",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Shloka Meaning ({selectedLanguage}):
          </Typography>
          <Typography sx={{ fontSize: "1.1rem", color: "#ddd" }}>
            {meaning || "Select a language to view meaning"}
          </Typography>

          <Box sx={{ marginTop: 2 }}>
            <IconButton
              onClick={handleClickLanguage}
              sx={{ color: "gold", fontWeight: "bold" }}
            >
              <Language /> Select Language
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLanguageMenu}
            >
              <MenuItem
                onClick={() => {
                  handleSelectLanguage("English");
                }}
              >
                English
              </MenuItem>
              <MenuItem onClick={() => handleSelectLanguage("Hindi")}>
                Hindi
              </MenuItem>
              <MenuItem onClick={() => handleSelectLanguage("Sanskrit")}>
                Sanskrit
              </MenuItem>
            </Menu>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ShlokaCard;
