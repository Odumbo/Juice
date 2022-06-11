async function getUserByUsername(username) {
    try {
      const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
      `, [username]);
  
      return user;
    } catch (error) {
      throw error;
    }
  }
  async function createPost({
    authorId,
    title,
    content,
    tags = []
  }) {
    try {
      const { rows: [ post ] } = await client.query(`
        INSERT INTO posts("authorId", title, content) 
        VALUES($1, $2, $3)
        RETURNING *;
      `, [authorId, title, content]);
  
      const tagList = await createTags(tags);
  
      return await addTagsToPost(post.id, tagList);
    } catch (error) {
      throw error;
    }
  }