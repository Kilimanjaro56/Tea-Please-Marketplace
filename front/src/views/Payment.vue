<template>
  <div class="payment">
    <h2>Payment</h2>
    <form
      id="payment-form"
      @submit.prevent="checkForm "
    >
      <p
        v-if="errors.length"
        id="errors"
      >
        <b>Please check the following field(s):</b>
        <ul>
          <li
            v-for="error in errors"
            :key="error"
          >
            {{ error }}
          </li>
        </ul>
      </p>

      <div class="form-group">
        <label for="input-cardname">Name on Card</label>
        <input
          id="input-cardname"
          v-model="card.name"
          type="text"
          name="input-cardname"
          placeholder="e.g: John Doe"
          required
        >
      </div>
      <div class="form-group">
        <label for="input-cardnumber">Card number</label>
        <input
          id="input-cardnumber"
          v-model="card.number"
          type="text"
          name="input-cardnumber"
          placeholder="4111-2222-3333-4444"
          required
        >
      </div>

      <div class="exp-cvc-inputs">
        <div
          id="smallerInputs"
          class="form-group"
        >
          <label for="input-expdate">Expiry Date</label>
          <input
            id="input-expdate"
            v-model="card.expiry"
            type="text"
            name="input-expdate"
            placeholder="MM / YY"
            maxlength="7"
            required
          >
        </div>
        <div
          id="smallerInputs"
          class="form-group"
        >
          <label for="input-cvc">CVC</label>
          <input
            id="input-cvc"
            v-model="card.cvc"
            type="text"
            name="input-cvc"
            maxlength="4"
            required
          >
        </div>
      </div>
      <hr>
      <button type="submit">
        Finalise Purchase
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    listingId: String,
  },
  data() {
    return {
      errors: [],
      card: {
        number: null,
        name: null,
        cvc: null,
        expiry: null,
      },
    };
  },
  methods: {
    checkForm() {
      this.errors = [];
      const cardNumberRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
      if (!cardNumberRegex.test(this.card.number)) {
        if (this.errors.length < 3) { this.errors.push('Invalid Card'); }
      }
      const cardExpiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
      if (!cardExpiryRegex.test(this.card.expiry)) {
        if (this.errors.length < 3) { this.errors.push('Invalid Expiry'); }
      }
      const cardCvc = /^[0-9]{3,4}$/;
      if (!cardCvc.test(this.card.cvc)) {
        if (this.errors.length < 3) { this.errors.push('Invalid Cvc'); }
      } else {
        this.errors = [];
        this.card.name = null;
        this.card.number = null;
        this.card.expiry = null;
        this.card.cvc = null;
        this.completePayment();
      }
    },
    async completePayment() {
      console.log('Yes');
      const response = await fetch(
        `http://localhost:3000/listings/${this.listingId}/sold`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            isAvaliable: 'false',
          }),
        },
      );
      const data = await response.json();
      console.log(data);
      // this.$router.push(`/listings/${this.listingId}`);
    },
  },
};
</script>

<style scoped>
form {
  width: 80vw;
  height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  justify-content: space-between;
  margin-left: 11vw;
}

input,
textarea {
  width: 100%;
}

input,
textarea,
select {
  border: thin #a26360 solid;
  border-radius: 3px;
  padding: 0.6em 0.4em;
}

select {
  background-color: white;
  padding: 0.5em 0.4em;
}

textarea {
  height: 10vh;
  font-family: 'Questrial', sans-serif;
}

input:focus, textarea:focus {
  outline: none;
}

.form-group {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 0.3em;
}

button {
  background-color: #a9c596;
  color: #2b463c;
  padding: 0.8em 1.5em;
  border-radius: 5px;
  border: none;
  margin-top: 2em;
  margin-left: 20vw;
}
.exp-cvc-inputs{
  display: flex;
  width: 80vw;
}

.exp-cvc-inputs input{
  width: 85%;
  padding: 0.56em 0.1em;
}

.exp-cvc-inputs:focus{
  outline: none;
}
hr{
  width: 80vw;
  border-top: thin #a26360 solid;
}
</style>
