<template>
  <div>
    <form @submit.prevent="postComment">
      <div class="form-group">
        <label for="body">Comment</label>
        <textarea
          id="body"
          v-model="comment.body"
          name="body"
          cols="30"
          rows="5"
        />
      </div>
      <button type="submit">
        Post Comment
      </button>
    </form>
    <ul>
      <li
        v-for="comment of comments"
        :key="comment._id"
      >
        <!-- <p>
          on {{new Date(comment.createdAt).toLocaleDateString("en-NZ")}}
          at {{new Date(comment.createdAt).toLocaleTimetring("en-NZ")}}
        </p> -->
        <p>{{ comment.body }}</p>
      </li>
    </ul>
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
      comment.name = this.user.name;
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
      const response = await fetch(
        `http://localhost:3000/listings/${this.listingId}`,
      );
      const data = await response.json();
      this.comments = data.comments;
      this.comment.body = null;
    },

  },
};
</script>

<style>

</style>
