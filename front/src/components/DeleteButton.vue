<template>
  <!--Delete Component - Annabel-->
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
        if (response.status === 200) this.$router.push('/listings');
      });
    },
  },

};
</script>

<style scoped>

.delete-function {
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
  cursor: pointer;
}

.bin {
  display: flex;
  flex-direction: row;
  width: 10em;
  margin: auto;
}
h3{
  font-family: 'Questrial', sans-serif;
}
i, h3 {
  color: #A26360;
  margin: auto;
  font-size: 1.2em;
};

p {
  color: #2B463C;
  font-size: 0.8em;
}
i{
  font-size: 1.5em;
}
@media screen and (min-width: 1024px){
  .delete-function{
    margin-bottom: 2em;
  }
}
</style>
