const getPhotoSettings = () => {
  const PhotosQuantity = {
    MIN: 1,
    MAX: 25,
  };

  const AvatarsQuantity = {
    MIN: 1,
    MAX: 6,
  };

  const LikesQuantity = {
    MIN: 15,
    MAX: 200,
  };

  const CommentsIdQuantity = {
    MIN: 1,
    MAX: 1000,
  };

  const CommentsForPhotoQuantity = {
    MIN: 0,
    MAX: 30,
  };

  const MessagesForCommentQuantity = {
    MIN: 1,
    MAX: 2,
  };

  return {
    PhotosQuantity,
    AvatarsQuantity,
    LikesQuantity,
    CommentsIdQuantity,
    CommentsForPhotoQuantity,
    MessagesForCommentQuantity
  };
};

export { getPhotoSettings };
