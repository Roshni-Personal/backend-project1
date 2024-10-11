import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // steps for register user
  // get user details from frontend
  // validation for all feilds , empty values , email format
  // check if user already exists - unique email or username or both
  // check if required files are there like avatar, and images, cover image is not required
  // Upload them to cloudinary , avatar
  // create user object (for mongoDB , nosql ) - create entry in db
  // remove password and refresh token feild from response
  // check for user creation response
  // return res

  const { fullname, email, password, username } = req.body;
  console.log("data payload", fullname, email, password, username);

  //   if (fullname === "") {
  //     throw new ApiError(400, "Full name is required");
  //   }

  // better approach for validations
  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All feilds are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log("existing user", existedUser);

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // file upload -> we took avatar[0] bcuz we need object inside [0] which is used to get the file path

  console.log("file upload check", req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //   const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (
    req?.files &&
    Array.isArray(res?.files?.coverImage) &&
    res?.files?.coverImage?.length > 0
  ) {
    coverImageLocalPath = res?.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar");
  }

  const user = await User.create({
    fullname,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User?.findById(user?._id).select(
    "-password -refreshToken "
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
