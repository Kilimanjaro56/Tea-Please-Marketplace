<template>
  <!-- Comments - Annabel -->
  <div class="comments">
    <div id="comments-preview">
      <span>
        <i
          class="fas fa-comment"
          @click="openComments"
        />
        <h3>Spill The Tea!</h3>
      </span>

      <button
        id="add-comment"
        @click="openComments"
      >
        Add a Comment
      </button>
    </div>
    <div id="comments-popup">
      <div id="close-comments">
        <h2>Spill the Tea!</h2>
        <i
          class="fa fa-times"
          @click="closeComments"
        />
      </div>
    </div>
    <form
      id="comment-form"
      @submit.prevent="postComment"
    >
      <div class="form-group">
        <textarea
          id="body"
          v-model="comment.body"
          type="text"
          name="body"
          cols="30"
          rows="5"
          placeholder="Type your message here..."
        />
      </div>
      <button type="submit">
        Post Comment
      </button>
    </form>
    <div
      v-if="comments.length === 0"
      class="comments-error"
    >
      <p>This listing has no comments yet!</p>
    </div>
    <div id="all-comments">
      <div
        v-for="comment of comments"
        :key="comment._id"
        class="comment"
      >
        <div>
          <h3>User: {{ comment.name }}</h3>
          <p>{{ comment.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listing: Object,
    listingId: String,
    user: Object,
  },
  data() {
    return {
      comments: [],
      comment: {
        author: null,
        body: null,
      },
    };
  },

  created() {
    this.getComments();
  },

  methods: {
    async postComment() {
      const comment = {};
      comment.body = this.comment.body;

      const response = await fetch(`http://localhost:3000/listings/${this.listingId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data); // unexpected console statement - Annabel 14/09
      this.getComments();
    },
    async getComments() {
      const response = await fetch(`http://localhost:3000/listings/${this.listingId}`);
      const data = await response.json();
      this.comments = data.comments;
      this.comment.body = null;
    },
    openComments() {
      const comments = document.getElementById('comments-popup');
      comments.style.display = 'block';
      const topDiv = document.getElementById('comments-preview');
      topDiv.style.display = 'none';
      const textArea = document.getElementById('comment-form');
      textArea.style.display = 'flex';
      const allComments = document.getElementById('all-comments');
      allComments.style.display = 'block';
    },
    closeComments() {
      const comments = document.getElementById('comments-popup');
      comments.style.display = 'none';
      const topDiv = document.getElementById('comments-preview');
      topDiv.style.display = 'flex';
      const textArea = document.getElementById('comment-form');
      textArea.style.display = 'none';
      const allComments = document.getElementById('all-comments');
      allComments.style.display = 'none';
    },
  },
};
</script>

<style>
#comments-preview {
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3em;
  margin-bottom: 3em;
}
span {
  display: flex;
}
#comments-preview i {
  font-size: 1.5em;
}
#comments-preview h3 {
  margin: 0;
  margin-left: 0.2em;
  font-weight: 500;
}
#add-comment {
  padding: 0.8em;
}
#comments-popup {
  display: none;
}
#comments-preview {
  display: flex;
}
form {
  background-color: white;
  width: 100vw;
  height: 23vh;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
textarea {
  width: 70vw;
  height: 10vh;
  resize: none;
  border: thin #a26360 solid;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1em;
  padding: 0.4em;
  margin-bottom: 1em;
}
#close-comments {
  width: 60vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-left: 35%;
}
#close-comments i {
  font-size: 1.6em;
  color: #a26360;
  margin-left: 1em;
}
.comments-error {
  height: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
}

#all-comments {
  display: none;
}
.comment {
  background-color: white;
  display: flex;
  border-radius: 5px;
  border: thin #a26360 solid;
  width: 80vw;
  text-align: left;
  padding-left: 0.5em;
  margin-left: 8.5vw;
  margin-top: 5vw;
  margin-bottom: 1em;
}
h3 {
  margin-top: 0.3em;
}
i {
  color: #a26360;
}
</style>
