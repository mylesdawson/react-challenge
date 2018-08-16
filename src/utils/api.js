
export const getPosts = () => fetch('http://127.0.0.1:5000/posts');

export const createPost = (title, description) => {
  return fetch('http://127.0.0.1:5000/posts', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
    }),
  });
};

export const deletePost = (id) => {
  return fetch(`http://127.0.0.1:5000/posts/${id}`, { method: 'delete' });
};

export const createImage = (image, postId) => {
  return fetch('http://127.0.0.1:5000/images', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      url: image,
      post_id: postId,
    }),
  });
};

export const deleteImage = (id) => {
  return fetch(`http://127.0.0.1:5000/images/${id}`, { method: 'delete' });
};

export const createImages = (images, postId) => {
  const promises = images.map(image => createImage(image.image, postId));
  return Promise.all(promises);
};

export const deleteImages = (images) => {
  const promises = images.map(image => deleteImage(image.id));
  return Promise.all(promises);
};
