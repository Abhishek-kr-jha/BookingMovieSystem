import jwt from "jsonwebtoken";
import  Movie from "../Models/Movie";

export const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() == " ") {
    return res.status(404).json({ message: "Token Not found" });
  }

  let adminId;

  // verify token

  jwt.verify(extractedToken, process.env.SECRET_KEY, (error, decrypted) => {
    if (error) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
  // create new token

  const { title, description, releaseDate, posterUrl, featured , actors} = req.body;
  if (
    !title &&
    title.trim() === " " &&
    !description &&
    description.trim() === " " &&
    !posterUrl &&
    posterUrl.trim() === " "
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      releaseDate,
      featured,
      actors,
      releaseDate: new Date(`${releaseDate}`),
      admin: adminId,
      posterUrl,
    });
    movie =  await movie.save();
  } catch (error) {
    return console.log(error);
  }
  if(!movie){
    return res.status(500).json({message:"request Failed"})
  }
  return res.status(201).json({movie});
  
};
