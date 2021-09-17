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
          placeholder="1111-2222-3333-4444"
          required
        >
      </div>

      <div class="flexInputs">
        <div
          id="smallerInputs"
          class="form-group"
        >
          <label for="input-expdate">Expiry</label>
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

      <button type="submit">
        Finalise Purchase
      </button>
    </form>
  </div>
</template>

<script>
export default {
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
      const cardNumberRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
      if (!cardNumberRegex.test(this.card.number.value)) {
        this.errors.push('Invalid Card');
      }
      const cardExpiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
      if (!cardExpiryRegex.test(this.card.expiry.value)) {
        this.errors.push('Invalid Expiry');
      }
      const cardCvc = /^[0-9]{3,4}$/;
      if (!cardCvc.test(this.card.cvc.value)) {
        this.errors.push('Invalid Cvc');
      }
      if (!this.card.name) {
        this.errors.push('Invalid Name');
      } else {
        this.errors = null;
        this.completePayment();
      }
    },
  },
};
</script>

<style>

</style>
