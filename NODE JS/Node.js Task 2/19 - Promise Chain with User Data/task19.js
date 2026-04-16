function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, name: "Arun" });
    }, 500);
  });
}

function getPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: user,
        posts: ["Post 1", "Post 2", "Post 3"]
      });
    }, 400);
  });
}

function formatOutput(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const postsString = data.posts.join(", ");
      resolve({
        name: data.user.name,
        posts: postsString
      });
    }, 200);
  });
}

// Promise chain
getUser(1)
  .then(user => getPosts(user))
  .then(data => formatOutput(data))
  .then(result => {
    console.log(`User: ${result.name}`);
    console.log(`Posts: ${result.posts}`);
  })
  .catch(err => {
    console.log("Error:", err);
  });