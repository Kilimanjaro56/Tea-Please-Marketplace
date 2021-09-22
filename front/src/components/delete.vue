<template>
  <!--delete front end - Annabel-->
  <div
    class="delete-function"
    @click="confirmDelete"
  >
    <div class="bin">
      <i class="far fa-trash-alt" />
      <h3>Delete Listing</h3>
    </div>
    <p>This action cannot be undone</p>
  </div>
</template>

<script>
export default {
  name: 'Delete',
  props: {
    listingId: String,
  },
  methods: {
    confirmDelete() {
      const answerToDelete = confirm('Are you sure you want to delete this listing? This action cannot be undone.');
      if (answerToDelete) {
        this.handleDelete();
      }
    },
    async handleDelete() {
      await fetch(`http://localhost:3000/listings/edit/${this.listingId}`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.status === 200) this.$router.push('/');
      });
    },
  },

};
</script>

<style>

.delete-function {
  display: flex;
  flex-direction: column;
  margin-left: 8vw;
}

.bin {
  display: flex;
  flex-direction: row;
  width: 10em;
  margin: auto;
}

i, h3 {
  color: #A26360;
  margin: auto;

};

p {
  color: #2B463C;
}
</style>
