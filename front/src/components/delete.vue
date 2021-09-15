<template>
  <!--delete front end - Annabel-->
  <div @click="confirmDelete">
    <i class="far fa-trash-alt" />
    <p>Delete Listing</p>
    <p>This action cannot be undone</p>
  </div>
</template>

<script>
export default {
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

i, p {
  color: #A26360;
};

</style>
