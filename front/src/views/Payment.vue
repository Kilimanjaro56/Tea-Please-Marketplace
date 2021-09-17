<template>
  <!-- Payment + Delivery - Keely -->
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
          v-model="card.number"
          type="text"
          name="input-cardnumber"
          placeholder="4111-2222-3333-4444"
          required
        >
      </div>

      <div class="exp-cvc-inputs">
        <div
          class="form-group"
        >
          <label for="input-expdate">Expiry Date</label>
          <input
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
      <h2>Delivery Details</h2>
      <div class="form-group">
        <label for="input-cardname">First Name</label>
        <input
          v-model="delivery.firstName"
          type="text"
          name="input-cardname"
          placeholder="e.g: John"
          required
        >
      </div>
      <div class="form-group">
        <label for="input-cardnumber">Surname</label>
        <input
          v-model="delivery.surname"
          type="text"
          name="input-cardnumber"
          placeholder="eg: Doe"
          required
        >
      </div>
      <div class="form-group">
        <label for="input-cardnumber">Email Address</label>
        <input
          v-model="delivery.email"
          type="email"
          name="input-cardnumber"
          placeholder="eg: example@email.com"
          required
        >
      </div>
      <div class="form-group">
        <label for="input-cardnumber">Street Address</label>
        <input
          v-model="delivery.address"
          type="text"
          name="input-cardnumber"
          placeholder="eg: 12 example st, region, postcode"
          required
        >
      </div>
      <div class="form-group">
        <label for="input-cardnumber">Delivery Instructions</label>
        <textarea
          id="input-cardnumber"
          v-model="delivery.message"
          type="text"
          name="input-cardnumber"
          placeholder="Type your message here ..."
        />
      </div>
      <button type="submit">
        Finalise Purchase
      </button>
      <a @click="$router.push(`/Z/${listingId}`);">Cancel Purchase</a>
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
      delivery: {
        firstName: null,
        surname: null,
        email: null,
        address: null,
      },
    };
  },
  methods: {
    checkForm() {
      this.errors = [];
      const cardNumberRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
      if (!cardNumberRegex.test(this.card.number)) {
        if (this.errors.length < 4) { this.errors.push('Invalid Card'); }
      }
      const cardExpiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
      if (!cardExpiryRegex.test(this.card.expiry)) {
        if (this.errors.length < 4) { this.errors.push('Invalid Expiry'); }
      }
      const cardCvc = /^[0-9]{3,4}$/;
      if (!cardCvc.test(this.card.cvc)) {
        if (this.errors.length < 4) { this.errors.push('Invalid Cvc'); }
      }
      const addressRegex = /^\s*\S+(?:\s+\S+){2}/;
      if (!addressRegex.test(this.delivery.address)) {
        if (this.errors.length < 4) { this.errors.push('Invalid Delivery Address'); }
      } else {
        this.errors = [];
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
      this.$router.push(`/payment-confirmation/${this.listingId}`);
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
  resize: none;
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
  margin-top: 1em;
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
form h2{
  margin-left: 18vw;
  margin-bottom: 0.5em;
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
a{
  text-align: center;
  font-size: 0.9em;
  margin: 1em;
  margin-left: 25vw;
  padding-bottom: 1.5em;
}
hr{
  width: 75vw;
  border-top: thin #a26360 solid;
  margin: 1em 0;
  margin-top: 2em;
}
</style>
