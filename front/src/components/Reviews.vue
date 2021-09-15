<template>
  <!-- Reviews Keely -->
  <div
    class="Reviews"
  >
    <div id="review-preview">
      <span>
        <i
          class="fa fa-comment"
          @click="openReviews"
        />
        <h3>Spill the Tea!</h3>
      </span>
      <button
        id="write-button"
        @click="openReviews"
      >
        Write a Review
      </button>
    </div>
    <div
      id="reviews-pop-up"
    >
      <div id="close-review">
        <h2>Spill the Tea!</h2>
        <i
          class="fa fa-times"
          @click="closeReviews"
        />
      </div>
      <form
        v-if="user.id !== listing.author._id"
        id="review-form"
        @submit.prevent="postReview"
      >
        <div class="form-group">
          <textarea
            id="body"
            v-model="review.body"
            type="text"
            name="body"
            placeholder="Type your message here..."
          />
        </div>
        <button type="submit">
          Post Review
        </button>
      </form>
        <div
        class="reviews-error"
          v-if="reviews.length === 0"
        >
          <p>No reviews yet!</p>
        </div>
      <div
        v-for="singleReview in reviews"
        v-else
        :key="singleReview._id"
        class="review"
      >
        <div >
          <h3>User: {{ singleReview.name }}</h3>
          <p>{{ singleReview.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listingId: String,
    listing: Object,
    user: Object,
  },
  data() {
    return {
      reviews: [],
      review: {
        author: null,
        body: null,
      },
    };
  },
  created() {
    this.getReviews();
  },
  methods: {
    async postReview() {
      if (this.user.name === this.listing.author.name) {
        console.log('Hello');
      } else {
        const review = {};
        review.name = this.user.name;
        review.body = this.review.body;
        const response = await fetch(`http://localhost:3000/listings/${this.listingId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(review),
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data); // "Unexpected console statement" - Data needs to be used - Keely 14/9
        this.getReviews();
      }
    },
    async getReviews() {
      const response = await fetch(
        `http://localhost:3000/listings/${this.listingId}`,
      );
      const data = await response.json();
      this.reviews = data.reviews;
      this.review.body = null;
    },
    openReviews() {
      const reviews = document.getElementById('reviews-pop-up');
      reviews.style.display = 'block';
      const topDiv = document.getElementById('review-preview');
      topDiv.style.display = 'none';
    },
    closeReviews() {
      const reviews = document.getElementById('reviews-pop-up');
      reviews.style.display = 'none';
      const topDiv = document.getElementById('review-preview');
      topDiv.style.display = 'flex';
    },
  },
};
</script>

<style scoped>
#review-preview{
    width: 80vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3em;
    margin-bottom: 3em;
}
span{
    display: flex;
}
#review-preview i{
    font-size: 1.5em;
}
#review-preview h3{
    margin:0;
    margin-left: 0.2em;
    font-weight: 500;
}
#write-button{
    padding: 0.8em;
}
#reviews-pop-up{
    display: none;
}
#review-preview{
    display: flex;
}
form{
    background-color: white;
    width: 100vw;
    height: 23vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
textarea {
    width: 70vw;
    height: 10vh;
   resize: none;
    border: thin #A26360 solid;
    border-radius: 5px;
    font-family: inherit;
    font-size: 1em;
    padding:0.4em;
    margin-bottom: 1em;
}
#close-review{
    width: 60vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-left: 25%;
}
#close-review i{
    font-size: 1.6em;
    color: #A26360;
}
.reviews-error{
    height: 10em;
    display: flex;
    align-items: center;
    justify-content: center;
}
.review{
    background-color: white;
    border-radius: 5px;
    border: thin #A26360 solid;
    width: 80vw;
    text-align: left;
    padding-left: 0.5em;
    margin-left: 8.5vw;
    margin-top: 5vw;
    margin-bottom: 1em;
}
h3{
    margin-top: 0.3em;
}
i{
    color: #A26360;
}
</style>
